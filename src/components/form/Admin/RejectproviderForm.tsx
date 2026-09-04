import { X } from 'lucide-react';
import FormField from '../FormField';
import { toast } from 'react-toastify';
import SelectField from '../SelectField';
import { appConfig } from '@/config/env';
import { useForm } from 'react-hook-form';
import { FormButton } from '../FormButton';
import { Button } from '@/components/ui/button';
import { RootState } from '@/app/store/appStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { AppDispatch } from 'recharts/types/state/store';
import { AdminVerificationStatus } from '@/shared/types/enums';
import { verificationOptions } from '@/shared/utils/constants';
import { RejectproviderFormProps } from '@/shared/types/component';
import { slideOut } from '@/shared/utils/helper/gsapAnimationSlide';
import { adminRejectProvider } from '@/services/apis/providerProfile';
import { setAdminVerificationState } from '@/app/store/slices/authSlice';
import { handleFormError } from '@/shared/utils/helper/formErrorCatcher';
import {
  AdminRejectProviderFormType,
  adminRejectProviderZodSchema,
} from '@/shared/validators/zod/adminZod';

const RejectproviderForm = ({ onClose, formRef }: RejectproviderFormProps) => {
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
    setValue,
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

  const onSubmit = async (data: AdminRejectProviderFormType) => {
    try {
      if (!rejectProviderId) {
        toast.error('Provider is not selected');
        return;
      }

      const res = await adminRejectProvider({ providerId: rejectProviderId, ...data });
      if (res.success) {
        toast.success(res.message);
        reset();
        handleCloseForm();
        dispatch(setAdminVerificationState(AdminVerificationStatus.REJECTED));
        queryClient.invalidateQueries({ queryKey: ['providers'] });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('Error while rejecting provider : ', error);
      }
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

        <button
          type="button"
          onClick={handleCloseForm}
          disabled={isSubmitting}
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 cursor-pointer"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, handleFormError(setFocus))}
        className="flex flex-col min-h-0 flex-1 pt-6"
      >
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
          <SelectField<AdminRejectProviderFormType, boolean>
            id="isAddressVerified"
            label="Address Verification"
            options={verificationOptions}
            register={register}
            setValue={setValue}
            error={errors.isAddressVerified?.message}
          />

          <SelectField<AdminRejectProviderFormType, boolean>
            id="isServiceDetailsVerified"
            label="Service Details Verification"
            options={verificationOptions}
            register={register}
            setValue={setValue}
            error={errors.isServiceDetailsVerified?.message}
          />

          <SelectField<AdminRejectProviderFormType, boolean>
            id="isAvailabilityVerified"
            label="Availability Verification"
            options={verificationOptions}
            register={register}
            setValue={setValue}
            error={errors.isAvailabilityVerified?.message}
          />

          <SelectField<AdminRejectProviderFormType, boolean>
            id="isProofsVerified"
            label="Proofs Verification"
            options={verificationOptions}
            register={register}
            setValue={setValue}
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
