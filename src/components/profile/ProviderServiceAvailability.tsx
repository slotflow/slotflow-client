import { toast } from 'react-toastify';
import DataField from '../app/DataField';
import { useDispatch } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import TimeSlotLegend from '../app/TimeSlotLegend';
import { AppDispatch } from '@/app/store/appStore';
import { Calendar } from '@/components/ui/calendar';
import { getEventSocket } from '@/lib/socketService';
import { AnimatePresence, motion } from 'framer-motion';
import DataFetchingError from '../error/DataFetchingError';
import getBooleanStatusComponent from '../app/GetBooleanStatus';
import { Slot } from '@/shared/types/entity/serviceAvailability';
import { CalendarDays, Clock, Settings2, Timer } from 'lucide-react';
import { setBookingPyamentData } from '@/app/store/slices/paymentSlice';
import AvailablityFetchingError from '../error/AvailabilityFetchingError';
import { EventSocketEnum, SlotEngageRequest } from '@/shared/types/socket';
import { ProviderServiceAvailabilityProps } from '@/shared/types/component';
import ProviderAvailabilityShimmer from '@/components/shimmers/ProviderAvailabilityShimmer';
import { defaultButtonClassName, queryKeys, STATUS_PRESETS } from '@/shared/utils/constants';
import ProviderServiceAvailabilityForm from '../form/provider/ProviderSerivceAvailabilityForm';
import {
  fetchEngagedSlots,
  fetchMyServiceAvailability,
  fetchServiceAvailabilityByProviderId,
} from '@/services/apis/serviceAvailability';

const ProviderServiceAvailability = ({
  providerId,
  role,
  canUpdate = false,
  showHeading = false,
}: ProviderServiceAvailabilityProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [engagedSlotIds, setEngagedSlotIds] = useState<Set<string>>(new Set());

  const eventSocket = getEventSocket();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      if (!date) throw new Error('Missing date');
      if (role === Role.USER || role === Role.ADMIN) {
        if (!providerId) throw new Error('Missing provider Id');
        const res = await fetchServiceAvailabilityByProviderId({ date, providerId });
        return res.data;
      } else if (role === Role.PROVIDER) {
        const res = await fetchMyServiceAvailability(date);
        return res.data;
      }
    },
    queryKey: [queryKeys.SERVICE_AVAILABILITY, date, providerId],
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
  }, [data, date]);

  useEffect(() => {
    eventSocket.emit(EventSocketEnum.providerJoin, { providerId });

    eventSocket.on(EventSocketEnum.slotLocked, (eventData: SlotEngageRequest) => {
      if (eventData.providerId !== providerId) return;
      const eventDate = new Date(eventData.date).toDateString();
      const currentDate = date?.toDateString();
      if (eventDate !== currentDate) return;

      setEngagedSlotIds((prev) => new Set(prev).add(eventData.slotId));
    });

    eventSocket.on(EventSocketEnum.slotUnlocked, (eventData: SlotEngageRequest) => {
      if (eventData.providerId !== providerId) return;
      const eventDate = new Date(eventData.date).toDateString();
      const currentDate = date?.toDateString();
      if (eventDate !== currentDate) return;

      setEngagedSlotIds((prev) => {
        const next = new Set(prev);
        next.delete(eventData.slotId);
        return next;
      });
    });

    return () => {
      eventSocket.emit(EventSocketEnum.providerLeave, { providerId });
      eventSocket.off(EventSocketEnum.slotLocked);
      eventSocket.off(EventSocketEnum.slotUnlocked);
    };
  }, [eventSocket, providerId, date]);

  const handleBookAnAppoint = (slotId: string, slot: string, availability: boolean) => {
    if (!availability) {
      toast.info('Slot is unavailable.');
      return;
    }
    if (!providerId || !slotId || !date || !selectedMode) {
      toast.error('Something went wrong. Please try again.');
      return;
    }

    dispatch(
      setBookingPyamentData({
        providerId,
        slotId,
        slot,
        date,
        selectedServiceMode: selectedMode,
      }),
    );
  };

  return (
    <div className="space-y-6 pb-8 sm:pb-12">
      {(showHeading || canUpdate) && (
        <div className="flex items-center justify-between gap-4 py-1">
          <div>
            {showHeading && (
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-indigo-500" /> Service Availability
              </h3>
            )}
          </div>

          {canUpdate && (
            <Button
              title={showForm ? 'Cancel Update' : 'Update Availability'}
              variant={showForm ? 'destructive' : 'default'}
              className={defaultButtonClassName}
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Cancel' : 'Update Availability'}
            </Button>
          )}
        </div>
      )}

      <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start self-start h-fit">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-slate-900/50 p-3 shadow-xs h-fit"
            />
          </div>

          {isError && error ? (
            <div className="md:col-span-7 lg:col-span-8 flex items-center justify-center">
              <AvailablityFetchingError isAvailable={true} />
            </div>
          ) : isLoading ? (
            <div className="md:col-span-7 lg:col-span-8">
              <ProviderAvailabilityShimmer row={5} slotCount={20} />
            </div>
          ) : !data ? (
            <div className="md:col-span-7 lg:col-span-8 flex items-center justify-center">
              <DataFetchingError message="Data not found" />
            </div>
          ) : !data.isAvailable ? (
            <div className="md:col-span-7 lg:col-span-8 flex items-center justify-center">
              <AvailablityFetchingError isAvailable={data.isAvailable} />
            </div>
          ) : (
            <div className="md:col-span-7 lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DataField
                  label="Day"
                  value={data?.day}
                  Icon={CalendarDays}
                  isLoading={isLoading}
                  shimmerWidth="w-24"
                />

                <DataField
                  label="Availability Status"
                  value={getBooleanStatusComponent(
                    data?.isAvailable,
                    STATUS_PRESETS.availabilityStatus,
                  )}
                  Icon={CalendarDays}
                  isLoading={isLoading}
                  shimmerWidth="w-20"
                />

                <DataField
                  label="Start Time"
                  value={data?.startTime}
                  Icon={Clock}
                  isLoading={isLoading}
                  shimmerWidth="w-20"
                />

                <DataField
                  label="End Time"
                  value={data?.endTime}
                  Icon={Clock}
                  isLoading={isLoading}
                  shimmerWidth="w-20"
                />

                <DataField
                  label="Duration"
                  value={data?.duration}
                  isTime
                  Icon={Timer}
                  isLoading={isLoading}
                  shimmerWidth="w-20"
                />

                <DataField
                  label="Select Service Mode"
                  value={data?.modes}
                  isRadioGroup
                  selectedRadioValue={selectedMode}
                  onRadioChange={(val) => setSelectedMode(val)}
                  Icon={Settings2}
                  isLoading={isLoading}
                  shimmerWidth="w-32"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-border/60">
                <TimeSlotLegend
                  role={role}
                  showAdvanceNotice={Boolean(data && data.slots.length > 0)}
                  date={date}
                  legendItems={[
                    {
                      label: 'Available Slot',
                      className:
                        'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-400 dark:text-indigo-300',
                    },
                    {
                      label: 'Unavailable Slot',
                      className:
                        'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-600',
                    },
                    {
                      label: 'Occupied Slot',
                      className:
                        'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400',
                    },
                  ]}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {data?.slots?.length ? (
                    data?.slots.map((slot: Slot) => {
                      const isOccupied = slot.occupied || engagedSlotIds.has(slot._id);

                      const getSlotStyles = () => {
                        if (slot.available && !isOccupied) {
                          return 'bg-indigo-50/60 hover:bg-indigo-600 border-indigo-200 hover:border-indigo-600 text-indigo-700 hover:text-white dark:bg-indigo-950/30 dark:border-indigo-800/80 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white shadow-2xs';
                        }
                        if (isOccupied) {
                          return 'bg-amber-50/50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400 opacity-90 cursor-not-allowed';
                        }
                        return 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-900/30 dark:border-slate-800 dark:text-slate-600 cursor-not-allowed';
                      };

                      const commonClasses = `text-xs font-semibold text-center border rounded-lg py-2.5 px-3 transition-all duration-150 flex items-center justify-center ${getSlotStyles()}`;

                      return role === Role.USER ? (
                        <Button
                          title={slot.time}
                          key={slot._id}
                          variant="outline"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBookAnAppoint(slot._id, slot.time, slot.available && !isOccupied);
                          }}
                          className={`${commonClasses} ${
                            slot.available && !isOccupied ? 'cursor-pointer active:scale-95' : ''
                          }`}
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
                    <p className="col-span-full py-4 text-xs font-medium text-slate-500 text-center">
                      No slots available for this date
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="provider-service-availability-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="p-6 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
              <ProviderServiceAvailabilityForm
                isUpdating={true}
                heading="Update Service Availability"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderServiceAvailability;
