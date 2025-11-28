import FormField from "../FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton, FormHeading } from "../FormSplits";
import { handleFormError } from "@/utils/helper/formErrorCatcher";
import { AdminCreateServiceForm, adminCreateServiceZodSchema } from "@/utils/zod/adminZod";
import { useAdminServiceActions } from "@/utils/hooks/adminHooks/useAdminServiceActions";

const ServiceAddingForm: React.FC = () => {

  const { handleAdminServiceAdding } = useAdminServiceActions();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminCreateServiceForm>({
    resolver: zodResolver(adminCreateServiceZodSchema),
    mode: "onChange",
    defaultValues: {
      serviceName: "",
    },
  });

  const onSubmit = async (data: AdminCreateServiceForm) => {
    try {
      handleAdminServiceAdding({ serviceName: data.serviceName });
      reset();
    } catch (error) {
      if (import.meta.env.DEV) console.log("An error occured while saving Service : ", error);
    }
  };

  return (
    <div className="flex p-4 flex-1 flex-col justify-center border-[1px] rounded-md">
      <FormHeading title="Create New Service" />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))} className="space-y-6">
          <FormField<AdminCreateServiceForm>
            id="serviceName"
            label="Service Name"
            placeholder="Enter Service Name"
            type="text"
            register={register}
            error={errors.serviceName?.message}
            readOnly={false}
            required={true}
          />
          <FormButton text="Save" loading={isSubmitting} disabled={isSubmitting || !isValid} />
        </form>
      </div>
    </div>
  );
};

export default ServiceAddingForm;
