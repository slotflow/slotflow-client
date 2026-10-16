import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { useForm } from 'react-hook-form';
import React, { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { Day } from '@/shared/types/enums';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { useAddAvailability } from '@/hooks/useServiceAvailability';
import { ProviderServiceAvailabilityFormProps } from '@/shared/types/component';
import { createServiceAvailabilities } from '@/services/apis/serviceAvailability';
import { addAvailability, removeAvailability } from '@/app/store/slices/providerSlice';
import TimeRangeSetter from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/TimeRangeSetter';
import GenerateTimeSlots from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/GenerateTimeSlots';
import SavedAvailabilities from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/SavedAvailabilityes';
import {
  ProviderServiceAvailabilityFormType,
  providerServiceAvailabilityZodSchema,
} from '@/shared/validators/zod/providerZod';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { formatString } from '@/shared/utils/helper/formatString';
import { Availability } from '@/shared/types/entity/serviceAvailability';
import AvailabilityDataSelectionFields from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/AvailabilityDataSelectionFields';
import CreateServiceAvailabilityFooter from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/CreateServiceAvailabilityFooter';

const ProviderServiceAvailabilityForm = ({
  isUpdating = false,
  heading,
}: ProviderServiceAvailabilityFormProps) => {
  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { availabilities } = useSelector((store: RootState) => store.provider);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, isValid, isLoading },
  } = useForm<ProviderServiceAvailabilityFormType>({
    resolver: zodResolver(providerServiceAvailabilityZodSchema),
    mode: 'onChange',
    defaultValues: {
      day: Day.SUNDAY,
      isAvailable: false,
      duration: 10,
      startTime: new Date(),
      endTime: new Date(),
      modes: [],
      timeSlots: [],
      selectedTimeSlots: [],
    },
  });

  const watched = watch();
  const { timeSlots, selectedTimeSlots } = watched;

  const { handleAddAvailability, generateTimeSlots, isModeSelected, toggleMode, toggleSlot } =
    useAddAvailability({ getValues, setValue });

  const hasAllDays = useMemo(() => {
    if (!availabilities || availabilities.length < 7) return false;
    return true;
  }, [availabilities]);

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
        toast.error('Please generate slots first');
      }
    } else {
      setValue('selectedTimeSlots', [], { shouldDirty: true });
    }
  };

  const onAddAvailability = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = handleAddAvailability();
    if (!res.success) {
      toast.warning(res.message);
    } else if (res.data) {
      toast.success(res.message);
      dispatch(addAvailability(res.data));
      reset({
        day: Day.SUNDAY,
        isAvailable: false,
        duration: 10,
        startTime: new Date(),
        endTime: new Date(),
        modes: [],
        timeSlots: [],
        selectedTimeSlots: [],
      });
    }
  };

  const onGenerateSlots = () => {
    const start = getValues('startTime');
    const end = getValues('endTime');
    const duration = getValues('duration');
    if (!start || !end || !duration) {
      toast.error('Please complete time range and duration selections');
      return;
    }
    const res = generateTimeSlots(start, end, duration);
    if (!res.success) {
      toast.warning(res.message);
    } else {
      toast.success(res.message);
    }
  };

  const allSlotsSelected = useMemo(() => {
    return timeSlots && timeSlots.length > 0 && selectedTimeSlots?.length === timeSlots.length;
  }, [timeSlots, selectedTimeSlots]);

  const onSubmit = async () => {
    if (!hasAllDays || !availabilities) {
      toast.info('Please specify availability for all 7 days before submitting.');
      return;
    }
    try {
      const res = await dispatch(createServiceAvailabilities({ data: availabilities })).unwrap();
      if (res.success) {
        toast.success(res.message);
        goTo(
          authUser?.isServiceAvailabilityAdded
            ? redirectPaths.ONBOARDING_PENDING
            : redirectPaths.ONBOARDING_PROOFS,
        );
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error('Failed to submit availabilities:', error);
      }
    }
  };

  const handleCopyLastAvailability = (targetDay: Day, lastAvailability: Availability) => {
    const copiedAvailability: Availability = {
      ...lastAvailability,
      day: targetDay,
    };
    dispatch(addAvailability(copiedAvailability));
    toast.success(`Copied schedule to ${formatString(targetDay)}`);
  };

  const handleRemoveAvailability = (day: Day) => {
    if (!day || !availabilities) return;
    dispatch(removeAvailability(day));
    toast.success(`Removed ${formatString(day)} availability`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {heading && <h4 className="text-xl lg:text-2xl font-semibold text-start">{heading}</h4>}

      <div className="flex w-full flex-col space-y-6">
        <div className="space-y-4 w-full pt-4">
          <AvailabilityDataSelectionFields
            control={control}
            isModeSelected={isModeSelected}
            toggleMode={toggleMode}
            isAvailable={watched.isAvailable}
          />

          {watched.isAvailable && (
            <TimeRangeSetter
              control={control}
              isSubmitting={isSubmitting}
              onGenerateSlots={onGenerateSlots}
            />
          )}

          <GenerateTimeSlots
            timeSlots={timeSlots}
            selectedTimeSlots={selectedTimeSlots}
            allSlotsSelected={allSlotsSelected}
            handleAllSlots={handleAllSlots}
            toggleSlot={toggleSlot}
            control={control}
            isAvailable={watched.isAvailable}
          />

          <SavedAvailabilities
            availabilities={availabilities}
            removeAvailability={handleRemoveAvailability}
            onCopyLastAvailability={handleCopyLastAvailability}
          />
        </div>
      </div>

      <CreateServiceAvailabilityFooter
        selectedTimeSlots={selectedTimeSlots}
        isSubmitting={isSubmitting}
        onAddAvailability={onAddAvailability}
        hasAllDays={hasAllDays}
        isValid={isValid}
        isUpdating={isUpdating}
        isLoading={isLoading}
        isAvailable={watched.isAvailable}
      />
    </form>
  );
};

export default ProviderServiceAvailabilityForm;
