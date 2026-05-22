import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '@/shared/config/env';
import React, { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { redirectPaths } from '@/shared/utils/constants';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { useAddAvailability } from '@/hooks/useServiceAvailability';
import { createServiceAvailabilities } from '@/shared/apis/serviceAvailability';
import { addAvailability, removeAvailability } from '@/shared/redux/slices/providerSlice';
import { ProviderServiceAvailabilityFormProps } from '@/shared/interface/componentInterface';
import TimeRangeSetter from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/TimeRangeSetter';
import { ProviderServiceAvailabilityFormType, providerServiceAvailabilityZodSchema } from '@/shared/zod/providerZod';
import GenerateTimeSlots from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/GenerateTimeSlots';
import SavedAvailabilities from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/SavedAvailabilityes';
import AvailabilityDataSelectionFields from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/AvailabilityDataSelectionFields';
import CreateServiceAvailabilityFooter from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/CreateServiceAvailabilityFooter';

const ProviderServiceAvailabilityForm: React.FC<ProviderServiceAvailabilityFormProps> = ({
  isUpdating = false,
  heading
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { availabilities } = useSelector((store: RootState) => store.provider);

  const {
    control,
    watch,
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid, isLoading }
  } = useForm<ProviderServiceAvailabilityFormType>({
    resolver: zodResolver(providerServiceAvailabilityZodSchema),
    mode: 'onChange',
    defaultValues: {
      day: '',
      isAvailable: false,
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

  const {
    handleAddAvailability,
    generateTimeSlots,
    isModeSelected,
    toggleMode,
    toggleSlot,
  } = useAddAvailability({ getValues, setValue });

  useEffect(() => {
    if (timeSlots && selectedTimeSlots && selectedTimeSlots.length > 0) {
      const filtered = selectedTimeSlots.filter((t) => timeSlots.includes(t));
      if (filtered.length !== selectedTimeSlots.length) {
        setValue('selectedTimeSlots', filtered);
      }
    }
  }, [timeSlots, selectedTimeSlots, setValue]);

  // Handle all slots
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

  // Add availability
  const onAddAvailability = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = handleAddAvailability();
    if (!res.success) {
      toast.warning(res.message);
    } else if (res.data) {
      toast.success(res.message);
      dispatch(addAvailability(res.data));
    }
  };

  // Generate time slots
  const onGenerateSlots = () => {
    const start = getValues('startTime');
    const end = getValues('endTime');
    const duration = getValues('duration');
    if (!start || !end || !duration) {
      toast.error("Please fill all the fields");
      return;
    }
    const res = generateTimeSlots(start, end, duration);
    if (!res.success) {
      toast.warning(res.message);
    } else {
      toast.success(res.message);
    }
  };

  // Check if all slots are selected
  const allSlotsSelected = useMemo(() => {
    return (timeSlots && timeSlots.length > 0) && (selectedTimeSlots?.length === timeSlots.length);
  }, [timeSlots, selectedTimeSlots]);

  // Submit availabilities
  const onSubmit = async () => {

    if (!availabilities || availabilities.length === 0) {
      toast.info("You didn't add any availability.");
      return;
    }
    try {
      if (authUser?.isServiceAvailabilityAdded) {
        // need to create the service availability updating api
        const res = await dispatch(createServiceAvailabilities({ data: availabilities })).unwrap();
        if (res.success) {
          toast.success(res.message);
          navigate(redirectPaths.ONBOARDING_PENDING);
        }
      } else {
        const res = await dispatch(createServiceAvailabilities({ data: availabilities })).unwrap();
        if (res.success) {
          toast.success(res.message);
          navigate(redirectPaths.ONBOARDING_PROOFS);
        }
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Something went wrong while submitting availabilities : ", error);
      }
    }
  };

  // remove availability from store
  const handleRemoveAvailability = (day: string) => {
    if (!day || !availabilities) return;
    dispatch(removeAvailability(day));
    toast.success("Availability removed");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {heading && (
        <h4 className="text-xl lg:text-2xl font-semibold text-start">
          {heading}
        </h4>
      )}
      <div className="flex w-full flex-col space-y-6">
        <div className="space-y-4 w-full space-x-2 pt-6">
          <AvailabilityDataSelectionFields
            register={register}
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
          />
        </div>
      </div>
      <CreateServiceAvailabilityFooter
        selectedTimeSlots={selectedTimeSlots}
        isSubmitting={isSubmitting}
        onAddAvailability={onAddAvailability}
        availabilities={availabilities}
        isValid={isValid}
        isUpdating={isUpdating}
        isLoading={isLoading}
        isAvailable={watched.isAvailable}
      />
    </form>
  )
}

export default ProviderServiceAvailabilityForm;