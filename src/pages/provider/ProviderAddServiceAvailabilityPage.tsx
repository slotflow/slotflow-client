import { toast } from 'react-toastify';
import { Check, ChevronRight, Goal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SideBox from '@/components/provider/SideBox';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { TimePicker } from '@/components/ui/TimePicker';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { format, addMinutes, isBefore, isEqual } from "date-fns";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { addAvailability } from '@/utils/redux/slices/providerSlice';
import SelectFiledWithLabel from '@/components/form/SelectFiledWithLabel';
import { providerAddProviderServiceAvailabilities } from '@/utils/apis/provider.api';

interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

const ProviderAddServiceAvailabilityPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { dataUpdating } = useSelector((store: RootState) => store.auth);
  const [selectedDay, setSelectedDay] = useState<string>('Sunday');
  const [selectedDuration, setSelectedDuration] = useState<string>("15 minutes");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const { availabilities } = useSelector((store: RootState) => store.provider);
  const [modes, setModes] = useState<string[]>([]);
  const [selectAllSlots, setSelectAllSlots] = useState<boolean>(false);
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    startTime: new Date(),
    endTime: new Date(),
  });

  useEffect(() => {
  }, [selectedTimeSlots]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const serviceDurations = ['15 minutes', '30 minutes', '1 hour'];

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(e.target.value);
  };

  const handleStartTimeChange = (time: Date) => {
    setNewTimeSlot({ ...newTimeSlot, startTime: time });
  };

  const handleEndTimeChange = (time: Date) => {
    setNewTimeSlot({ ...newTimeSlot, endTime: time });
  };

  const generateTimeSlots = (start: Date, end: Date, intervalMinutes: string): void => {
    if (!start || !end) {
      toast.warning("Please select the startTime and endTime");
      return;
    }

    const slots: string[] = [];
    let interval = 0;

    if (intervalMinutes === "15 minutes") {
      interval = 15;
    } else if (intervalMinutes === "30 minutes") {
      interval = 30;
    } else if (intervalMinutes === "1 hour") {
      interval = 60;
    } else {
      toast.warning("Invalid interval");
      return;
    }

    let current = new Date(start);

    while (isBefore(current, end) || isEqual(current, end)) {
      const formatted = format(current, "hh:mm a");
      slots.push(formatted);
      current = addMinutes(current, interval);
    }

    setTimeSlots(slots);
  };

  const handleTimeSlotAdding = (timeSlot: string) => {
    if (selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== timeSlot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
    }
  };

  const toggleMode = (mode: string) => {
    if (modes.includes(mode)) {
      setModes(modes.filter((m) => m !== mode));
    } else {
      setModes([...modes, mode]);
    }
  };

  const handleAddAvailability = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (!selectedDay) {
      toast.warning("Please select a day");
      return;
    } else if (!selectedDuration) {
      toast.warning("Please select a duration");
      return;
    } else if (!newTimeSlot.startTime) {
      toast.warning("Please select a startTime");
      return;
    } else if (!newTimeSlot.endTime) {
      toast.warning("Please select an endTime");
      return;
    } else if (modes.length === 0) {
      toast.warning("Please select a service mode");
      return;
    } else if (selectedTimeSlots.length === 0) {
      toast.warning("Please select time slots")
      return;
    }

    const startTime = format(newTimeSlot.startTime, "hh:mm a");
    const endTime = format(newTimeSlot.endTime, "hh:mm a");

    const data = {
      day: selectedDay,
      duration: selectedDuration,
      startTime: startTime,
      endTime: endTime,
      modes: modes,
      slots: selectedTimeSlots
    }

    dispatch(addAvailability(data));
    toast.success(`${selectedDay} availability added.`);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!availabilities || availabilities.length === 0) {
      toast.info("You didnt added any availability.");
      return;
    }
    if (modes.length === 0) {
      toast.info("Please select your service mode.");
      return;
    }
    dispatch(providerAddProviderServiceAvailabilities({ data: availabilities }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
  }

  const isModeSelected = (mode: string) => modes.includes(mode);

  const handleAllSlots = (push: boolean) => {
    if (push && timeSlots.length > 0) {
      setSelectedTimeSlots(timeSlots);
    } else if (!push && selectedTimeSlots.length > 0) {
      setSelectedTimeSlots([])
    } else {
      toast.error("Please generate slots");
    }
  }

  return (
    <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox props={{ pageNumber: 3 }} />
      <div className="w-full md:w-8/12 md:px-10 overflow-y-scroll no-scrollbar">
        <form className="md:mt-10 px-4 md:px-12 py-6" onSubmit={handleSubmit}>
          <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start px-6">Fill out your Service Availability</h4>
          <div className="flex w-full flex-col space-y-6">
            <div className="space-y-4 md:space-y-0 w-full md:flex space-x-2 px-6 pt-6 md:px-6">
              <div className="md:w-6/12">
                <SelectFiledWithLabel
                  label="Select Day"
                  id="serviceDay"
                  value={selectedDay}
                  onChange={handleDayChange}
                  options={daysOfWeek}
                  required={true}
                />
              </div>
              <div className="md:w-6/12">
                <SelectFiledWithLabel
                  label="Select Duration"
                  id="serviceDuration"
                  value={selectedDuration}
                  onChange={handleDurationChange}
                  options={serviceDurations}
                  required={true}
                />
              </div>
            </div>

            <div className="px-6 pt-6 md:px-6">
              <h6 className='text-sm font-semibold'>Select service modes</h6>
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
                <label className="block text-sm font-medium">Start Time (HH:mm)</label>
                <div className='mt-2'>
                  <TimePicker
                    value={newTimeSlot.startTime}
                    onChange={(newTime) => handleStartTimeChange(newTime)}
                  />
                </div>
              </div>
              <div className="md:w-6/12">
                <label className="block text-sm font-medium">End Time (HH:mm)</label>
                <div className='mt-2'>
                  <TimePicker
                    value={newTimeSlot.endTime}
                    onChange={(newTime) => handleEndTimeChange(newTime)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => generateTimeSlots(newTimeSlot.startTime, newTimeSlot.endTime, selectedDuration)}
                className="w-10/12 md:w-2/12 text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
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
                    <Checkbox
                      checked={selectAllSlots}
                      onCheckedChange={(checked) => {
                        setSelectAllSlots(!!checked);
                        handleAllSlots(!selectAllSlots)
                      }}
                      className='ursor-pointer'
                      />
                    <p className='ml-2'>{selectAllSlots ? "Deselect all slots" : "Select all slots"}</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {timeSlots.map((timeSlot) => (
                      <div
                        key={timeSlot}
                        className={`text-xs text-center border rounded-md py-2 px-2 md:py-2 md:px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${selectedTimeSlots.includes(timeSlot)
                          ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]'
                          : 'border-gray-300'
                          }`}
                        onClick={() => handleTimeSlotAdding(timeSlot)}
                      >
                        {timeSlot}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {selectedTimeSlots.length > 0 && (
            <>
              <div className="flex space-x-2 justify-center md:justify-end mt-4 md:mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddAvailability}
                  className="w-10/12 md:w-2/12 text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                >
                  Add <Check />
                </Button>
              </div>
              <div className="flex space-x-2 justify-center md:justify-end mt-4 md:mt-6 ">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-10/12 md:w-2/12 text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                >
                  {dataUpdating ? "Loading" : "Submit"} <ChevronRight />
                </Button>
              </div>
              <div className='mt-10'>
                <p className='text-sm text-gray-400 italic'>Note: Please add your daily service available slots by selecting a day, Once you're done, only click Submit</p>
              </div>
            </>
          )}

        </form>
      </div>
    </div>
  );
};

export default ProviderAddServiceAvailabilityPage;
