import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SideBox from "@/components/provider/SideBox";
import FormField from "@/components/form/FormField";
import { approvalMessages } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryForm, QueryZodSchema } from "@/utils/zod/providerZod";

const ProviderApprovalPendingPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QueryForm>({
    resolver: zodResolver(QueryZodSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (data: QueryForm) => {
    try {
      toast.success("Query submitted successfully!");
      console.log("Submitted data:", data);
      reset();
    } catch {
      toast.error("Failed to submit your query. Try again.");
    }
  };

  return (
    <div className="h-screen flex w-full bg-[var(--background)] text-[var(--textOne)]">
      <SideBox props={{ pageNumber: 5 }} />

      <div className="md:w-8/12 flex justify-center items-center">
        <div className="p-8 rounded-lg text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-[var(--mainColor)]">
            {approvalMessages.heading}
          </h1>
          <p className="mb-4">{approvalMessages.message1}</p>
          <p className="mb-4">{approvalMessages.message2}</p>
          <p className="mt-4 text-sm">{approvalMessages.footerNote}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField<QueryForm>
              label=""
              id="query"
              placeholder="Enter your query here"
              type="text"
              register={register}
              error={errors.query?.message}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="outline"
              className="text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)]"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderApprovalPendingPage;
