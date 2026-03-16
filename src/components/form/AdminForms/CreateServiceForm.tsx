import FormField from "../FormField";
import { useForm } from "react-hook-form";
import { FormButton } from "../FormSplits";
import { SelectField } from "../SelectField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceCategoryOptions } from "@/utils/constants";
import { slideOut } from "@/utils/helper/gsapAnimationSlide";
import { handleFormError } from "@/utils/helper/formErrorCatcher";
import { useAdminServiceActions } from "@/hooks/adminHooks/useAdminServiceActions";
import { AdminCreateServiceFormType, adminCreateServiceZodSchema } from "@/utils/zod/adminZod";
import { ServiceCategory } from "@/utils/interface/enums";
import { appConfig } from "@/utils/env";

interface CreateServiceFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

const CreateServiceForm: React.FC<CreateServiceFormProps> = ({
  onClose,
  formRef,
}) => {
  const { handleAdminServiceCreating } = useAdminServiceActions();

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
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminCreateServiceFormType>({
    resolver: zodResolver(adminCreateServiceZodSchema),
    mode: "onChange",
    defaultValues: {
      serviceName: "",
      serviceCategory: undefined,
    },
  });

  const onSubmit = async (data: AdminCreateServiceFormType) => {
    try {
      await handleAdminServiceCreating(data);
      reset();
      handleCloseForm();
    } catch (error) {
      if (appConfig.dev) {
        console.log("Error while saving service:", error);
      }
    }
  };

  return (
    <div
      ref={formRef}
      className="w-auto md:w-lg rounded-lg bg-[var(--background)] p-6 shadow-xl border-1"
    >
      <h3 className="text-lg lg:text-2xl font-bold text-center my-4">Create New Service</h3>
      <form
        onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))}
        className="space-y-6"
      >

        <SelectField<AdminCreateServiceFormType, ServiceCategory>
          id="serviceCategory"
          label="Service Category"
          options={serviceCategoryOptions}
          register={register}
          error={errors.serviceCategory}
        />

        <FormField<AdminCreateServiceFormType>
          id="serviceName"
          label="Service Name"
          placeholder="Enter Service Name"
          type="text"
          register={register}
          error={errors.serviceName?.message}
          required
        />
        
        <div className="space-y-2">
          <FormButton
            text="Save"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
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
