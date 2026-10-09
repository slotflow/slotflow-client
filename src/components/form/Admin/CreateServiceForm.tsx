import { X } from 'lucide-react';
import SelectField from '../SelectField';
import { useForm } from 'react-hook-form';
import { FormButton } from '../FormButton';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServiceCategory } from '@/shared/types/enums';
import DynamicStringListField from '../DynamicStringListFields';
import { useAdminService } from '@/hooks/adminHooks/useService';
import { CreateServiceFormProps } from '@/shared/types/component';
import { slideOut } from '@/shared/utils/helper/gsapAnimationSlide';
import { handleFormError } from '@/shared/utils/helper/formErrorCatcher';
import {
  AdminCreateServiceFormType,
  adminCreateServiceZodSchema,
} from '@/shared/validators/zod/adminZod';
import { serviceCategoryOptions } from '@/shared/utils/constants/selectOptionsConstants';

const CreateServiceForm = ({ onClose, formRef }: CreateServiceFormProps) => {
  const { createService } = useAdminService();

  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminCreateServiceFormType>({
    resolver: zodResolver(adminCreateServiceZodSchema),
    mode: 'onChange',
    defaultValues: {
      serviceNames: [''],
      serviceCategory: undefined,
    },
  });

  const serviceNames = watch('serviceNames');

  const handleCloseForm = () => {
    slideOut(formRef.current, {
      onComplete: () => {
        reset();
        onClose();
      },
    });
  };

  const onSubmit = async (data: AdminCreateServiceFormType): Promise<void> => {
    const normalizedNames = data.serviceNames
      .map((serviceName) => serviceName.trim())
      .filter(Boolean);

    const res = await createService({
      serviceCategory: data.serviceCategory,
      serviceNames: normalizedNames,
    });
    if (res.success) {
      const initialNames = [''];
      reset({
        serviceNames: initialNames,
        serviceCategory: undefined,
      });
      handleCloseForm();
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
            Create New Services
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Add service categories and configure dynamic names.
          </p>
        </div>

        <Button
          title="close"
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleCloseForm}
          disabled={isSubmitting}
          aria-label="Close form"
        >
          <X className="size-5" />
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))}
        className="flex flex-col min-h-0 flex-1 pt-6"
      >
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
          <SelectField<AdminCreateServiceFormType, ServiceCategory>
            id="serviceCategory"
            label="Service Category"
            options={serviceCategoryOptions}
            control={control}
            error={errors.serviceCategory?.message}
          />

          <DynamicStringListField
            label="Service Names"
            placeholder="Enter service name"
            values={serviceNames}
            errors={
              Array.isArray(errors.serviceNames)
                ? errors.serviceNames.map((error) => error?.message)
                : []
            }
            arrayError={
              !Array.isArray(errors.serviceNames) ? errors.serviceNames?.message : undefined
            }
            onChange={(values) => {
              setValue('serviceNames', values, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            helperText="You can paste multiple service names separated by commas or new lines."
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

export default CreateServiceForm;
