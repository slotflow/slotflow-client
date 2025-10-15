import { useState } from "react";
import { toast } from "react-toastify";
import InputField from "../InputFieldWithLable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FormButton, FormHeading } from "../FormSplits";
import SelectFiledWithLabel from "../SelectFiledWithLabel";
import { adminAddNewPlanZodSchema } from "@/utils/zod/adminZod";
import { useAdminPlanActions } from "@/utils/hooks/adminHooks/useAdminPlanActions";
import { AdminAddNewPlanRequest } from "@/utils/interface/api/adminPlanApiInterface";

const PlanForm: React.FC = () => {
    const { handleAdminPlanAdding } = useAdminPlanActions();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AdminAddNewPlanRequest>({
        resolver: zodResolver(adminAddNewPlanZodSchema),
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

    const onSubmit = async (data: AdminAddNewPlanRequest) => {
        setLoading(true);
        try {
            await handleAdminPlanAdding(data, setLoading);
            toast.success("Plan added successfully!");
            reset();
        } catch {
            toast.error("Failed to add plan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex p-4 flex-1 flex-col justify-center border-[1px] rounded-md">
            <FormHeading title="Add New Plan" />
            <div className="sm:mx-auto sm:w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <InputField<AdminAddNewPlanRequest>
                        label="Plan Name"
                        id="planName"
                        placeholder="Premium Plan"
                        type="text"
                        required
                        register={register}
                        error={errors.planName?.message}
                    />
                    <InputField<AdminAddNewPlanRequest>
                        label="Description"
                        id="description"
                        placeholder="Description of the plan"
                        type="text"
                        required
                        register={register}
                        error={errors.description?.message}
                    />
                    <InputField<AdminAddNewPlanRequest>
                        label="Price"
                        id="price"
                        placeholder="99"
                        type="number"
                        required
                        register={register}
                        error={errors.price?.message}
                    />

                    {Array.from({ length: 5 }).map((_, index) => (
                        <InputField<AdminAddNewPlanRequest>
                            key={index}
                            label={`Feature ${index + 1}`}
                            id={`features.${index}` as const}
                            placeholder={`Feature ${index + 1}`}
                            type="text"
                            required={index < 2}
                            register={register}
                            error={errors.features?.[index]?.message}
                        />
                    ))}

                    <InputField<AdminAddNewPlanRequest>
                        label="Max Bookings Per Month"
                        id="maxBookingPerMonth"
                        placeholder="100"
                        type="number"
                        required
                        register={register}
                        error={errors.maxBookingPerMonth?.message}
                    />

                    <Controller
                        name="adVisibility"
                        control={control}
                        render={({ field }) => (
                            <SelectFiledWithLabel
                                label="Ad Visibility"
                                id="adVisibility"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value === "true")}
                                options={[true, false]}
                                required
                            />
                        )}
                    />

                    <FormButton text="Add" loading={loading || isSubmitting} />
                </form>
            </div>
        </div>
    );
};

export default PlanForm;
