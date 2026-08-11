import { toast } from 'react-toastify';
import SelectField from '../SelectField';
import { useForm } from 'react-hook-form';
import { FormButton } from '../FormButton';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/shared/config/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { createService } from '@/shared/apis/service';
import { useQueryClient } from '@tanstack/react-query';
import { ServiceCategory } from '@/shared/interface/enums';
import { slideOut } from '@/shared/helper/gsapAnimationSlide';
import DynamicStringListField from '../DynamicStringListFields';
import { serviceCategoryOptions } from '@/shared/utils/constants';
import { handleFormError } from '@/shared/helper/formErrorCatcher';
import { CreateServiceFormProps } from '@/shared/interface/componentInterface';
import { AdminCreateServiceFormType, adminCreateServiceZodSchema } from '@/shared/zod/adminZod';

const CreateServiceForm = ({ onClose, formRef }: CreateServiceFormProps) => {
  const queryClient = useQueryClient();

  const handleCloseForm = () => {
    slideOut(formRef.current, {
      onComplete: onClose,
    });
  };

  const {
    register,
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

  const onSubmit = async (data: AdminCreateServiceFormType): Promise<void> => {
    try {
      const normalizedNames = data.serviceNames
        .map((serviceName) => serviceName.trim())
        .filter(Boolean);

      const res = await createService({
        serviceCategory: data.serviceCategory,
        serviceNames: normalizedNames,
      });

      if (res.success) {
        toast.success(res.message);

        const initialNames = [''];

        reset({
          serviceNames: initialNames,
          serviceCategory: undefined,
        });

        handleCloseForm();

        queryClient.invalidateQueries({
          queryKey: ['appServices'],
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('Error while saving services:', error);
      }

      toast.error('Something went wrong while creating services');
    }
  };

  return (
    <div
      ref={formRef}
      className="w-auto md:w-lg max-h-[90vh] rounded-lg bg-[var(--background)] p-6 shadow-xl border-1 flex flex-col"
    >
      <h3 className="text-lg lg:text-2xl font-bold text-center my-4 shrink-0">
        Create New Services
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))}
        className="flex flex-col min-h-0 flex-1"
      >
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-6">
          <SelectField<AdminCreateServiceFormType, ServiceCategory>
            id="serviceCategory"
            label="Service Category"
            options={serviceCategoryOptions}
            register={register}
            error={errors.serviceCategory}
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

        <div className="space-y-2 pt-4 shrink-0">
          <FormButton
            text={isSubmitting ? 'Saving' : 'Save'}
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
            title="Save"
          />

          <Button
            title="Cancel"
            variant="destructive"
            className="cursor-pointer w-full"
            type="button"
            onClick={handleCloseForm}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateServiceForm;
