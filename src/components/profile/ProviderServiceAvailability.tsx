import { toast } from "react-toastify";
import { Role } from "@/shared/interface/enums";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import TimeSlotLegend from "../app/TimeSlotLegend";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import { getEventSocket } from "@/lib/socketService";
import DataFetchingError from "../error/DataFetchingError";
import PaymentSelection from "../payment/PaymentSelection";
import InfoDisplayComponent from "../app/InfoDisplayComponent";
import { fetchEngagedSlots } from "@/shared/apis/serviceAvailability";
import { Slot } from "@/shared/interface/entityInterface/serviceAvailabilityInterface";
import { EventSocketEnum, SlotEngageRequest } from "@/shared/interface/socket.interface";
import ProviderAvailabilityShimmer from "@/components/shimmers/ProviderAvailabilityShimmer";
import { ProviderApiFunctionForPSAComponent, ProviderServiceAvailabilityProps, UserOrAdminApiFunctionForPSAcomponent } from "@/shared/interface/componentInterface";

const ProviderServiceAvailability: React.FC<ProviderServiceAvailabilityProps> = ({
    providerId,
    fetchApiFuntion,
    queryKey,
    role
}) => {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [openPayment, setOpenPayment] = useState<boolean>(false);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [engagedSlotIds, setEngagedSlotIds] = useState<Set<string>>(new Set());

    const eventSocket = getEventSocket();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            if (!date) throw new Error("Missing date");
            if (role === Role.USER || role === Role.ADMIN) {
                if (!providerId) throw new Error("Missing provider Id");
                const res = await (fetchApiFuntion as UserOrAdminApiFunctionForPSAcomponent)({ date, providerId });
                return res.data;
            } else if (role === Role.PROVIDER) {
                const res = await (fetchApiFuntion as ProviderApiFunctionForPSAComponent)(date);
                return res.data;
            }
        },
        queryKey: [queryKey, date, providerId],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!date,
    });

    useEffect(() => {
        const loadEngagedSlots = async () => {
            if (providerId && date) {
                const res = await fetchEngagedSlots({ providerId, date });
                if (res.success) {
                    setEngagedSlotIds(new Set(res.data));
                }
            }
        };
        loadEngagedSlots();
    }, [providerId, date]);

    useEffect(() => {
        if (!data || !date || date === null || !data.modes) {
            return;
        }
        setSelectedMode(data?.modes[0]);
    }, [data, date])

    useEffect(() => {
        eventSocket.emit(EventSocketEnum.providerJoin, { providerId });

        eventSocket.on(EventSocketEnum.slotLocked, (eventData: SlotEngageRequest) => {
            if (eventData.providerId !== providerId) return;
            const eventDate = new Date(eventData.date).toDateString();
            const currentDate = date?.toDateString();
            if (eventDate !== currentDate) return;

            setEngagedSlotIds(prev => new Set(prev).add(eventData.slotId));
        });

        eventSocket.on(EventSocketEnum.slotUnlocked, (eventData: SlotEngageRequest) => {
            if (eventData.providerId !== providerId) return;
            const eventDate = new Date(eventData.date).toDateString();
            const currentDate = date?.toDateString();
            if (eventDate !== currentDate) return;

            setEngagedSlotIds(prev => {
                const next = new Set(prev);
                next.delete(eventData.slotId);
                return next;
            });
        });

        return () => {
            eventSocket.emit(EventSocketEnum.providerLeave, { providerId });
            eventSocket.off(EventSocketEnum.slotLocked);
            eventSocket.off(EventSocketEnum.slotUnlocked);
        }
    }, [eventSocket, providerId, date])

    const handleBookAnAppoint = (slotId: string, availability: boolean) => {
        if (!availability) {
            toast.info("Slot is unavailable.");
            return;
        }
        setSelectedSlotId(slotId);
        setOpenPayment(true);
    };

    return (
        <React.Fragment>
            <div className="flex w-full space-x-1">
                <div className="">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className={`rounded-md border `}
                    />
                </div>

                {isLoading ? (
                    <ProviderAvailabilityShimmer slotCount={20} />
                ) : isError && error ? (
                    <DataFetchingError message={error.message} />
                ) : !data ? (
                    <DataFetchingError message="Data not found" />
                ) : (
                    <div className="w-full flex flex-col">
                        {(
                            <React.Fragment>
                                <div className=" border rounded-md overflow-hidden w-full">
                                    <table className="table-auto w-full">
                                        <tbody className="w-1/2">
                                            <InfoDisplayComponent label="Day" value={data?.day} />
                                            <InfoDisplayComponent label="Start Time" value={data?.startTime} />
                                            <InfoDisplayComponent label="End Time" value={data?.endTime} />
                                            <InfoDisplayComponent label="Duration" value={data?.duration} isTime />
                                            <InfoDisplayComponent
                                                label="Service Modes"
                                                value={data?.modes}
                                                isRadioGroup
                                                selectedRadioValue={selectedMode}
                                                onRadioChange={(val) => setSelectedMode(val)}
                                                isLast
                                                role={role}
                                            />
                                        </tbody>
                                    </table>
                                </div>


                                <div className="mt-2 space-y-4 p-2">
                                    <TimeSlotLegend
                                        role={role}
                                        showAdvanceNotice={Boolean(data && data.slots.length > 0)}
                                        legendItems={[
                                            {
                                                label: "Available Slot",
                                                className:
                                                    "bg-[var(--mainColor)/20] border-[var(--mainColor)] hover:bg-[var(--mainColor)] hover:text-white",
                                            },
                                            {
                                                label: "Unavailable Slot",
                                                className: "border-gray-300 text-gray-500",
                                            },
                                            {
                                                label: "Occupied Slot",
                                                className: "border-yellow-300 text-yellow-700",
                                            },
                                        ]}
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {data?.slots?.length ? (
                                            data?.slots.map((slot: Slot) => {
                                                const isOccupied = slot.occupied || engagedSlotIds.has(slot._id);
                                                const commonClasses = `text-sm font-semibold text-center border-2 rounded-md py-3 px-4 hover:bg-[var(--mainColor)] hover:text-white transition-colors duration-200 
                                                ${slot.available && !isOccupied ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)] hover:bg-[var(--mainColor)] hover:text-white'
                                                        : isOccupied ? 'border-yellow-300 text-yellow-700' : 'border-gray-300 text-gray-500'
                                                    }`;

                                                return role === Role.USER ? (
                                                    <Button
                                                        title={slot.time}
                                                        key={slot._id}
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleBookAnAppoint(slot._id, slot.available && !isOccupied);
                                                        }}
                                                        className={`${commonClasses} ${slot.available && !isOccupied ? 'cursor-pointer' : ''}`}
                                                    >
                                                        {slot.time}
                                                    </Button>
                                                ) : (
                                                    <div key={slot._id} className={commonClasses}>
                                                        {slot.time}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="col-span-full text-sm text-gray-500 text-center">No slots available</p>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                )}
            </div>

            {openPayment && selectedSlotId && providerId && selectedMode && (
                <PaymentSelection
                    setOpenPayment={setOpenPayment}
                    data={{
                        providerId,
                        slotId: selectedSlotId,
                        date: date || new Date(),
                        selectedServiceMode: selectedMode
                    }}
                    isAppointmentBooking
                />
            )}

        </React.Fragment>
    )
}

export default ProviderServiceAvailability;