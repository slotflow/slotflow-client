import FormField from ".././FormField";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { PhoneInput } from ".././phone-input";
import Submitting from "../../common/Submitting";
import { userUpdateInfo } from "@/shared/apis/user";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { UpdateUserInfoFormProps } from "@/shared/interface/componentInterface";
import { UserInfoFormType, userInfoZodSchema } from "@/shared/zod/commonZodFields";
import { defaultButtonClassName } from "@/shared/utils/constants";

const UpdateUserInfoForm: React.FC<UpdateUserInfoFormProps> = ({
    onClose,
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const authUser = useSelector((store: RootState) => store.auth.authUser);
    const role = authUser?.role || null;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting, },
    } = useForm<UserInfoFormType>({
        resolver: zodResolver(userInfoZodSchema),
        mode: "onChange",
        defaultValues: {
            username: authUser?.username || "",
            phone: authUser?.phone || "",
        },
    });

    const onSubmit = async (data: UserInfoFormType) => {
        if (!role) {
            toast.error("User role not found. Please try again.");
            return;
        }
        try {
            const res = await dispatch(userUpdateInfo(data)).unwrap();
            if (res.success) {
                toast.success(res.message || "Info updated successfully");
                onClose();
            } else {
                toast.error(res.message || "Failed to update info");
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    return isSubmitting ? (
        <Submitting />
    )
        : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
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
                            <label className="block text-xs md:text-sm font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                                Phone
                            </label>
                            <PhoneInput
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value || "");
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
                <div className="flex space-y-2 justify-end">
                    <Button
                        variant="default"
                        className={defaultButtonClassName}
                        disabled={isSubmitting || !isValid}
                        title="Update"
                    >
                        {isSubmitting ? "Updating" : "Update"}
                    </Button>
                </div>
            </form>
        )
};

export default UpdateUserInfoForm;
