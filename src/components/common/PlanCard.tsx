import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { CheckIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { planDurations } from '@/utils/constants';
import SelectFiledWithLabel from '../form/SelectFiledWithLabel';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Plan } from '@/utils/interface/entityInterface/planInterface';
import { setPaymentSelectionPage, setSubscriptionIsTrailPlan, setSubscriptionPlanDuration, setSubscriptionPlanId } from '@/utils/redux/slices/providerSlice';
import { formatNumberToPrice } from '@/utils/helper/formatter';

type CardProps = Pick<Plan, "_id" | "planName" | "description" | "features" | "price">;
interface ProviderPlanCardProps {
    plan: CardProps;
    isTrial?: boolean;
    dummy?: boolean;
    popular?: boolean;
}

const PlanCard: React.FC<ProviderPlanCardProps> = ({ plan, isTrial, dummy, popular }) => {

    const dispatch = useDispatch();
    const [selectedPlanDuration, setSelectedPlanDuration] = useState<string>("");

    const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlanDuration(event.target.value);
        dispatch(setSubscriptionPlanDuration(event.target.value));
    };

    const handleGoToPayment = (e: React.MouseEvent<HTMLButtonElement>, planName: string) => {
        e.preventDefault();
        console.log("planName : ",planName);
        if (planName !== "Free" && (!selectedPlanDuration || !selectedPlanDuration.trim())) { // TODO PLANNAME
            toast.warning("Please select an plan duration");
            return;
        }
        dispatch(setSubscriptionIsTrailPlan(isTrial as boolean));
        dispatch(setSubscriptionPlanId(plan?._id));
        dispatch(setPaymentSelectionPage(true));
    }

    return (
        <Card key={plan._id} className={`p-4 rounded-2xl shadow-sm flex flex-col hover:border-[var(--mainColor)] ${popular && "border-primary"}`}>
            <CardHeader>
                {popular && (
                    <Badge className="uppercase w-max self-center mb-3">
                        Most popular
                    </Badge>
                )}
                <CardTitle className="mb-7">{plan.planName}</CardTitle>
                <span className="font-bold text-5xl">{plan.price === 0 ? "FREE" : formatNumberToPrice(plan.price)}</span>
            </CardHeader>
            <CardDescription className="text-center">
                {plan.description}
            </CardDescription>
            <CardContent className="flex-1">
                <ul className="mt-7 space-y-2.5 text-sm">
                    {plan.features.map((feature, i: number) => (
                        <li key={i} className="flex space-x-2">
                            <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            {!isTrial && (
                <SelectFiledWithLabel
                    label="Select Plan Duration"
                    id="planDuration"
                    value={selectedPlanDuration}
                    onChange={handleDayChange}
                    options={planDurations.map(plan => plan.durationName)}
                    required
                />
            )}
            {!dummy ? (

                <div className="mt-auto">
                    <Button className="w-full cursor-pointer" onClick={(e) => handleGoToPayment(e, plan.planName)}>Choose Plan</Button>
                </div>
            ) : (
                <CardFooter>
                    <Button className="w-full cursor-pointer hover:bg-[var(--mainColor)]" variant={"outline"}>
                        Sign up
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}

export default PlanCard