import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { CheckIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { planDurations } from "@/utils/constants";
import { SelectField } from "../form/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatNumberToPrice } from "@/utils/helper/formatter";
import { Plan } from "@/utils/interface/entityInterface/planInterface";
import { PlanName, SubscriptionValidity } from "@/utils/interface/enums";
import { PlanDurationFormType, planDurationZodSchema } from "@/utils/zod/providerZod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { setSubscriptionPlanId, setPaymentSelectionPage, setSubscriptionIsTrailPlan, setSubscriptionPlanDuration } from "@/utils/redux/slices/providerSlice";

type CardProps = Pick<Plan, "_id" | "planName" | "description" | "features" | "price">;

interface ProviderPlanCardProps {
  plan: CardProps;
  isTrial?: boolean;
  dummy?: boolean;
  popular?: boolean;
}

const PlanCard: React.FC<ProviderPlanCardProps> = ({
  plan,
  isTrial,
  dummy,
  popular,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanDurationFormType>({
    resolver: zodResolver(planDurationZodSchema),
    defaultValues: {
      planDuration: SubscriptionValidity.SEVEN_DAYS,
    },
  });

  const handleGoToPayment = handleSubmit((data) => {
    if (plan.planName !== PlanName.TRIAL && (!data.planDuration || data.planDuration === SubscriptionValidity.SEVEN_DAYS)) {
      toast.warning("Please select a plan duration");
      return;
    };

    dispatch(setSubscriptionIsTrailPlan(Boolean(isTrial)));
    dispatch(setSubscriptionPlanId(plan._id));
    dispatch(setPaymentSelectionPage(true));
    dispatch(setSubscriptionPlanDuration(data.planDuration));
  });

  return (
    <Card
      key={plan._id}
      className={`p-4 rounded-2xl shadow-sm flex flex-col hover:border-[var(--mainColor)] ${
        popular ? "border-primary" : ""
      }`}
    >
      <CardHeader>
        {popular && (
          <Badge className="uppercase w-max self-center mb-3">
            Most popular
          </Badge>
        )}
        <CardTitle className="mb-3 text-lg lg:text-xl rounded-4xl p-1 text-center">{plan.planName}</CardTitle>
        <span className="font-bold text-5xl text-center">
          {plan.price === 0 ? "FREE" : formatNumberToPrice(plan.price)}
        </span>
      </CardHeader>

      <CardDescription className="text-center">
        {plan.description}
      </CardDescription>

      <CardContent className="flex-1">
        <ul className="mt-7 space-y-2.5 text-sm">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex space-x-2">
              <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      {!isTrial && (
        <SelectField<PlanDurationFormType, number>
          id="planDuration"
          label="Select Plan Duration"
          options={planDurations}
          register={register}
          error={errors.planDuration}
        />
      )}

      {!dummy ? (
        <div className="mt-auto">
          <Button className="w-full cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]" onClick={handleGoToPayment}>
            Choose Plan
          </Button>
        </div>
      ) : (
        <CardFooter>
          <Button
            className="w-full cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
            variant="default"
          >
            Sign up
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PlanCard;
