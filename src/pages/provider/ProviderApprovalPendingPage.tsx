import { z } from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SideBox from "@/components/provider/SideBox";
import { approvalMessages } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/form/InputFieldWithLable";

const ProviderApprovalPendingPage = () => {
  const QuerySchema = z.object({
    query: z
      .string()
      .min(5, "Query must be at least 5 characters long")
      .max(500, "Query is too long"),
  });

  type QueryFormData = z.infer<typeof QuerySchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QueryFormData>({
    resolver: zodResolver(QuerySchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (data: QueryFormData) => {
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
      <SideBox props={{ pageNumber: 4 }} />

      <div className="md:w-8/12 flex justify-center items-center">
        <div className="p-8 rounded-lg text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-[var(--mainColor)]">
            {approvalMessages.heading}
          </h1>
          <p className="mb-4">{approvalMessages.message1}</p>
          <p className="mb-4">{approvalMessages.message2}</p>
          <p className="mt-4 text-sm">{approvalMessages.footerNote}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <InputField<QueryFormData>
              label="Query"
              id="query"
              placeholder="Enter your query here"
              type="text"
              required
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
