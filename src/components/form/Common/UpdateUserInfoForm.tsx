import { useState } from 'react';
import { toast } from 'react-toastify';
import FormField from '.././FormField';
import { FormButton } from '../FormButton';
import { PhoneInput } from '.././phone-input';
import Submitting from '../../common/Submitting';
import TimezoneSelect from 'react-timezone-select';
import FormLabelWithInfo from '../FormLabelWithInfo';
import { userUpdateInfo } from '@/services/apis/user';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useTimezoneSelect } from 'react-timezone-select';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { UpdateUserInfoFormProps } from '@/shared/types/component';
import { UserInfoFormType, userInfoZodSchema } from '@/shared/validators/zod/commonZodFields';

const UpdateUserInfoForm = ({ onClose }: UpdateUserInfoFormProps) => {
  const [isTimezoneMenuOpen, setIsTimezoneMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const role = authUser?.role || null;
  const { parseTimezone } = useTimezoneSelect({ labelStyle: 'original' });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UserInfoFormType>({
    resolver: zodResolver(userInfoZodSchema),
    mode: 'onChange',
    defaultValues: {
      username: authUser?.username || '',
      phone: authUser?.phone || '',
      timeZone: authUser?.timeZone ? parseTimezone(authUser.timeZone) : undefined,
    },
  });

  const onSubmit = async (data: UserInfoFormType) => {
    if (!role) {
      toast.error('User role not found. Please try again.');
      return;
    }
    const timeZoneChanged =
      data.timeZone !== undefined && data.timeZone.value !== authUser?.timeZone;
    if (
      authUser?.username === data.username &&
      authUser?.phone === data.phone &&
      !timeZoneChanged
    ) {
      toast.warning('No changes found');
      return;
    }

    try {
      const res = await dispatch(
        userUpdateInfo({
          ...data,
          ...(data.timeZone ? { timeZone: data.timeZone } : {}),
        }),
      ).unwrap();
      if (res.success) {
        toast.success(res.message || 'Info updated successfully');
        onClose();
      } else {
        toast.error(res.message || 'Failed to update info');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  return isSubmitting ? (
    <Submitting />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 h-auto">
      <h4 className="text-xl lg:text-2xl font-semibold text-start">Update Info</h4>
      <FormField<UserInfoFormType>
        label="Username"
        id="username"
        placeholder="Midhun K Paniker"
        type="text"
        required
        register={register}
        error={errors.username?.message}
      />

      <Controller
        name="phone"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div className="space-y-2">
            <label className="block text-xs md:text-sm font-medium">Phone</label>
            <PhoneInput
              value={field.value}
              onChange={(value) => {
                field.onChange(value || '');
              }}
              defaultCountry="IN"
              international
              placeholder="Enter your phone number"
              className="w-full"
              required
            />
          </div>
        )}
      />
      <Controller
        name="timeZone"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <FormLabelWithInfo label="Timezone" htmlFor="timeZone" />
            <TimezoneSelect
              value={field.value ?? ''}
              onChange={field.onChange}
              inputId="timeZone"
              menuPlacement="auto"
              onMenuOpen={() => setIsTimezoneMenuOpen(true)}
              onMenuClose={() => setIsTimezoneMenuOpen(false)}
              className="react-timezone-select-container text-sm font-medium"
              classNamePrefix="react-timezone-select"
              unstyled
              classNames={{
                control: (state) =>
                  `h-9 min-h-9 w-full rounded-md border bg-transparent px-3 py-0 shadow-xs transition-[color,box-shadow] outline-none md:text-sm ${
                    state.isFocused ? 'border-[var(--mainColor)]' : 'border-input'
                  }`,
                valueContainer: () => 'px-0 py-0',
                menu: () =>
                  'mt-2 rounded-md border bg-popover text-popover-foreground shadow-md z-50',
                menuList: () => 'max-h-48 overflow-y-auto py-1',
                option: (state) =>
                  `cursor-pointer px-3 py-2 text-sm transition-colors ${
                    state.isFocused ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                  }`,
                singleValue: () => 'text-foreground font-medium',
                placeholder: () => 'text-muted-foreground',
                indicatorSeparator: () => 'hidden',
                dropdownIndicator: () => 'cursor-pointer text-muted-foreground',
              }}
            />
            {isTimezoneMenuOpen && (
              <div aria-hidden="true" className="h-52 transition-[height] duration-150" />
            )}
          </div>
        )}
      />
      <div className="flex space-y-2 justify-end">
        <FormButton
          loading={isSubmitting}
          text={isSubmitting ? 'Updating' : 'Update'}
          title="Update user info"
          disabled={isSubmitting || !isValid}
        />
      </div>
    </form>
  );
};

export default UpdateUserInfoForm;
