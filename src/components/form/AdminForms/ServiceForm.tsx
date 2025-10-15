import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import InputField from "../InputFieldWithLable";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormButton, FormHeading } from "../FormSplits";
import { adminAddServiceXZodSchema } from "@/utils/zod/adminZod";
import { useAdminServiceActions } from "@/utils/hooks/adminHooks/useAdminServiceActions";
import { AdminAddNewAppServiceRequest } from "@/utils/interface/api/adminServiceApiInterface";

const ServiceAddingForm: React.FC = () => {
  const { handleAdminServiceAdding } = useAdminServiceActions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminAddNewAppServiceRequest>({
    resolver: zodResolver(adminAddServiceXZodSchema),
    defaultValues: {
      serviceName: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AdminAddNewAppServiceRequest) => {
    try {
      await handleAdminServiceAdding({ serviceName: data.serviceName }, () => { });
      toast.success("Service added successfully!");
      reset();
    } catch {
      toast.error("Failed to add service.");
    }
  };

  return (
    <div className="flex p-4 flex-1 flex-col justify-center border-[1px] rounded-md">
      <FormHeading title="Add New Service" />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField<AdminAddNewAppServiceRequest>
            label="Service Name"
            id="serviceName"
            name="serviceName"
            placeholder="Software Engineer"
            type="text"
            required
            register={register}
            error={errors.serviceName?.message}
          />
          <FormButton text="Add" loading={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default ServiceAddingForm;
