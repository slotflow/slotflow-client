import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SideBox from "@/components/provider/SideBox";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import InputField from "@/components/form/InputFieldWithLable";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import SelectFiledWithLabel from "@/components/form/SelectFiledWithLabel";
import { providerAddServiceDetailsZodSchema } from "@/utils/zod/providerZod";
import imagePlaceholder from '../../assets/defaultImages/imagePlaceholder.png';
import { providerFetchAllAppServices, providerAddProviderServiceDetails } from "@/utils/apis/provider.api";

interface ServiceFormData {
  serviceCategory: string;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  providerAdhaar: string;
  providerExperience: string;
  certificate?: FileList;
}

const ProviderAddServiceDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataUpdating } = useSelector((store: RootState) => store.auth);

  const [services, setServices] = useState<{ label: string; value: string }[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ServiceFormData>({
    resolver: zodResolver(providerAddServiceDetailsZodSchema),
  });

  const certificateFile = watch("certificate");

  useEffect(() => {
    if (certificateFile && certificateFile.length > 0) {
      const file = certificateFile[0];
      if (!file.type.startsWith('image/')) {
        toast.info("Please select an image file.");
        setPreviewImage(null);
        setValue("certificate", undefined);
        return;
      }
      if (file.size > 500 * 1024) {
        toast.info("Please select an image size less than 500 kb.");
        setPreviewImage(null);
        setValue("certificate", undefined);
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  }, [certificateFile, setValue]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await providerFetchAllAppServices();
        const transformed = res.map((service: { _id: string; serviceName: string }) => ({
          label: service.serviceName,
          value: service._id
        }));
        setServices(transformed);
      } catch {
        toast.error("Please wait we are trying");
      }
    };
    fetchServices();
  }, []);

  const onSubmit = async (data: ServiceFormData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("serviceCategory", data.serviceCategory);
      formDataToSend.append("serviceName", data.serviceName);
      formDataToSend.append("serviceDescription", data.serviceDescription);
      formDataToSend.append("servicePrice", data.servicePrice.toString());
      formDataToSend.append("providerAdhaar", data.providerAdhaar);
      formDataToSend.append("providerExperience", data.providerExperience);
      if (data.certificate && data.certificate.length > 0) {
        formDataToSend.append("certificate", data.certificate[0]);
      }

      const res = await dispatch(providerAddProviderServiceDetails({ formData: formDataToSend })).unwrap();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox props={{ pageNumber: 2 }} />
      <div className="w-full md:w-8/12 md:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="md:mt-10 px-4 md:px-12 py-6">
          <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start px-6">Fill Your Service Details</h4>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
            <div className="flex-1 space-y-4 md:space-y-6 px-6 pt-6 md:p-6">
              <Controller
                name="serviceCategory"
                control={control}
                rules={{ required: "Please select a category" }}
                render={({ field }) => (
                  <SelectFiledWithLabel
                    label="Service Category"
                    id="serviceCategory"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    options={services}
                    required
                  />
                )}
              />
              <InputField
                label="Service Name"
                id="serviceName"
                placeholder="Service name"
                type="text"
                required
                register={register}
                error={errors.serviceName?.message}
              />
              <InputField
                label="Service Description"
                id="serviceDescription"
                placeholder="Service description"
                type="text"
                required
                register={register}
                error={errors.serviceDescription?.message}
              />
              <InputField
                label="Service Price"
                id="servicePrice"
                placeholder="₹ 1000"
                type="number"
                required
                register={register}
                error={errors.servicePrice?.message}
              />
              <InputField
                label="Experience description"
                id="providerExperience"
                placeholder="experience"
                type="text"
                required
                register={register}
                error={errors.providerExperience?.message}
              />
              <InputField
                label="Adhaar Last 6 digits"
                id="providerAdhaar"
                placeholder="Adhaar number"
                type="text"
                required
                register={register}
                error={errors.providerAdhaar?.message}
              />
            </div>

            <div className="flex-1 space-y-4 md:space-y-6 px-6 md:px-0 md:p-6">
              <div>
                <label className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)]">Certificate</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("certificate")}
                  className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-2 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs md:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)]">Certificate Preview</label>
                <div className="mt-2 p-2 h-64 border-2 rounded-lg flex justify-center items-center">
                  <img
                    src={previewImage || imagePlaceholder}
                    className="object-contain max-h-full max-w-full"
                    alt="Certificate Preview"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end mt-4 md:mt-6">
            <Button
              type="submit"
              variant="outline"
              className="w-10/12 md:w-2/12 text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
            >
              {dataUpdating ? "Loading" : "Next"} <ChevronRight />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderAddServiceDetailsPage;
