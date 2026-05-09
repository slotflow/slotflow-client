import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import TagInput from "@/components/form/TagInput";
import React, { useEffect, useState } from "react";
import FormField from "@/components/form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "@/components/form/SelectField";
import { fetchServicesByCategory } from "@/shared/apis/service";
import { OptionType } from "@/shared/interface/commonInterface";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { ProviderServiceFormProps } from "@/shared/interface/componentInterface";
import { AdminVerificationStatus, ServiceCategory, ServiceMode, ServiceType } from "@/shared/interface/enums";
import { providerCreateServiceDetailsZodSchema, ProviderCreateServiceDetailsFormType } from "@/shared/zod/providerZod";
import { serviceCategoryOptions, serviceModeOptions, serviceTypeOptions, groupOptions, redirectPaths, defaultButtonClassName } from "@/shared/utils/constants";
import { providerCreateServiceDetails, providerFetchServiceDetails, providerUpdateServiceDetails } from "@/shared/apis/providerService";

const ProviderServiceForm: React.FC<ProviderServiceFormProps> = ({
    isUpdating = false,
    heading
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [services, setServices] = useState<OptionType<string>[]>([]);
    const { authUser } = useSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isValid, isSubmitting, isLoading }
    } = useForm<ProviderCreateServiceDetailsFormType>({
        resolver: zodResolver(providerCreateServiceDetailsZodSchema),
        mode: "onChange",
        defaultValues: {
            _id: "",
            serviceCategory: undefined,
            serviceId: "",
            serviceName: "",
            serviceDescription: "",
            servicePrice: 0,
            serviceExperience: "",
            requirements: "",
            serviceType: undefined,
            serviceMode: undefined,
            tags: [],
            videoUrl: "",
            maxParticipants: 1,
            isGroupService: false
        }
    });

    const tags = watch("tags");
    const serviceCategory = watch("serviceCategory");

    useEffect(() => {
        if (!serviceCategory || serviceCategory.length === 0) {
            setServices([]);
            return;
        }

        const fetchServices = async () => {
            try {
                const res = await fetchServicesByCategory([serviceCategory]);
                const transformed = res.data?.map((srv: { _id: string; serviceName: string }) => ({
                    label: srv.serviceName,
                    value: srv._id
                }));
                if (!transformed) return;
                setServices(transformed);
            } catch (error) {
                if (appConfig.isDevelopment) {
                    console.log("Error while fetching services by category : ", error)
                }
            }
        };
        fetchServices();
    }, [serviceCategory]);

    useEffect(() => {
        if (!authUser) return;

        const shouldFetchDetails = isUpdating && authUser.adminVerificationStatus !== AdminVerificationStatus.NOT_REQUESTED;

        if (!shouldFetchDetails) return;

        async function fetchOldServiceDetails() {
            const res = await providerFetchServiceDetails();
            const result = res.data;
            if (!result) return;
            reset({
                _id: result._id,
                isGroupService: result.isGroupService,
                maxParticipants: result.maxParticipants,
                requirements: result.requirements,
                serviceDescription: result.serviceDescription,
                serviceExperience: result.serviceExperience,
                serviceMode: result.serviceMode,
                serviceName: result.serviceName,
                servicePrice: result.servicePrice,
                serviceType: result.serviceType,
                videoUrl: result.videoUrl,
                tags: result.tags,
            })
        }

        fetchOldServiceDetails();
    }, [isUpdating, reset]);

    const onSubmit = async (data: ProviderCreateServiceDetailsFormType) => {
        try {
            if (isUpdating) {
                const res = await providerUpdateServiceDetails(data);
                if (res.success) {
                    if (!authUser?.isOnboardingCompleted) {
                        navigate(redirectPaths.PROVIDER_APPROVAL_PENDING);
                    }
                    toast.success(res.message);
                }
            } else {
                const res = await dispatch(providerCreateServiceDetails(data)).unwrap();
                if (res.success) {
                    navigate(redirectPaths.ONBOARDING_AVAILABILITY);
                    toast.success(res.message);
                }
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.log("An unexpected error occured while saving data : ", error);
            }
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {heading && (
                <h4 className="text-xl lg:text-2xl font-semibold text-start">
                    {heading}
                </h4>
            )}
            <div className="md:flex w-full space-y-6 space-x-2">
                <div className="space-y-4 w-full space-x-2 pt-6">
                    <SelectField<ProviderCreateServiceDetailsFormType, ServiceCategory>
                        id="serviceCategory"
                        label="Service Category"
                        options={serviceCategoryOptions}
                        register={register}
                        error={errors.serviceCategory}
                        required
                    />

                    <SelectField<ProviderCreateServiceDetailsFormType, string>
                        id="serviceId"
                        label="Service"
                        options={services}
                        register={register}
                        error={errors.serviceId}
                        required
                    />

                    <FormField<ProviderCreateServiceDetailsFormType>
                        label="Service Name"
                        id="serviceName"
                        placeholder="Enter service name"
                        type="text"
                        register={register}
                        error={errors.serviceName?.message}
                        required
                    />

                    <FormField<ProviderCreateServiceDetailsFormType>
                        label="Service Description"
                        id="serviceDescription"
                        placeholder="Enter description"
                        type="text"
                        register={register}
                        error={errors.serviceDescription?.message}
                        required
                    />

                    <FormField<ProviderCreateServiceDetailsFormType>
                        label="Service Price"
                        id="servicePrice"
                        placeholder="₹ 1000"
                        type="number"
                        register={register}
                        error={errors.servicePrice?.message}
                        required
                    />

                    <FormField<ProviderCreateServiceDetailsFormType>
                        label="Service Experience (descriptive)"
                        id="serviceExperience"
                        placeholder="Enter experience"
                        type="text"
                        register={register}
                        error={errors.serviceExperience?.message}
                        required
                    />

                    <FormField<ProviderCreateServiceDetailsFormType>
                        label="Requirements"
                        id="requirements"
                        placeholder="What do users need?"
                        type="text"
                        register={register}
                        error={errors.requirements?.message}
                    />

                    <SelectField<ProviderCreateServiceDetailsFormType, ServiceType>
                        id="serviceType"
                        label="Service Type"
                        options={serviceTypeOptions}
                        register={register}
                        error={errors.serviceType}
                        required
                    />

                    <SelectField<ProviderCreateServiceDetailsFormType, ServiceMode>
                        id="serviceMode"
                        label="Service Mode"
                        options={serviceModeOptions}
                        register={register}
                        error={errors.serviceMode}
                        required
                    />
                </div>
                <div className="space-y-4 w-full space-x-2 md:pt-6">

                    <FormField<ProviderCreateServiceDetailsFormType>
                        label="Max Participants"
                        id="maxParticipants"
                        type="number"
                        placeholder="1"
                        register={register}
                        error={errors.maxParticipants?.message}
                        required
                    />

                    <SelectField<ProviderCreateServiceDetailsFormType, boolean>
                        id="isGroupService"
                        label="Is this a group service?"
                        options={groupOptions}
                        register={register}
                        error={errors.isGroupService}
                        required
                    />

                    <FormField<ProviderCreateServiceDetailsFormType>
                        label="Intro Video URL"
                        id="videoUrl"
                        placeholder="https://"
                        type="text"
                        register={register}
                        error={errors.videoUrl?.message}
                    />

                    <TagInput
                        value={tags || []}
                        onChange={(t) => setValue("tags", t)}
                    />
                </div>
            </div>
            <div className="flex justify-center md:justify-end mt-6">
                <Button
                    title={authUser?.isServiceDetailsAdded ? "Update" : "Submit"}
                    type="submit"
                    variant="default"
                    disabled={!isValid || isSubmitting || isLoading}
                    className={defaultButtonClassName}
                >
                    {isSubmitting ? (
                        <>
                            <Loader className="animate-spin size-4 mr-2" />
                            {(isUpdating && isSubmitting) ? "Updating" : "Submitting"}
                        </>
                    ) : (
                        isUpdating ? "Update" : "Submit"
                    )}
                </Button>
            </div>

        </form>
    );
};

export default ProviderServiceForm;;