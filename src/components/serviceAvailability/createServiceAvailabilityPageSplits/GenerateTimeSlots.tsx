import React from "react";
import { Checkbox } from "../../ui/checkbox";
import { Controller } from "react-hook-form";
import { GenerateTimeSlotsProps } from "@/shared/interface/componentInterface";

const GenerateTimeSlots: React.FC<GenerateTimeSlotsProps> = ({
    timeSlots,
    selectedTimeSlots,
    allSlotsSelected,
    handleAllSlots,
    toggleSlot,
    control,
    isAvailable
}) => {
    return (
        <div className="w-10/12 md:w-full space-y-6 mx-auto">
            {timeSlots && timeSlots.length > 0 && isAvailable && (
                <div className="mt-6">
                    <div className='flex items-center mb-4 justify-between md:justify-start'>
                        <h3 className="text-sm font-semibold">Select your time slots</h3>
                        <div className='flex items-center md:mt-0 ml-0 md:ml-2'>
                            <Controller
                                name="selectedTimeSlots"
                                control={control}
                                render={() => (
                                    <>
                                        <Checkbox
                                            checked={allSlotsSelected}
                                            onCheckedChange={(checked) => handleAllSlots(Boolean(checked))}
                                            className='cursor-pointer'
                                        />
                                    </>
                                )}
                            />
                            <p className='ml-2'>{allSlotsSelected ? "Deselect all slots" : "Select all slots"}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {timeSlots.map((timeSlot) => {
                            const isSelected = selectedTimeSlots?.includes(timeSlot);
                            return (
                                <div
                                    key={timeSlot}
                                    className={`text-xs text-center border rounded-md py-2 px-2 md:py-2 md:px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isSelected
                                        ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]'
                                        : 'border-gray-300'
                                        }`}
                                    onClick={() => toggleSlot(timeSlot)}
                                >
                                    {timeSlot}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateTimeSlots;