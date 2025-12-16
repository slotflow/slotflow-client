import FormField from "../FormField";
import { useForm } from "react-hook-form";
import { FormButton } from "../FormSplits";
import { SelectField } from "../SelectField";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { slideOut } from "@/utils/helper/gsapAnimationSlide";
import { useAdminPlanActions } from "@/utils/hooks/adminHooks/useAdminPlanActions";
import { AdminCreatePlanFormType, adminCreatePlanZodSchema } from "@/utils/zod/adminZod";
import { adVisibility } from "@/utils/constants";

interface CreatePlanFormProps {
    onClose: () => void;
    formRef: React.RefObject<HTMLDivElement | null>;
}

const CreatePlanForm: React.FC<CreatePlanFormProps> = ({
    onClose,
    formRef
}) => {
    const { handleAdminPlanCreating } = useAdminPlanActions();

    const handleCloseForm = () => {
        slideOut(formRef.current, {
            onComplete: onClose,
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<AdminCreatePlanFormType>({
        resolver: zodResolver(adminCreatePlanZodSchema),
        mode: "onChange",
        defaultValues: {
            planName: "",
            description: "",
            price: 0,
            features: ["", "", "", "", ""],
            maxBookingPerMonth: 0,
            adVisibility: false,
        },
    });

    const onSubmit = async (data: AdminCreatePlanFormType) => {
        try {
            await handleAdminPlanCreating(data);
            reset();
        } catch (error) {
            if (import.meta.env.DEV) console.log("An error occured while saving plan : ", error);
        }
    };

    return (
        <div
            ref={formRef}
            className="w-auto md:w-4xl rounded-lg bg-[var(--background)] p-6 shadow-xl border-1"
        >
           <h3 className="text-lg lg:text-2xl font-bold text-center my-4">Create New Plan</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField<AdminCreatePlanFormType>
                    id="planName"
                    label="Plan Name"
                    placeholder="Enter Plan Name"
                    type="text"
                    register={register}
                    error={errors.planName?.message}
                    readOnly={false}
                    required={true}
                />
                <FormField<AdminCreatePlanFormType>
                    id="description"
                    label="Plan Description"
                    placeholder="Enter Plan Description"
                    type="text"
                    register={register}
                    error={errors.description?.message}
                    readOnly={false}
                    required={true}
                />
                <FormField<AdminCreatePlanFormType>
                    id="price"
                    label="Plan Price"
                    placeholder="Enter Plan Price"
                    type="number"
                    register={register}
                    error={errors.price?.message}
                    readOnly={false}
                    required={true}
                />

                {Array.from({ length: 5 }).map((_, index) => (

                    <FormField<AdminCreatePlanFormType>
                        key={index}
                        label={`Plan Feature ${index + 1}`}
                        id={`features.${index}` as const}
                        placeholder={`Enter Feature ${index + 1}`}
                        type="text"
                        register={register}
                        error={errors.features?.[index]?.message}
                        readOnly={false}
                        required={index < 2}
                    />
                ))}

                <FormField<AdminCreatePlanFormType>
                    id="maxBookingPerMonth"
                    label="Plan Maximum Booking"
                    placeholder="Enter Plan Maximum Booking"
                    type="number"
                    register={register}
                    error={errors.maxBookingPerMonth?.message}
                    readOnly={false}
                    required={true}
                />

                <SelectField<AdminCreatePlanFormType, boolean>
                    id="adVisibility"
                    label="Advertisement Visibility"
                    register={register}
                    error={errors.adVisibility}
                    options={adVisibility}
                    required
                />
                <FormButton text="Save" loading={isSubmitting} disabled={isSubmitting || !isValid} />
                <Button variant="destructive" className="cursor-pointer w-full" type="button" onClick={handleCloseForm}>
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default CreatePlanForm;
