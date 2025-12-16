import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TagInput from "@/components/form/TagInput";
import React, { useEffect, useState } from "react";
import SideBox from "@/components/provider/SideBox";
import FormField from "@/components/form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { OptionType, SelectField } from "@/components/form/SelectField";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { RedirectTo, ServiceCategoryType, ServiceModeType, ServiceTypeType } from "@/utils/interface/commonInterface";
import { providerCreateServiceDetailsZodSchema, ProviderCreateServiceDetailsFormType } from "@/utils/zod/providerZod";
import { serviceCategoryOptions, serviceModeOptions, roleArray, serviceTypeOptions, groupOptions } from "@/utils/constants";
import { providerFetchAllAppServices, providerCreateServiceDetails, providerFetchServiceDetails, providerUpdateServiceDetails } from "@/utils/apis/provider.api";

const ProviderCreateServiceDetailsPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { goToAuthPage } = useAuthNavigation();
  const { dataUpdating } = useSelector((store: RootState) => store.auth);
  const [ services, setServices] = useState<OptionType<string>[]>([]);
  const { authUser } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProviderCreateServiceDetailsFormType>({
    resolver: zodResolver(providerCreateServiceDetailsZodSchema),
    mode: "onChange",
    defaultValues: {
      _id: "",
      serviceCategory: undefined,
      service: "",
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
        const res = await providerFetchAllAppServices({ serviceCategory });
        const transformed = res.map((srv: { _id: string; serviceName: string }) => ({
          label: srv.serviceName,
          value: srv._id
        }));
        setServices(transformed);
      } catch (error) {
        console.log("error : ", error);
        if (import.meta.env.DEV) console.log(error)
      }
    };
    fetchServices();
  }, [serviceCategory]);

  useEffect(() => {
    if(!authUser?.isServiceDetailsAdded) return;

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
  },[authUser?.isServiceDetailsAdded, reset]);

  const onSubmit = async (data: ProviderCreateServiceDetailsFormType) => {
    try {
      if(authUser?.isServiceDetailsAdded) {
       const res = await providerUpdateServiceDetails(data);
        if (res.success) {
          toast.success(res.message);
          goToAuthPage(roleArray[2], RedirectTo.PROVIDER_APPROVAL_PENDING);
        }
      } else {
        const res = await dispatch(providerCreateServiceDetails(data)).unwrap();
        if (res.success) {
          toast.success(res.message);
          goToAuthPage(roleArray[2], RedirectTo.PROVIDER_AVAILABILITY);
        }
      }
    } catch (error) {
      if (import.meta.env.DEV) console.log("An unexpected error occured while saving data : ", error);
    }
  };

  return (
    <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox props={{ pageNumber: 2 }} />

      <div className="w-full md:w-8/12 md:px-10 overflow-y-scroll no-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="md:mt-10 px-4 md:px-12 py-6 md:py-0">
          <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start px-6">Service Details</h4>
          <div className="md:flex w-full space-y-6">
            <div className="space-y-4 w-full space-x-2 px-6 pt-6">

              <SelectField<ProviderCreateServiceDetailsFormType, ServiceCategoryType>
                id="serviceCategory"
                label="Service Category"
                options={serviceCategoryOptions}
                register={register}
                error={errors.serviceCategory}
              />

              <SelectField<ProviderCreateServiceDetailsFormType,string>
                id="service"
                label="Service"
                options={services}
                register={register}
                error={errors.service}
              />

              <FormField<ProviderCreateServiceDetailsFormType>
                label="Service Name"
                id="serviceName"
                placeholder="Enter service name"
                type="text"
                register={register}
                error={errors.serviceName?.message}
              />

              <FormField<ProviderCreateServiceDetailsFormType>
                label="Service Description"
                id="serviceDescription"
                placeholder="Enter description"
                type="text"
                register={register}
                error={errors.serviceDescription?.message}
              />

              <FormField<ProviderCreateServiceDetailsFormType>
                label="Service Price"
                id="servicePrice"
                placeholder="₹ 1000"
                type="number"
                register={register}
                error={errors.servicePrice?.message}
              />

              <FormField<ProviderCreateServiceDetailsFormType>
                label="Service Experience (descriptive)"
                id="serviceExperience"
                placeholder="Enter experience"
                type="text"
                register={register}
                error={errors.serviceExperience?.message}
              />

              <FormField<ProviderCreateServiceDetailsFormType>
                label="Requirements"
                id="requirements"
                placeholder="What do users need?"
                type="text"
                register={register}
                error={errors.requirements?.message}
              />

              <SelectField<ProviderCreateServiceDetailsFormType,ServiceTypeType>
                id="serviceType"
                label="Service Type"
                options={serviceTypeOptions}
                register={register}
                error={errors.serviceType}
              />

              <SelectField<ProviderCreateServiceDetailsFormType,ServiceModeType>
                id="serviceMode"
                label="Service Mode"
                options={serviceModeOptions}
                register={register}
                error={errors.serviceMode}
              />
            </div>
            <div className="space-y-4 w-full space-x-2 px-6 md:pt-6 md:px-6">

              <FormField<ProviderCreateServiceDetailsFormType>
                label="Intro Video URL"
                id="videoUrl"
                placeholder="https://"
                type="text"
                register={register}
                error={errors.videoUrl?.message}
              />

              <FormField<ProviderCreateServiceDetailsFormType>
                label="Max Participants"
                id="maxParticipants"
                type="number"
                placeholder="1"
                register={register}
                error={errors.maxParticipants?.message}
              />

              <SelectField<ProviderCreateServiceDetailsFormType,boolean>
                id="isGroupService"
                label="Is this a group service?"
                options={groupOptions}
                register={register}
                error={errors.isGroupService}
              />

              <TagInput
                value={tags || []}
                onChange={(t) => setValue("tags", t)}
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-end mt-6">
            <Button
              type="submit"
              variant="outline"
              className="cursor-pointer w-10/12 md:w-auto text-sm hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
            >
              {dataUpdating ? "Loading" : "Next"}
              <ChevronRight />
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProviderCreateServiceDetailsPage;
