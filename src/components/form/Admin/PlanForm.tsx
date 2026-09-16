import { useEffect } from 'react';
import FormField from '../FormField';
import { useForm } from 'react-hook-form';
import ToggleField from '../ToggleField';
import { Loader2, X } from 'lucide-react';
import { FormButton } from '../FormButton';
import SelectField from '../SelectFieldNew';
import { Button } from '@/components/ui/button';
import { PlanName } from '@/shared/types/enums';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanFormProps } from '@/shared/types/component';
import { useAdminPlan } from '@/hooks/adminHooks/usePlan';
import { UpdatePlanRequest } from '@/shared/types/api/plan';
import { adminFetchPlanDetails } from '@/services/apis/plan';
import DynamicStringListField from '../DynamicStringListFields';
import { slideOut } from '@/shared/utils/helper/gsapAnimationSlide';
import { planNameOptions } from '@/shared/utils/constants/planConstants';
import { AdminCreatePlanFormType, adminCreatePlanZodSchema } from '@/shared/validators/zod/adminZod';
import { closeBtnClass } from '@/shared/utils/constants';

const PlanForm = ({ onClose, formRef, planIdToEdit }: PlanFormProps) => {
  const isEditMode = Boolean(planIdToEdit);
  const { createPlan, updatePlan } = useAdminPlan();

  const { data: planDetailResponse, isLoading: isFetchingPlan } = useQuery({
    queryKey: ['planDetails', planIdToEdit],
    queryFn: () => adminFetchPlanDetails({ planId: planIdToEdit! }),
    enabled: Boolean(planIdToEdit),
  });

  const planData = planDetailResponse?.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, isValid, dirtyFields, isDirty },
  } = useForm<AdminCreatePlanFormType>({
    resolver: zodResolver(adminCreatePlanZodSchema),
    mode: 'onChange',
    defaultValues: isEditMode
      ? undefined
      : {
        planName: PlanName.STARTER,
        description: '',
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [''],
        maxBookingPerMonth: 0,
        adVisibility: false,
        hasTrial: false,
        trialDays: 14,
      },
  });

  useEffect(() => {
    if (isEditMode && planData && !isDirty) {
      reset({
        planName: planData.planName,
        description: planData.description || '',
        monthlyPrice: planData.monthlyPrice,
        yearlyPrice: planData.yearlyPrice,
        features: planData.features?.length ? planData.features : [''],
        maxBookingPerMonth: planData.maxBookingPerMonth,
        adVisibility: Boolean(planData.adVisibility),
        hasTrial: Boolean(planData.hasTrial),
        trialDays: planData.trialDays ?? 14,
      });
    }
  }, [planData, isEditMode, reset, isDirty]);

  const features = watch('features');
  const hasTrial = watch('hasTrial');
  const trialDays = watch('trialDays');
  const adVisibility = watch('adVisibility');

  const handleClosePlanForm = () => {
    slideOut(formRef.current, {
      onComplete: () => {
        reset();
        onClose();
      },
    });
  };

  const onSubmit = async (data: AdminCreatePlanFormType) => {
    if (isEditMode && planIdToEdit) {
      const changedFields = Object.fromEntries(
        (Object.keys(dirtyFields) as Array<keyof AdminCreatePlanFormType>).map((key) => [
          key,
          data[key],
        ]),
      ) as Partial<AdminCreatePlanFormType>;

      const payload: UpdatePlanRequest = {
        planId: planIdToEdit,
        ...changedFields,
      };

      const res = await updatePlan(payload);
      if (res?.success) {
        reset();
        onClose();
      }
    } else {
      const res = await createPlan(data);
      if (res?.success) {
        reset();
        onClose();
      }
    }
  };

  return (
    <div
      ref={formRef}
      className="relative w-full max-w-4xl mx-auto rounded-2xl bg-background/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl border border-zinc-200/80 dark:border-zinc-800 transition-all max-h-[85vh] flex flex-col"
    >
      <div className="flex items-center justify-between pb-5 border-b border-zinc-200/60 dark:border-zinc-800 shrink-0">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            {isEditMode ? 'Edit Subscription Plan' : 'Create New Plan'}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isEditMode
              ? 'Update details, pricing limits, and features for this subscription plan.'
              : 'Configure pricing, limits, and features for this subscription plan.'}
          </p>
        </div>
        <Button
          type="button"
          size='icon'
          variant='ghost'
          onClick={handleClosePlanForm}
          disabled={isSubmitting}
          className={closeBtnClass}
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {isFetchingPlan ? (
        <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground mt-2">Loading plan details...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden pt-6"
        >
          <div className="flex-1 overflow-y-auto space-y-8 pr-2">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                1. General Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectField<AdminCreatePlanFormType, PlanName>
                  id="planName"
                  label="Plan Name"
                  control={control}
                  error={errors.planName?.message}
                  options={planNameOptions}
                  required
                />
                <FormField<AdminCreatePlanFormType>
                  id="description"
                  label="Plan Description"
                  placeholder="e.g. Best suited for growing teams"
                  type="text"
                  register={register}
                  error={errors.description?.message}
                  readOnly={false}
                  required={true}
                />
                <ToggleField<AdminCreatePlanFormType>
                  id="adVisibility"
                  label={`Advertisement ${adVisibility ? 'Enabled' : 'Disabled'}`}
                  description="Provider profile advertisement."
                  control={control}
                  disabled={isSubmitting}
                  error={errors.adVisibility?.message}
                />
                <ToggleField<AdminCreatePlanFormType>
                  id="hasTrial"
                  label={`Trial Availability ${hasTrial ? 'Enabled' : 'Disabled'}`}
                  description="Plan trial availability."
                  control={control}
                  disabled={isSubmitting}
                  error={errors.hasTrial?.message}
                />
                {hasTrial && (
                  <FormField<AdminCreatePlanFormType>
                    id="trialDays"
                    label="Trial Period (Days)"
                    placeholder="14"
                    type="number"
                    register={register}
                    defaultValue={trialDays}
                    error={errors.trialDays?.message}
                    required
                  />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                2. Pricing & Limits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80">
                <FormField<AdminCreatePlanFormType>
                  id="monthlyPrice"
                  label="Monthly Price"
                  placeholder="0.00"
                  type="number"
                  register={register}
                  error={errors.monthlyPrice?.message}
                  readOnly={false}
                  required={true}
                />
                <FormField<AdminCreatePlanFormType>
                  id="yearlyPrice"
                  label="Yearly Price"
                  placeholder="0.00"
                  type="number"
                  register={register}
                  error={errors.yearlyPrice?.message}
                  readOnly={false}
                  required={true}
                />
                <FormField<AdminCreatePlanFormType>
                  id="maxBookingPerMonth"
                  label="Max Monthly Bookings"
                  placeholder="e.g. 100"
                  type="number"
                  register={register}
                  error={errors.maxBookingPerMonth?.message}
                  readOnly={false}
                  required={true}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                  3. Plan Features
                </h4>
                <span className="text-xs text-muted-foreground">At least 2 required</span>
              </div>

              <DynamicStringListField
                label="Features"
                placeholder="Enter service name"
                values={features}
                errors={
                  Array.isArray(errors.features)
                    ? errors.features.map((error) => error?.message)
                    : []
                }
                arrayError={!Array.isArray(errors.features) ? errors.features?.message : undefined}
                onChange={(values) => {
                  setValue('features', values, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                helperText="You can paste multiple service names separated by commas or new lines."
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 mt-4 border-t border-zinc-200/60 dark:border-zinc-800 shrink-0">
            <Button
              title="Cancel"
              variant="destructive"
              type="button"
              disabled={isSubmitting}
              onClick={handleClosePlanForm}
              className="cursor-pointer w-full sm:w-auto min-w-[100px]"
            >
              Cancel
            </Button>

            <div className="w-full sm:w-auto min-w-[120px]">
              <FormButton
                text={
                  isSubmitting
                    ? isEditMode
                      ? 'Updating...'
                      : 'Saving...'
                    : isEditMode
                      ? 'Update Plan'
                      : 'Save'
                }
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                title={isEditMode ? 'Update' : 'Save'}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlanForm;
