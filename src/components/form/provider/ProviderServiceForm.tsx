import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import TagInput from "@/components/form/TagInput";
import React, { useEffect, useState } from "react";
import FormField from "@/components/form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesByCategory } from "@/shared/apis/service";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { OptionType, SelectField } from "@/components/form/SelectField";
import { AdminVerificationStatus, ServiceCategory, ServiceMode, ServiceType } from "@/shared/interface/enums";
import { providerCreateServiceDetailsZodSchema, ProviderCreateServiceDetailsFormType } from "@/shared/zod/providerZod";
import { serviceCategoryOptions, serviceModeOptions, serviceTypeOptions, groupOptions, redirectPaths } from "@/shared/utils/constants";
import { providerCreateServiceDetails, providerFetchServiceDetails, providerUpdateServiceDetails } from "@/shared/apis/providerService";

const ProviderServiceForm: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { dataUpdating } = useSelector((store: RootState) => store.auth);
    const [services, setServices] = useState<OptionType<string>[]>([]);
    const { authUser } = useSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isValid, isSubmitting }
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
                const transformed = res.map((srv: { _id: string; serviceName: string }) => ({
                    label: srv.serviceName,
                    value: srv._id
                }));
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

        const shouldFetchDetails =
            authUser.isServiceDetailsAdded &&
            authUser.adminVerificationStatus !== AdminVerificationStatus.NOT_REQUESTED;

        if (!shouldFetchDetails) return;

        async function fetchOldServiceDetails() {
            const result = await providerFetchServiceDetails();
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
    }, [authUser?.isServiceDetailsAdded, reset]);

    const onSubmit = async (data: ProviderCreateServiceDetailsFormType) => {
        try {
            if (authUser?.isServiceDetailsAdded) {
                const res = await providerUpdateServiceDetails(data);
                if (res.success) {
                    toast.success(res.message);
                    navigate(redirectPaths.PROVIDER_APPROVAL_PENDING);
                }
            } else {
                const res = await dispatch(providerCreateServiceDetails(data)).unwrap();
                if (res.success) {
                    toast.success(res.message);
                    navigate(redirectPaths.PROVIDER_AVAILABILITY);
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
            <h4 className="text-xl lg:text-2xl font-semibold text-start">
                {authUser?.isServiceDetailsAdded ? "Update your service details" : "Tell us about your service"}
            </h4>
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
                    disabled={!isValid || isSubmitting || dataUpdating}
                    className="cursor-pointer w-full md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] flex items-center gap-2"
                >
                    {isSubmitting ? "Loading" : authUser?.isServiceDetailsAdded ? "Update" : "Submit"}
                    <ChevronRight />
                </Button>
            </div>

        </form>
    );
};

export default ProviderServiceForm;;