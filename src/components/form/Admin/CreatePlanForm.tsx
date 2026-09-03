import { X } from 'lucide-react';
import FormField from '../FormField';
import { toast } from 'react-toastify';
import SelectField from '../SelectField';
import { appConfig } from '@/config/env';
import { useForm } from 'react-hook-form';
import { FormButton } from '../FormButton';
import { Button } from '@/components/ui/button';
import { PlanName } from '@/shared/types/enums';
import { createPlan } from '@/services/apis/plan';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { CreatePlanFormProps } from '@/shared/types/component';
import DynamicStringListField from '../DynamicStringListFields';
import { slideOut } from '@/shared/utils/helper/gsapAnimationSlide';
import { adVisibility, planNameOptions } from '@/shared/utils/constants';
import {
  AdminCreatePlanFormType,
  adminCreatePlanZodSchema,
} from '@/shared/validators/zod/adminZod';

const CreatePlanForm = ({ onClose, formRef }: CreatePlanFormProps) => {
  const queryClient = useQueryClient();

  const handleCloseForm = () => {
    slideOut(formRef.current, {
      onComplete: onClose,
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<AdminCreatePlanFormType>({
    resolver: zodResolver(adminCreatePlanZodSchema),
    mode: 'onChange',
    defaultValues: {
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

  const features = watch('features');
  const hasTrial = watch('hasTrial');

  const onSubmit = async (data: AdminCreatePlanFormType) => {
    await createPlan(data)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          reset();
          onClose();
          queryClient.invalidateQueries({ queryKey: ['plans'] });
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        if (appConfig.isDevelopment) {
          console.log('An error occured while saving plan : ', error);
        }
        toast.error(error.message);
      });
  };

  return (
    <div
      ref={formRef}
      className="relative w-full max-w-4xl mx-auto rounded-2xl bg-background/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl border border-zinc-200/80 dark:border-zinc-800 transition-all max-h-[85vh] flex flex-col"
    >
      <div className="flex items-center justify-between pb-5 border-b border-zinc-200/60 dark:border-zinc-800 shrink-0">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            Create New Plan
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configure pricing, limits, and features for this subscription plan.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCloseForm}
          disabled={isSubmitting}
          className="cursor-pointer p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden pt-6">
        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              1. General Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField<AdminCreatePlanFormType, PlanName>
                id="planName"
                label="Plan Name"
                register={register}
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
              <SelectField<AdminCreatePlanFormType, boolean>
                id="adVisibility"
                label="Advertisement Visibility"
                register={register}
                error={errors.adVisibility}
                options={adVisibility}
                required
              />
              <SelectField<AdminCreatePlanFormType, boolean>
                id="hasTrial"
                label="Enable 14-Day Free Trial?"
                register={register}
                error={errors.hasTrial?.message}
                options={[
                  { label: 'No', value: false },
                  { label: 'Yes', value: true },
                ]}
                required
              />
              {hasTrial && (
                <FormField<AdminCreatePlanFormType>
                  id="trialDays"
                  label="Trial Period (Days)"
                  placeholder="14"
                  type="number"
                  register={register}
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
                Array.isArray(errors.features) ? errors.features.map((error) => error?.message) : []
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

        {/* Fixed Bottom Footer Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 mt-4 border-t border-zinc-200/60 dark:border-zinc-800 shrink-0">
          <Button
            title="Cancel"
            variant="destructive"
            type="button"
            disabled={isSubmitting}
            onClick={handleCloseForm}
            className="cursor-pointer w-full sm:w-auto min-w-[100px]"
          >
            Cancel
          </Button>

          <div className="w-full sm:w-auto min-w-[120px]">
            <FormButton
              text={isSubmitting ? 'Saving' : 'Save'}
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              title="Save"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePlanForm;
