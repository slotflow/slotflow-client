import FormField from "../FormField";
import { toast } from "react-toastify";
import SelectField from "../SelectField";
import { useForm } from "react-hook-form";
import { FormButton } from "../FormSplits";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { createService } from "@/shared/apis/service";
import { useQueryClient } from "@tanstack/react-query";
import { ServiceCategory } from "@/shared/interface/enums";
import { slideOut } from "@/shared/helper/gsapAnimationSlide";
import { serviceCategoryOptions } from "@/shared/utils/constants";
import { handleFormError } from "@/shared/helper/formErrorCatcher";
import { CreateServiceFormProps } from "@/shared/interface/componentInterface";
import { AdminCreateServiceFormType, adminCreateServiceZodSchema } from "@/shared/zod/adminZod";

const CreateServiceForm: React.FC<CreateServiceFormProps> = ({
  onClose,
  formRef,
}) => {
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
      const res = await createService(data);
      if (res.success) {
        toast.success(res.message);
        reset();
        handleCloseForm();
        queryClient.invalidateQueries({ queryKey: ["appServices"] });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Error while saving service:", error);
      }
      toast.error("Something went wrong while creating service")
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
