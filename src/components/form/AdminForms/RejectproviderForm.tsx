import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FormButton } from "../FormSplits";
import { SelectField } from "../SelectField";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import { RootState } from "@/shared/redux/appStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { AppDispatch } from "recharts/types/state/store";
import { adminRejectProvider } from "@/shared/apis/provider";
import { slideOut } from "@/shared/helper/gsapAnimationSlide";
import { verificationOptions } from "@/shared/utils/constants";
import { handleFormError } from "@/shared/helper/formErrorCatcher";
import { AdminVerificationStatus } from "@/shared/interface/enums";
import { setAdminVerificationState } from "@/shared/redux/slices/authSlice";
import { AdminRejectProviderFormType, adminRejectProviderZodSchema } from "@/shared/zod/adminZod";

interface RejectproviderFormProps {
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

const RejectproviderForm: React.FC<RejectproviderFormProps> = ({
  onClose,
  formRef,
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

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

      const res = await adminRejectProvider({ providerId: rejectProviderId, ...data });
        if (res.success) {
            toast.success(res.message);
            reset();
            handleCloseForm();
            dispatch(setAdminVerificationState(AdminVerificationStatus.REJECTED));
            queryClient.invalidateQueries({ queryKey: ["providers"] });
        } else {
          toast.error(res.message);
        }    
    } catch (error) {
      if (appConfig.isDevelopment) {
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
