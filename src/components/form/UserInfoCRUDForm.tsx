import { useState } from "react";
import FormField from "./FormField";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { FormButton } from "./FormSplits";
import { PhoneInput } from "./phone-input";
import { userUpdateInfo } from "@/shared/apis/user";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { slideOut } from "@/shared/helper/gsapAnimationSlide";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { UserInfoCRUDProps } from "@/shared/interface/componentInterface";
import { UserInfoFormType, userInfoZodSchema } from "@/shared/zod/commonZodFields";

const UserInfoCRUDForm: React.FC<UserInfoCRUDProps> = ({
    onClose,
    formRef
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const authUser = useSelector((store: RootState) => store.auth.authUser);
    const role = authUser?.role || null;

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting },
    } = useForm<UserInfoFormType>({
        resolver: zodResolver(userInfoZodSchema),
        mode: "onChange",
        defaultValues: {
            username: authUser?.username || "",
            phone: authUser?.phone || "",
        },
    });

    const handleCloseForm = () => {
        slideOut(formRef.current, {
            onComplete: onClose,
        });
    };

    const onSubmit = async (data: UserInfoFormType) => {
        if (!role) {
            toast.error("User role not found. Please try again.");
            return;
        }
        setLoading(true);
        try {
            const res = await dispatch(userUpdateInfo(data)).unwrap();
            if (res.success) {
                toast.success(res.message || "Info updated successfully");
                handleCloseForm();
            } else {
                toast.error(res.message || "Failed to update info");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            ref={formRef}
            className="w-auto md:w-lg rounded-lg bg-[var(--background)] p-6 shadow-xl border-1"
        >
            <h3 className="text-lg lg:text-2xl font-bold text-center my-4">Update Info</h3>
            {loading ? (
                <Loader className="animate-spin size-5" />
            ) : (
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

                    <div className="space-y-2">
                        <FormButton
                            text="Update"
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
            )}
        </div>
    );
};

export default UserInfoCRUDForm;
