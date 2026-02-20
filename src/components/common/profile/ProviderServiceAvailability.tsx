import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Role } from "@/utils/interface/enums";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import DataFetchingError from "../DataFetchingError";
import InfoDisplayComponent from "../InfoDisplayComponent";
import CommonPaymentSelection from "../CommonPaymentSelection";
import { Slot } from "@/utils/interface/entityInterface/serviceAvailabilityInterface";
import ProviderAvailabilityShimmer from "@/components/shimmers/ProviderAvailabilityShimmer";
import { ProviderApiFunctionForPSAcomponent, ProviderServiceAvailabilityComponentProps, UserOrAdminApiFunctionForPSAcomponent } from "@/utils/interface/componentInterface/commonComponentInterface";
import TimeSlotLegend from "../TimeSlotLegend";

const ProviderServiceAvailability: React.FC<ProviderServiceAvailabilityComponentProps> = ({
    providerId,
    fetchApiFuntion,
    queryKey,
    role
}) => {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [openPayment, setOpenPayment] = useState<boolean>(false);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => {
            if (!date) throw new Error("Missing date");
            if (role === Role.USER || role === Role.ADMIN) {
                if (!providerId) throw new Error("Missing provider Id");
                return (fetchApiFuntion as UserOrAdminApiFunctionForPSAcomponent)({ date, providerId });
            } else if (role === Role.PROVIDER) {
                return (fetchApiFuntion as ProviderApiFunctionForPSAcomponent)(date);
            }
        },
        queryKey: [queryKey, date, providerId],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!date,
    });

    useEffect(() => {
        if (!data || !date || date === null || !data.modes) {
            return;
        }
        setSelectedMode(data?.modes[0]);
    }, [data, date])

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
                            <>
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
                                                const commonClasses = `text-sm font-semibold text-center border-2 rounded-md py-3 px-4 hover:bg-[var(--mainColor)] hover:text-white transition-colors duration-200 ${slot.available
                                                    ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)] hover:bg-[var(--mainColor)] hover:text-white'
                                                    : slot.occupied ? 'border-yellow-300 text-yellow-700' : 'border-gray-300 text-gray-500'
                                                    }`;

                                                return role === Role.USER ? (
                                                    <Button
                                                        key={slot._id}
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleBookAnAppoint(slot._id, slot.available);
                                                        }}
                                                        className={`${commonClasses} ${slot.available ? 'cursor-pointer' : ''}`}
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
                            </>
                        )}
                    </div>
                )}
            </div>

            {openPayment && selectedSlotId && providerId && selectedMode && (
                <CommonPaymentSelection
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