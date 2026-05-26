import React from "react";
import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import { updatePassword } from "@/shared/apis/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Submitting from "@/components/common/Submitting";
import { defaultButtonClassName } from "@/shared/utils/constants";
import { UpdatePasswordFormType, updatePasswordSchema } from "@/shared/zod/commonZodFields";

interface UpdatePasswordFormProps {
    onClose: () => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
    onClose
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting, },
    } = useForm<UpdatePasswordFormType>({
        resolver: zodResolver(updatePasswordSchema),
        mode: "onChange",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (data: UpdatePasswordFormType) => {
        try {
            const res = await updatePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });
            if (res.success) {
                toast.success(res.message || "Password updated successfully");
                onClose();
            } else {
                toast.error(res.message || "Failed to update password");
            }
        } catch (error) {
            if(appConfig.isDevelopment) {
                console.log("Failed to update password", error)
            }
        }
    };

    return isSubmitting ? (
        <Submitting />
    )
        : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField<UpdatePasswordFormType>
                    label="Current Password"
                    id="currentPassword"
                    placeholder="Enter current password"
                    type="password"
                    required={true}
                    showTogglePassword
                    register={register}
                    error={errors.currentPassword?.message}
                />

                <FormField<UpdatePasswordFormType>
                    label="New Password"
                    id="newPassword"
                    placeholder="Enter new password"
                    type="password"
                    required={true}
                    showTogglePassword
                    register={register}
                    error={errors.newPassword?.message}
                />

                <FormField<UpdatePasswordFormType>
                    label="Confirm New Password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    type="password"
                    required={true}
                    showTogglePassword
                    register={register}
                    error={errors.confirmPassword?.message}
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
}

export default UpdatePasswordForm;