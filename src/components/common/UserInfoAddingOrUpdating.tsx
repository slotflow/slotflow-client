import { z } from "zod";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { PhoneInput } from "../form/phone-input";
import InputField from "../form/InputFieldWithLable";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateUserInfo } from "@/utils/apis/user.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { providerUpdateProviderInfo } from "@/utils/apis/provider.api";

interface UserInfoAddingOrUpdatingProps {
    title: string;
    setOpenUserInfoForm: (open: boolean) => void;
}

const userInfoSchema = z.object({
    username: z.string().min(1, "Username is required"),
    phone: z.string().min(1, "Phone number is required"),
});

type UserInfoFormData = z.infer<typeof userInfoSchema>;

const UserInfoAddingOrUpdating: React.FC<UserInfoAddingOrUpdatingProps> = ({
    title,
    setOpenUserInfoForm,
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
    } = useForm<UserInfoFormData>({
        resolver: zodResolver(userInfoSchema),
        mode: "onChange",
        defaultValues: {
            username: authUser?.username || "",
            phone: authUser?.phone || "",
        },
    });

    const onSubmit = async (data: UserInfoFormData) => {
        if (!role) {
            toast.error("User role not found. Please try again.");
            return;
        }
        setLoading(true);
        try {
            let updateFn;
            if (role === "PROVIDER") updateFn = providerUpdateProviderInfo;
            else if (role === "USER") updateFn = userUpdateUserInfo;
            else {
                toast.error("Invalid user role");
                return;
            }

            const res = await dispatch(updateFn(data)).unwrap();
            if (res.success) {
                toast.success(res.message || "Info updated successfully");
                setOpenUserInfoForm(false);
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
        <div className="p-4 border w-1/2">
            <h1 className="my-4 text-xl font-semibold">{title}</h1>
            {loading ? (
                <Loader className="animate-spin size-5" />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    <InputField<UserInfoFormData>
                        label="Username"
                        id="username"
                        name="username"
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
                    <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        variant="outline"
                        className="w-10/12 md:w-2/12 text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                    >
                        {isSubmitting ? "Updating..." : "Update"}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default UserInfoAddingOrUpdating;
