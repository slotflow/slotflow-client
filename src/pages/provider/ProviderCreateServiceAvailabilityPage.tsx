import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '@/shared/config/env';
import SideBox from '@/components/provider/SideBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, FormEvent, useMemo } from 'react';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { useAddAvailability } from '@/hooks/useServiceAvailability';
import { addAvailability } from '@/shared/redux/slices/providerSlice';
import { redirectPaths, updatableStatuses } from '@/shared/utils/constants';
import { createServiceAvailabilities } from '@/shared/apis/serviceAvailability';
import TimeRangeSetter from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/TimeRangeSetter';
import { ProviderServiceAvailabilityFormType, providerServiceAvailabilityZodSchema } from '@/shared/zod/providerZod';
import GenerateTimeSlots from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/GenerateTimeSlots';
import AvailabilityDataSelectionFields from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/AvailabilityDataSelectionFields';
import CreateServiceAvailabilityFooter from '@/components/serviceAvailability/createServiceAvailabilityPageSplits/CreateServiceAvailabilityFooter';

const ProviderCreateServiceAvailabilityPage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { dataUpdating } = useSelector((store: RootState) => store.auth);
  const { availabilities } = useSelector((store: RootState) => store.provider);
  const adminStatus = authUser?.adminVerificationStatus;
  const isUpdatable = adminStatus !== undefined && (updatableStatuses as readonly string[]).includes(adminStatus);
  const redirectUrl: string = isUpdatable ? redirectPaths.PROVIDER_APPROVAL_PENDING : redirectPaths.PROVIDER_PROOFS;

  const {
    control,
    watch,
    register,
    setValue,
    getValues,
    formState: { isSubmitting, isValid }
  } = useForm<ProviderServiceAvailabilityFormType>({
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
    const res = generateTimeSlots(start, end, duration);
    if (!res.success) {
      toast.warning(res.message);
    } else {
      toast.success(res.message);
    }
  };

  // Check if all slots are selected
  const allSlotsSelected = useMemo(() => {
    return (timeSlots && timeSlots.length > 0) && (selectedTimeSlots.length === timeSlots.length);
  }, [timeSlots, selectedTimeSlots]);

  // Submit availabilities
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!availabilities || availabilities.length === 0) {
      toast.info("You didn't add any availability.");
      return;
    }

    dispatch(createServiceAvailabilities({ data: availabilities }))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          navigate(redirectUrl)
        }
      })
      .catch((error) => {
        if (appConfig.isDevelopment) {
          console.log("Something went wrong while submitting availabilities : ", error);
        }
      });
  };

  return (
    <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox props={{ pageNumber: 3 }} />
      <div className="w-full md:w-8/12 md:px-10 overflow-y-scroll no-scrollbar">
        <form className="md:mt-10 px-4 md:px-12 py-6 md:py-0" onSubmit={onSubmit}>
          <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start px-6">Service Availability</h4>
          <div className="flex w-full flex-col space-y-6">
            <AvailabilityDataSelectionFields
              register={register}
              isModeSelected={isModeSelected}
              toggleMode={toggleMode}
            />

            <TimeRangeSetter
              control={control}
              isSubmitting={isSubmitting}
              onGenerateSlots={onGenerateSlots}
            />

            <GenerateTimeSlots
              timeSlots={timeSlots}
              selectedTimeSlots={selectedTimeSlots}
              allSlotsSelected={allSlotsSelected}
              handleAllSlots={handleAllSlots}
              toggleSlot={toggleSlot}
              control={control}
            />
          </div>

          <CreateServiceAvailabilityFooter
            selectedTimeSlots={selectedTimeSlots}
            isSubmitting={isSubmitting}
            onAddAvailability={onAddAvailability}
            availabilities={availabilities}
            isValid={isValid}
            dataUpdating={dataUpdating}
          />
        </form>
      </div>
    </div>
  );
};

export default ProviderCreateServiceAvailabilityPage;

