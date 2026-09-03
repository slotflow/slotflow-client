import { Button } from '../ui/button';
import { CheckIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { BillingCycle } from '@/shared/types/enums';
import { ProviderPlanCardProps } from '@/shared/types/component';
import { formatNumberToPrice } from '@/shared/utils/helper/formatter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import {
  setPaymentSelectionOpen,
  setSubscriptionPaymentData,
} from '@/app/store/slices/paymentSlice';

const PlanCard = ({
  plan,
  isTrial,
  dummy,
  popular,
  billingCycle = BillingCycle.MONTHLY,
}: ProviderPlanCardProps) => {
  const dispatch = useDispatch();

  const handleGoToPayment = () => {
    dispatch(
      setSubscriptionPaymentData({
        isTrialPlan: Boolean(isTrial),
        planId: plan._id,
        billingCycle: billingCycle,
      }),
    );
    dispatch(setPaymentSelectionOpen(true));
  };

  return (
    <Card
      key={plan._id}
      className={`p-4 rounded-2xl h-full shadow-sm flex flex-col hover:border-[var(--mainColor)] ${
        popular ? 'border-2 border-primary' : ''
      }`}
    >
      <CardHeader className="pb-0">
        <CardTitle className="mb-3 text-lg lg:text-xl rounded-4xl p-1 text-center">
          {plan.planName}
        </CardTitle>
        <span className="font-bold text-5xl text-center">
          {billingCycle === BillingCycle.MONTHLY
            ? plan.monthlyPrice === 0
              ? 'FREE'
              : formatNumberToPrice(plan.monthlyPrice, 0)
            : plan.yearlyPrice === 0
              ? 'FREE'
              : formatNumberToPrice(plan.yearlyPrice, 0)}
        </span>
      </CardHeader>

      <CardContent className="flex-1 pt-4">
        <ul className="space-y-2.5 text-sm">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex space-x-2">
              <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardDescription className="text-center px-6 min-h-[3rem] flex items-center justify-center">
        {plan.description}
      </CardDescription>

      {!dummy ? (
        <div className="mt-auto">
          <Button
            title="Choose Plan"
            className="w-full cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
            onClick={handleGoToPayment}
          >
            Upgrade
          </Button>
        </div>
      ) : (
        <CardFooter>
          <Button
            title="Sign up"
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
