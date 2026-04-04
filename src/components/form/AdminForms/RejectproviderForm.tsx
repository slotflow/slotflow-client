import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormButton } from "../FormSplits";
import { SelectField } from "../SelectField";
import { Button } from "@/components/ui/button";
import { RootState } from "@/shared/redux/appStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { verificationOptions } from "@/shared/utils/constants";
import { slideOut } from "@/shared/helper/gsapAnimationSlide";
import { handleFormError } from "@/shared/helper/formErrorCatcher";
import { useAdminProvider } from "@/hooks/adminHooks/useAdminProvider";
import { AdminRejectProviderFormType, adminRejectProviderZodSchema } from "@/shared/zod/adminZod";
import { appConfig } from "@/shared/config/env";

interface RejectproviderFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

const RejectproviderForm: React.FC<RejectproviderFormProps> = ({
  onClose,
  formRef,
}) => {

  const { handleAdminRejectProvider } = useAdminProvider();
  const { rejectProviderId } = useSelector((state: RootState) => state.admin);

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
  } = useForm<AdminRejectProviderFormType>({
    resolver: zodResolver(adminRejectProviderZodSchema),
    mode: "onChange",
    defaultValues: {
      verificationRejectionReason: "",
      isAddressVerified: false,
      isAvailabilityVerified: false,
      isProofsVerified: false,
      isServiceDetailsVerified: false,
    },
  });

  const onSubmit = async (data: AdminRejectProviderFormType) => {
    try {
      if (!rejectProviderId) {
        toast.error("Provider is not selected");
        return;
      }
      await handleAdminRejectProvider({ providerId: rejectProviderId, ...data });
      reset();
      handleCloseForm();
    } catch (error) {
      if (appConfig.dev) {
        console.log("Error while rejecting provider : ", error);
      }
    }
  };

  return (
    <div
      ref={formRef}
      className="w-auto md:w-lg rounded-lg bg-[var(--background)] p-6 shadow-xl border-1"
    >
      <h3 className="text-lg lg:text-2xl font-bold text-center my-4">Reject Provider</h3>
      <form
        onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))}
        className="space-y-6"
      >

        <SelectField<AdminRejectProviderFormType, boolean>
          id="isAddressVerified"
          label="Address Verification"
          options={verificationOptions}
          register={register}
          error={errors.isAddressVerified?.message}
        />

        <SelectField<AdminRejectProviderFormType, boolean>
          id="isServiceDetailsVerified"
          label="Service Details Verification"
          options={verificationOptions}
          register={register}
          error={errors.isServiceDetailsVerified?.message}
        />

        <SelectField<AdminRejectProviderFormType, boolean>
          id="isAvailabilityVerified"
          label="Availability Verification"
          options={verificationOptions}
          register={register}
          error={errors.isAvailabilityVerified?.message}
        />

        <SelectField<AdminRejectProviderFormType, boolean>
          id="isProofsVerified"
          label="Proofs Verification"
          options={verificationOptions}
          register={register}
          error={errors.isProofsVerified?.message}
        />

        <FormField<AdminRejectProviderFormType>
          id="verificationRejectionReason"
          label="Rejection Reason"
          placeholder="Enter rejection reason"
          type="text"
          register={register}
          error={errors.verificationRejectionReason?.message}
          required
        />

        <div className="space-y-2">
          <FormButton
            text="Confirm"
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

export default RejectproviderForm;
