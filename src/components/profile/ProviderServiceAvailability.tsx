import { toast } from "react-toastify";
import DataField from "../app/DataField";
import { SelectSeparator } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Role } from "@/shared/interface/enums";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import TimeSlotLegend from "../app/TimeSlotLegend";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getEventSocket } from "@/lib/socketService";
import DataFetchingError from "../error/DataFetchingError";
import PaymentSelection from "../payment/PaymentSelection";
import { CalendarDays, Clock, Settings2, Timer } from "lucide-react";
import AvailablityFetchingError from "../error/AvailabilityFetchingError";
import { Slot } from "@/shared/interface/entityInterface/serviceAvailabilityInterface";
import { EventSocketEnum, SlotEngageRequest } from "@/shared/interface/socket.interface";
import { ProviderServiceAvailabilityProps } from "@/shared/interface/componentInterface";
import ProviderAvailabilityShimmer from "@/components/shimmers/ProviderAvailabilityShimmer";
import { fetchEngagedSlots, fetchMyServiceAvailability, fetchServiceAvailabilityByProviderId } from "@/shared/apis/serviceAvailability";
import { defaultButtonClassName, STATUS_PRESETS } from "@/shared/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import ProviderServiceAvailabilityForm from "../form/provider/ProviderSerivceAvailabilityForm";
import getBooleanStatusComponent from "../app/GetBooleanStatus";

const ProviderServiceAvailability: React.FC<ProviderServiceAvailabilityProps> = ({
    providerId,
    role,
    canUpdate = false,
}) => {

    const [showForm, setShowForm] = useState<boolean>(false);
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
                const res = await fetchServiceAvailabilityByProviderId({ date, providerId });
                return res.data;
            } else if (role === Role.PROVIDER) {
                const res = await fetchMyServiceAvailability(date);
                return res.data;
            }
        },
        queryKey: ["providerServiceAvailability", date, providerId],
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
        <>
            <div className="w-full flex flex-col">
                {(
                    <>
                        <Card>
                            <CardHeader className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                        <CalendarDays className="w-5 h-5 text-primary" />
                                        Availability
                                    </CardTitle>
                                    <CardDescription>Select an available date and time slot below</CardDescription>
                                </div>
                                {canUpdate && (
                                    <Button
                                        title="Update Password"
                                        variant={showForm ? "destructive" : "default"}
                                        className={defaultButtonClassName}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowForm(!showForm);
                                        }}
                                    >{showForm ? "Cancel" : "Update"}
                                    </Button>
                                )}
                            </CardHeader>
                            <SelectSeparator />
                            <CardContent className="grid grid-cols-1 md:grid-cols-12 space-x-2">
                                <div className="md:col-span-4">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className={`rounded-lg border `}
                                    />
                                </div>
                                {isError && error ? (
                                    <AvailablityFetchingError isAvailable={true} />
                                ) : isLoading ? (
                                    <ProviderAvailabilityShimmer row={5} slotCount={20} />
                                ) : !data ? (
                                    <DataFetchingError message="Data not found" />
                                ) : !data.isAvailable ? (
                                    <AvailablityFetchingError isAvailable={data.isAvailable} />
                                ) : (
                                    <div className="md:col-span-8 space-y-6">
                                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4`}>
                                            <DataField label="Day" value={data?.day} Icon={CalendarDays} />
                                            <DataField label="Availability Status" value={getBooleanStatusComponent(data?.isAvailable, STATUS_PRESETS.availabilityStatus)} Icon={CalendarDays} />
                                            <DataField label="Start Time" value={data?.startTime} Icon={Clock} />
                                            <DataField label="End Time" value={data?.endTime} Icon={Clock} />
                                            <DataField label="Duration" value={data?.duration} isTime Icon={Timer} />
                                            <DataField
                                                label="Select Service Mode"
                                                value={data?.modes}
                                                isRadioGroup
                                                selectedRadioValue={selectedMode}
                                                onRadioChange={(val) => setSelectedMode(val)}
                                                Icon={Settings2}
                                            />
                                        </div>
                                        <div className="mt-2 space-y-4 p-2">
                                            <TimeSlotLegend
                                                role={role}
                                                showAdvanceNotice={Boolean(data && data.slots.length > 0)}
                                                date={date}
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
                                            <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4`}>
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
                                    </div>
                                )}
                            </CardContent>
                            <AnimatePresence initial={false}>
                                {showForm && (
                                    <motion.div
                                        key="provider-service-availability-form"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <SelectSeparator />
                                        <CardContent className="space-y-2 mt-4">
                                            <ProviderServiceAvailabilityForm
                                                isUpdating={true}
                                                heading="Update Service Availability"
                                            />
                                        </CardContent>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </>
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

        </>
    )
}

export default ProviderServiceAvailability;