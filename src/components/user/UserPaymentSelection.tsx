import { toast } from "react-toastify";
import { Loader, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { userBookAnAppointment } from "@/utils/apis/user.api";
import { SelectField, OptionType } from "../form/SelectField";
import { PaymentModeFormType, paymentModeZodSchema } from "@/utils/zod/commonZodFields";

interface UserPaymentSelect {
  modes: OptionType[];
  setOpenPayment: (data: boolean) => void;
  providerId: string;
  selectedDay: string;
  slotId: string;
  date: Date;
}

const UserPaymentSelection: React.FC<UserPaymentSelect> = ({
  modes,
  setOpenPayment,
  providerId,
  selectedDay,
  slotId,
  date,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentModeFormType>({
    resolver: zodResolver(paymentModeZodSchema),
    defaultValues: {
      serviceMode: modes[0]?.value as string ?? "",
    },
  });

  const makeStripePayment = handleSubmit(async (formData) => {
    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      toast.error("Stripe key is missing!");
      return;
    }

    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    if (!stripe) {
      toast.error("Stripe failed to load!");
      return;
    }

    if (!slotId || !providerId || !selectedDay || !date) {
      toast.error("Something went wrong.");
      return;
    }

    const payload = {
      providerId,
      selectedDay,
      slotId,
      selectedServiceMode: formData.serviceMode,
      date,
    };

    try {
      const response = await userBookAnAppointment(payload);
      const sessionId = response.data;

      if (!sessionId) {
        toast.error("Failed to create checkout session.");
        return;
      }

      setOpenPayment(false);
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result?.error) {
        toast.error(result.error.message);
      }
    } catch {
      toast.error("An error occurred during payment.");
    }
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
      {!isSubmitting ? (
        <div className="w-3/12 rounded-lg shadow-lg border p-4 bg-[var(--background)]">
          <X
            className="cursor-pointer ml-auto"
            onClick={() => setOpenPayment(false)}
          />

          <form onSubmit={makeStripePayment} className="py-6 space-y-4">
            <h2 className="text-lg font-bold mb-4 text-center">
              Choose Payment Gateway
            </h2>

            <SelectField<PaymentModeFormType>
              id="serviceMode"
              label="Select service mode"
              options={modes}
              register={register}
              error={errors.serviceMode}
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]"
            >
              <img src="/images/Stripe.jpeg" alt="Stripe" className="w-8 h-8" />
              <h6 className="font-bold italic text-[#635bff]">Stripe</h6>
            </button>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]"
            >
              <img src="/images/Paypal.png" alt="Paypal" className="w-8 h-8" />
              <h6 className="font-bold italic">
                <span className="text-[#002991]">Pay</span>
                <span className="text-[#60cdff]">Pal</span>
              </h6>
            </button>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-4 p-3 rounded-md shadow cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)]"
            >
              <img
                src="/images/Razorpay.png"
                alt="Razorpay"
                className="w-8 h-8"
              />
              <h6 className="font-bold italic text-[#072654]">Razorpay</h6>
            </button>
          </form>
        </div>
      ) : (
        <Loader className="w-10 h-10 animate-spin text-white" />
      )}
    </div>
  );
};

export default UserPaymentSelection;
