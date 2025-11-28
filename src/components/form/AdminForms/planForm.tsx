import FormField from "../FormField";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectField } from "../SelectFiledWithLabel";
import { FormButton, FormHeading } from "../FormSplits";
import { useAdminPlanActions } from "@/utils/hooks/adminHooks/useAdminPlanActions";
import { AdminCreatePlanForm, adminCreatePlanZodSchema } from "@/utils/zod/adminZod";

const PlanForm: React.FC = () => {
    const { handleAdminPlanAdding } = useAdminPlanActions();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<AdminCreatePlanForm>({
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

    const onSubmit = async (data: AdminCreatePlanForm) => {
        try {
            await handleAdminPlanAdding(data);
            reset();
        } catch (error) {
             if(import.meta.env.DEV)console.log("An error occured while saving plan : ",error);
        }
    };

    return (
        <div className="flex p-4 flex-1 flex-col justify-center border-[1px] rounded-md">
            <FormHeading title="Add New Plan" />
            <div className="sm:mx-auto sm:w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormField<AdminCreatePlanForm>
                        id="planName"
                        label="Plan Name"
                        placeholder="Enter Plan Name"
                        type="text"
                        register={register}
                        error={errors.planName?.message}
                        readOnly={false}
                        required={true}
                    />
                    <FormField<AdminCreatePlanForm>
                        id="description"
                        label="Plan Description"
                        placeholder="Enter Plan Description"
                        type="text"
                        register={register}
                        error={errors.description?.message}
                        readOnly={false}
                        required={true}
                    />
                    <FormField<AdminCreatePlanForm>
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

                        <FormField<AdminCreatePlanForm>
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

                    <FormField<AdminCreatePlanForm>
                        id="maxBookingPerMonth"
                        label="Plan Maximum Booking"
                        placeholder="Enter Plan Maximum Booking"
                        type="number"
                        register={register}
                        error={errors.maxBookingPerMonth?.message}
                        readOnly={false}
                        required={true}
                    />

                    <SelectField<AdminCreatePlanForm>
                        id="adVisibility"
                        label="Advertisement Visibility"
                        register={register}
                        error={errors.adVisibility}
                        options={[
                            { label: "Ad Visible", value: true },
                            { label: "No Ad Visibility", value: false },
                        ]}
                        required
                    />
                    <FormButton text="Add" loading={isSubmitting} disabled={isSubmitting || !isValid} />
                </form>
            </div>
        </div>
    );
};

export default PlanForm;
