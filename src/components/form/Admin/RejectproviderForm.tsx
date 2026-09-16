import { X } from 'lucide-react';
import FormField from '../FormField';
import { toast } from 'react-toastify';
import ToggleField from '../ToggleField';
import { useForm } from 'react-hook-form';
import { FormButton } from '../FormButton';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminProvider } from '@/hooks/adminHooks/useProvider';
import { RejectproviderFormProps } from '@/shared/types/component';
import { slideOut } from '@/shared/utils/helper/gsapAnimationSlide';
import { handleFormError } from '@/shared/utils/helper/formErrorCatcher';
import {
  AdminRejectProviderFormType,
  adminRejectProviderZodSchema,
} from '@/shared/validators/zod/adminZod';
import { closeBtnClass } from '@/shared/utils/constants';

const RejectproviderForm = ({ onClose, formRef, rejectProviderData }: RejectproviderFormProps) => {
  const { rejectProvider } = useAdminProvider();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AdminRejectProviderFormType>({
    resolver: zodResolver(adminRejectProviderZodSchema),
    mode: 'onChange',
    defaultValues: {
      verificationRejectionReason: '',
      isAddressVerified: false,
      isAvailabilityVerified: false,
      isProofsVerified: false,
      isServiceDetailsVerified: false,
    },
  });

  const handleCloseForm = () => {
    slideOut(formRef.current, {
      onComplete: onClose,
    });
  };

  const onSubmit = async (data: AdminRejectProviderFormType) => {
    if (!rejectProviderData) {
      toast.error('Provider is not selected');
      return;
    }

    const res = await rejectProvider({
      providerId: rejectProviderData.providerId,
      ...data,
    });

    if (res?.success) {
      reset();
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
            Reject Provider
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Select verification statuses and specify the rejection reason.
          </p>
        </div>

        <Button
          type="button"
          size='icon'
          variant='ghost'
          onClick={handleCloseForm}
          disabled={isSubmitting}
          className={closeBtnClass}
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))}
        className="flex flex-col min-h-0 flex-1 pt-6"
      >
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
          <ToggleField<AdminRejectProviderFormType>
            id="isAddressVerified"
            label="Address Verification"
            description="Mark whether the provider's physical address is verified."
            control={control}
            disabled={isSubmitting}
            error={errors.isAddressVerified?.message}
          />

          <ToggleField<AdminRejectProviderFormType>
            id="isServiceDetailsVerified"
            label="Service Details Verification"
            description="Mark whether the provided service details meet criteria."
            control={control}
            disabled={isSubmitting}
            error={errors.isServiceDetailsVerified?.message}
          />

          <ToggleField<AdminRejectProviderFormType>
            id="isAvailabilityVerified"
            label="Availability Verification"
            description="Mark whether working schedule and availability are approved."
            control={control}
            disabled={isSubmitting}
            error={errors.isAvailabilityVerified?.message}
          />

          <ToggleField<AdminRejectProviderFormType>
            id="isProofsVerified"
            label="Proofs Verification"
            description="Mark whether uploaded ID and documentation are verified."
            control={control}
            disabled={isSubmitting}
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

          <div className="w-full sm:w-auto min-w-[140px]">
            <FormButton
              text={isSubmitting ? 'Rejecting...' : 'Reject Provider'}
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              title="Reject Provider"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RejectproviderForm;
