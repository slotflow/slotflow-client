import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import SideBox from '@/components/provider/SideBox';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from '@/components/ui/TimePicker';
import { Check, ChevronRight, Goal } from 'lucide-react';
import React, { useEffect, FormEvent, useMemo } from 'react';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { SelectField } from '@/components/form/SelectField';
import { daysOfWeekOptions, serviceDurationsOptions } from '@/utils/constants';
import { providerCreateServiceAvailabilities } from '@/utils/apis/provider.api';
import { useAddAvailability } from '@/utils/hooks/providerHooks/useServiceAvailability';
import { ProviderServiceAvailabilityForm, providerServiceAvailabilityZodSchema } from '@/utils/zod/providerZod';

const ProviderCreateServiceAvailabilityPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { dataUpdating } = useSelector((store: RootState) => store.auth);
  const { availabilities } = useSelector((store: RootState) => store.provider);

  const {
    control,
    watch,
    register,
    setValue,
    getValues,
    formState: { isSubmitting, isValid }
  } = useForm<ProviderServiceAvailabilityForm>({
    resolver: zodResolver(providerServiceAvailabilityZodSchema),
    mode: 'onChange',
    defaultValues: {
      day: '',
      duration: 0,
      startTime: new Date(),
      endTime: new Date(),
      modes: [],
      timeSlots: [],
      selectedTimeSlots: [],
    }
  });

  const watched = watch();
  const { timeSlots, selectedTimeSlots } = watched;

  useEffect(() => {
    if (timeSlots && selectedTimeSlots && selectedTimeSlots.length > 0) {
      const filtered = selectedTimeSlots.filter((t) => timeSlots.includes(t));
      if (filtered.length !== selectedTimeSlots.length) {
        setValue('selectedTimeSlots', filtered);
      }
    }
  }, [timeSlots, selectedTimeSlots, setValue]);

   const handleAllSlots = (push: boolean) => {
        if (push) {
          if (timeSlots && timeSlots.length > 0) {
            setValue('selectedTimeSlots', timeSlots.slice(), { shouldDirty: true });
          } else {
            toast.error("Please generate slots");
          }
        } else {
          setValue('selectedTimeSlots', [], { shouldDirty: true });
        }
      };

  const {
    handleAddAvailability,
    generateTimeSlots,
    isModeSelected,
    toggleMode,
    toggleSlot,
  } = useAddAvailability(getValues, setValue);

  const allSlotsSelected = useMemo(() => {
    return (timeSlots && timeSlots.length > 0) && (selectedTimeSlots.length === timeSlots.length);
  }, [timeSlots, selectedTimeSlots]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!availabilities || availabilities.length === 0) {
      toast.info("You didn't add any availability.");
      return;
    }
    dispatch(providerCreateServiceAvailabilities({ data: availabilities }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.log("Something went wrong while submitting availabilities : ", error);
      });
  };

  return (
    <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox props={{ pageNumber: 3 }} />
      <div className="w-full md:w-8/12 md:px-10 overflow-y-scroll no-scrollbar">
        <form className="md:mt-10 px-4 md:px-12 py-6 md:py-0" onSubmit={onSubmit}>
          <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start px-6">Service Availability</h4>
          <div className="flex w-full flex-col space-y-6">
            <div className="space-y-4 md:space-y-0 w-full md:flex space-x-2 px-6 pt-6 md:px-6">
              <div className="md:w-6/12">

                <SelectField
                  label="Select Day"
                  id="day"
                  register={register}
                  options={daysOfWeekOptions}
                  required
                />
              </div>
              <div className="md:w-6/12">
                <SelectField
                  label="Select Duration"
                  id="duration"
                  register={register}
                  options={serviceDurationsOptions}
                  required
                />
              </div>
            </div>

            <div className="px-6 pt-6 md:px-6">
              <h6 className='text-sm font-semibold'>Select service modes {<span className="text-red-500"> *</span>}</h6>
              <div className="w-1/2 flex space-x-4 mt-2">
                <div
                  className={`w-1/2 text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected('online') ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                    }`}
                  onClick={() => toggleMode('online')}
                >
                  Online
                </div>
                <div
                  className={`w-1/2 text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected('offline') ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                    }`}
                  onClick={() => toggleMode('offline')}
                >
                  Offline
                </div>
              </div>
            </div>

            <div className="md:flex items-end space-x-4 space-y-4 md:space-y-0 justify-between px-6 pt-6 md:px-6">
              <div className="md:w-6/12">
                <label className="block text-sm font-medium">Start Time (HH:mm){<span className="text-red-500"> *</span>}</label>
                <div className='mt-2'>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value}
                        onChange={(newTime: Date) => field.onChange(newTime)}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="md:w-6/12">
                <label className="block text-sm font-medium">End Time (HH:mm){<span className="text-red-500"> *</span>}</label>
                <div className='mt-2'>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        value={field.value}
                        onChange={(newTime: Date) => field.onChange(newTime)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => generateTimeSlots(getValues('startTime'), getValues('endTime'), getValues('duration'))}
                className="w-10/12 md:w-auto text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
              >
                Generate Slots <Goal />
              </Button>
            </div>

            <div className="w-10/12 md:w-full space-y-6 mx-auto md:px-6">
              {timeSlots && timeSlots.length > 0 && (
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
                      const isSelected = selectedTimeSlots.includes(timeSlot);
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

          </div>

          <>
            {selectedTimeSlots && selectedTimeSlots.length > 0 && (
              <div className="flex space-x-2 justify-center md:justify-end mt-4 md:mt-6">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={handleAddAvailability}
                  className="cursor-pointer w-10/12 md:w-auto text-xs md:text-sm hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                >
                  Add <Check />
                </Button>
              </div>
            )}
            {availabilities && (
              <div className="flex space-x-2 justify-center md:justify-end mt-4 md:mt-6 ">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmitting || !isValid}
                  className="cursor-pointer w-10/12 md:w-auto text-xs md:text-sm hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                >
                  {dataUpdating ? "Loading" : "Submit"} <ChevronRight />
                </Button>
              </div>
            )}
            <div className='mt-10'>
              <p className='text-sm text-gray-400 italic'>Note: Please add your daily service available slots by selecting a day, Once you're done, only click Submit</p>
            </div>
          </>

        </form>
      </div>
    </div>
  );
};

export default ProviderCreateServiceAvailabilityPage;

