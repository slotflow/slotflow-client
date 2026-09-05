import { X } from 'lucide-react';
import FormField from '../FormField';
import { toast } from 'react-toastify';
import ToggleField from '../ToggleField';
import { appConfig } from '@/config/env';
import { FormButton } from '../FormButton';
import SelectField from '../SelectFieldNew';
import { Button } from '@/components/ui/button';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServiceCategory } from '@/shared/types/enums';
import { useAdminService } from '@/hooks/adminHooks/useService';
import { EditServiceFormProps } from '@/shared/types/component';
import { serviceCategoryOptions } from '@/shared/utils/constants';
import { slideOut } from '@/shared/utils/helper/gsapAnimationSlide';
import { handleFormError } from '@/shared/utils/helper/formErrorCatcher';
import {
  AdminEditServiceFormType,
  adminEditServiceZodSchema,
} from '@/shared/validators/zod/adminZod';

const EditServiceForm = ({ onClose, formRef, serviceToEdit }: EditServiceFormProps) => {
  const { updateService } = useAdminService();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminEditServiceFormType>({
    resolver: zodResolver(adminEditServiceZodSchema),
    mode: 'onChange',
    defaultValues: {
      serviceName: serviceToEdit?.serviceName ?? '',
      serviceCategory: serviceToEdit?.serviceCategory,
      isBlocked: serviceToEdit?.isBlocked ?? false,
    },
  });

  const isBlocked = useWatch({
    control,
    name: 'isBlocked',
  });

  const handleCloseForm = () => {
    slideOut(formRef.current, {
      onComplete: () => {
        reset();
        onClose();
      },
    });
  };

  const onSubmit = async (data: AdminEditServiceFormType): Promise<void> => {
    try {
      if (!serviceToEdit?._id) {
        toast.error('Failed to fetch service for updating.');
        return;
      }

      const res = await updateService({
        _id: serviceToEdit._id,
        serviceCategory: data.serviceCategory,
        serviceName: data.serviceName,
        isBlocked: data.isBlocked,
      });

      if (res.success) {
        toast.success(res.message || 'Service updated successfully');
        reset();
        handleCloseForm();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error('Error while saving service:', error);
      }
      toast.error('Something went wrong while updating service');
    }
  };

  return (
    <div
      ref={formRef}
      className="relative w-full max-w-lg mx-auto max-h-[90vh] rounded-2xl bg-background/95 dark:bg-zinc-900/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl border border-zinc-200/80 dark:border-zinc-800 transition-all flex flex-col"
    >
      <div className="flex items-center justify-between pb-5 border-b border-zinc-200/60 dark:border-zinc-800 shrink-0">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            Edit Service
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Modify service details and availability status.
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

      <form
        onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))}
        className="flex flex-col min-h-0 flex-1 pt-6"
      >
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
          <SelectField<AdminEditServiceFormType, ServiceCategory>
            id="serviceCategory"
            label="Service Category"
            options={serviceCategoryOptions}
            control={control}
            error={errors.serviceCategory?.message}
            required
          />

          <FormField<AdminEditServiceFormType>
            id="serviceName"
            label="Service Name"
            placeholder="Enter service name"
            type="text"
            register={register}
            readOnly={false}
            defaultValue={serviceToEdit?.serviceName}
            error={errors.serviceName?.message}
            required
          />

          <ToggleField<AdminEditServiceFormType>
            id="isBlocked"
            label={isBlocked ? 'Unblock service' : 'Block service'}
            description="Prevent users from choosing this service."
            control={control}
            disabled={isSubmitting}
            error={errors.isBlocked?.message}
          />
        </div>

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
              text={isSubmitting ? 'Updating' : 'Update'}
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

export default EditServiceForm;
