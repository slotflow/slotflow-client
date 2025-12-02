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
import { SelectField } from "@/components/form/SelectFiledWithLabel";
import { groupOptions, serviceModeOptions, serviceTypeOptions } from "@/utils/constants";
import { providerFetchAllAppServices, providerAddProviderServiceDetails } from "@/utils/apis/provider.api";
import { providerAddServiceDetailsZodSchema, ProviderAddServiceDetailsForm } from "@/utils/zod/providerZod";

const ProviderCreateServiceDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataUpdating } = useSelector((store: RootState) => store.auth);

  const [services, setServices] = useState<{ label: string; value: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProviderAddServiceDetailsForm>({
    resolver: zodResolver(providerAddServiceDetailsZodSchema),
    mode: "onChange",
    defaultValues: {
      serviceCategory: "",
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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await providerFetchAllAppServices();
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
  }, []);

  const onSubmit = async (data: ProviderAddServiceDetailsForm) => {
    try {
      const res = await dispatch(providerAddProviderServiceDetails(data)).unwrap();
      if (res.success) {
        toast.success(res.message);
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

              <SelectField
                id="serviceCategory"
                label="Service Category"
                options={services}
                register={register}
                error={errors.serviceCategory}
              />

              <FormField
                label="Service Name"
                id="serviceName"
                placeholder="Enter service name"
                type="text"
                register={register}
                error={errors.serviceName?.message}
              />

              <FormField
                label="Service Description"
                id="serviceDescription"
                placeholder="Enter description"
                type="text"
                register={register}
                error={errors.serviceDescription?.message}
              />

              <FormField
                label="Service Price"
                id="servicePrice"
                placeholder="₹ 1000"
                type="number"
                register={register}
                error={errors.servicePrice?.message}
              />

              <FormField
                label="Service Experience (descriptive)"
                id="serviceExperience"
                placeholder="Enter experience"
                type="text"
                register={register}
                error={errors.serviceExperience?.message}
              />

              <FormField
                label="Requirements"
                id="requirements"
                placeholder="What do users need?"
                type="text"
                register={register}
                error={errors.requirements?.message}
              />

              <SelectField
                id="serviceType"
                label="Service Type"
                options={serviceTypeOptions}
                register={register}
                error={errors.serviceType}
              />

              <SelectField
                id="serviceMode"
                label="Service Mode"
                options={serviceModeOptions}
                register={register}
                error={errors.serviceMode}
              />
            </div>
            <div className="space-y-4 w-full space-x-2 px-6 md:pt-6 md:px-6">

              <FormField
                label="Intro Video URL"
                id="videoUrl"
                placeholder="https://"
                type="text"
                register={register}
                error={errors.videoUrl?.message}
              />

              <FormField
                label="Max Participants"
                id="maxParticipants"
                type="number"
                placeholder="1"
                register={register}
                error={errors.maxParticipants?.message}
              />

              <SelectField
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
