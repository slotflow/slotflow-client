import FormField from "../FormField";
import { useForm } from "react-hook-form";
import { FormButton } from "../FormSplits";
import { SelectField } from "../SelectField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceCategoryOptions } from "@/utils/constants";
import { slideOut } from "@/utils/helper/gsapAnimationSlide";
import { handleFormError } from "@/utils/helper/formErrorCatcher";
import { useAdminServiceActions } from "@/utils/hooks/adminHooks/useAdminServiceActions";
import { AdminCreateServiceFormType, adminCreateServiceZodSchema } from "@/utils/zod/adminZod";
import { ServiceCategoryType } from "@/utils/interface/commonInterface";

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
      if (import.meta.env.DEV) {
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
        <FormField<AdminCreateServiceFormType>
          id="serviceName"
          label="Service Name"
          placeholder="Enter Service Name"
          type="text"
          register={register}
          error={errors.serviceName?.message}
          required
        />

        <SelectField<AdminCreateServiceFormType, ServiceCategoryType>
          id="serviceCategory"
          label="Service Category"
          options={serviceCategoryOptions}
          register={register}
          error={errors.serviceCategory}
        />

        <div className="space-y-2">
          <FormButton
            text="Save"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
          />
          <Button variant="destructive" className="cursor-pointer w-full" type="button" onClick={handleCloseForm}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateServiceForm;
