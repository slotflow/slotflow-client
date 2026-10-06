import { toast } from 'react-toastify';
import DataField from '../app/DataField';
import { useEffect, useState } from 'react';
import {
  fetchEngagedSlots,
  fetchMyServiceAvailability,
  fetchServiceAvailabilityByProviderId,
} from '@/services/apis/serviceAvailability';
import { SelectSeparator } from '../ui/select';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import TimeSlotLegend from '../app/TimeSlotLegend';
import { useSearchParams } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { getEventSocket } from '@/lib/socketService';
import { AnimatePresence, motion } from 'framer-motion';
import { SlotEngageRequest } from '@/shared/types/socket';
import DataFetchingError from '../error/DataFetchingError';
import { EventSocketEnum, Role } from '@/shared/types/enums';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { Slot } from '@/shared/types/entity/serviceAvailability';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import AvailablityFetchingError from '../error/AvailabilityFetchingError';
import { ProviderServiceAvailabilityProps } from '@/shared/types/component';
import { dateFormats, queryKeys } from '@/shared/utils/constants/appConstants';
import ProviderAvailabilityShimmer from '@/components/shimmers/ProviderAvailabilityShimmer';
import { CalendarDays, Clock, Settings2, Timer, CheckCircle2, XCircle } from 'lucide-react';
import ProviderServiceAvailabilityForm from '../form/provider/ProviderSerivceAvailabilityForm';
import { parseDateParam } from '@/shared/utils/helper/parseDateParams';
import { useAuth } from '@/hooks/useAuth';

const ProviderServiceAvailability = ({
  providerId,
  role,
  canUpdate = false,
  showHeading = false,
}: ProviderServiceAvailabilityProps) => {

  const { user } = useAuth();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const modeParam = searchParams.get('mode');
  const [date, setDate] = useState<Date | undefined>(
    () => parseDateParam(dateParam, user?.timeZone?.value as string) ?? new Date(),
  );
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [engagedSlotIds, setEngagedSlotIds] = useState<Set<string>>(new Set());

  const eventSocket = getEventSocket();

  const selectedSlotId = searchParams.get('slot');

  useEffect(() => {
    const parsedDate = parseDateParam(dateParam, user?.timeZone?.value as string);
    if (parsedDate) {
      setDate(parsedDate);
      return;
    }

    const defaultDate = new Date();
    setDate(defaultDate);
    const formattedDefaultDate = formatDate(defaultDate, dateFormats.ISO_DATE);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (dateParam) {
        newParams.delete('slot');
        newParams.delete('slotId');
        newParams.delete('time');
      }
      newParams.set('date', formattedDefaultDate);
      return newParams;
    });
  }, [dateParam, setSearchParams]);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      if (!date) throw new Error('Missing date');
      if (role === Role.USER || role === Role.ADMIN) {
        if (!providerId) throw new Error('Missing provider Id');
        const res = await fetchServiceAvailabilityByProviderId({
          date: formatDate(date, dateFormats.ISO_DATE),
          providerId
        });
        return res.data;
      } else if (role === Role.PROVIDER) {
        const res = await fetchMyServiceAvailability(formatDate(date, dateFormats.ISO_DATE));
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
    if (!data?.modes?.length) {
      setSelectedMode(null);
      return;
    }

    const nextMode = modeParam && data.modes.includes(modeParam)
      ? modeParam
      : data.modes[0];
    setSelectedMode(nextMode);

    if (modeParam !== nextMode) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('mode', nextMode);
        newParams.delete('slot');
        newParams.delete('slotId');
        newParams.delete('time');
        return newParams;
      });
    }
  }, [data?.modes, modeParam, setSearchParams]);

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

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);

    if (newDate) {
      const formattedDate = formatDate(newDate, dateFormats.ISO_DATE);
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('date', formattedDate);
        newParams.delete('slot');
        newParams.delete('slotId');
        newParams.delete('time');
        newParams.delete('mode');
        return newParams;
      });
    } else {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('date');
        newParams.delete('slot');
        newParams.delete('slotId');
        newParams.delete('time');
        newParams.delete('mode');
        return newParams;
      });
    }
  };

  const handleBookAnAppoint = (slotId: string, time: string, availability: boolean) => {
    if (!availability) {
      toast.info('Slot is unavailable.');
      return;
    }
    if (!providerId || !slotId || !date || !selectedMode) {
      toast.error('Something went wrong. Please try again.');
      return;
    }

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('date', formatDate(date, dateFormats.ISO_DATE));
      newParams.set('slot', slotId);
      newParams.delete('slotId');
      newParams.set('time', time);
      newParams.set('mode', selectedMode);
      return newParams;
    });

  };

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      {(showHeading || canUpdate) && (
        <CardHeader className="flex justify-between items-center">
          {showHeading && (
            <CardTitle className="flex flex-row space-x-2">
              <CalendarDays className="size-4 text-[var(--mainColor)]" />
              <span>Service Availability</span>
            </CardTitle>
          )}
          {canUpdate && (
            <Button
              title="Update Service"
              variant={showForm ? 'destructive' : 'secondary'}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? 'Cancel' : 'Update'}
            </Button>
          )}
        </CardHeader>
      )}

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start">
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start self-start h-fit">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-xl border dark:border-border p-3 shadow-xs h-fit"
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
              <div
                className={`flex items-center justify-between p-3.5 rounded-xl border ${data?.isAvailable
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/60 dark:text-emerald-300'
                  : 'bg-rose-50/60 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800/60 dark:text-rose-300'
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  {data?.isAvailable ? (
                    <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="size-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-semibold">
                    {data?.isAvailable ? 'Service is Currently Available' : 'Service is Unavailable'}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${data?.isAvailable
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
                    }`}
                >
                  {data?.isAvailable ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DataField
                  label="Day"
                  value={data?.day}
                  Icon={CalendarDays}
                  isLoading={isLoading}
                  shimmerWidth="w-24"
                />

                <DataField
                  label="Available From"
                  value={data?.startTime}
                  Icon={Clock}
                  isLoading={isLoading}
                  shimmerWidth="w-20"
                />

                <DataField
                  label="Available Until"
                  value={data?.endTime}
                  Icon={Clock}
                  isLoading={isLoading}
                  shimmerWidth="w-20"
                />

                <DataField
                  label="Slot Duration"
                  value={data?.duration}
                  isTime
                  Icon={Timer}
                  isLoading={isLoading}
                  shimmerWidth="w-20"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-border/60">
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
                        'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-900/40 dark:border-gray-800 dark:text-gray-600',
                    },
                    {
                      label: 'Occupied Slot',
                      className:
                        'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400',
                    },
                  ]}
                />

                {data?.modes && data.modes.length > 0 && (
                  <div className="flex justify-between p-3 bg-slate-50/80 dark:bg-muted/20 border border-slate-200/80 dark:border-border/60 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <Settings2 className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Select Service Mode</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.modes.map((mode: string) => {
                        const isSelected = selectedMode === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => {
                              setSelectedMode(mode);
                              setSearchParams((prev) => {
                                const newParams = new URLSearchParams(prev);
                                newParams.set('mode', mode);
                                newParams.delete('slot');
                                newParams.delete('slotId');
                                newParams.delete('time');
                                return newParams;
                              });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 border ${isSelected
                              ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                              : 'bg-white dark:bg-muted/40 border-slate-200 dark:border-border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-muted/60'
                              }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-slate-300 dark:bg-slate-600'
                                }`}
                            />
                            {mode}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {data?.slots?.length ? (
                    data.slots.map((slot: Slot) => {
                      const isOccupied = slot.occupied || engagedSlotIds.has(slot._id);
                      const isAvailable = slot.available && !isOccupied;
                      const isSelected = selectedSlotId === slot._id;

                      const getSlotStyles = () => {
                        if (isSelected) {
                          return 'bg-[var(--mainColor)] border-[var(--mainColor)] text-white dark:bg-[var(--mainColor)] dark:border-[var(--mainColor)] dark:text-white shadow-sm';
                        }

                        if (isAvailable) {
                          return 'bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white dark:bg-indigo-950/40 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:hover:text-white cursor-pointer active:scale-95 shadow-2xs';
                        }

                        if (isOccupied) {
                          return 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400 opacity-80 cursor-not-allowed';
                        }

                        return 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-900/40 dark:border-gray-800 dark:text-gray-600 cursor-not-allowed';
                      };

                      const commonClasses = `text-xs font-semibold text-center border rounded-lg py-2.5 px-3 transition-all duration-150 flex items-center justify-center ${getSlotStyles()}`;

                      return role === Role.USER ? (
                        <Button
                          title={slot.time}
                          key={slot._id}
                          variant="outline"
                          disabled={!isAvailable && !isSelected}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBookAnAppoint(slot._id, slot.time, isAvailable);
                          }}
                          className={commonClasses}
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
                    <p className="col-span-full py-4 text-xs font-medium text-gray-500 text-center">
                      No slots available for this date
                    </p>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>
      </CardContent>

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
  );
};

export default ProviderServiceAvailability;