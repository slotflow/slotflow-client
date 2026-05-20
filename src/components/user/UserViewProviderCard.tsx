import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Star } from "lucide-react";
import { cardGradients } from "@/shared/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import avatar from "../../assets/defaultImages/avatar.png";
import { formatNumberToPrice } from "@/shared/helper/formatter";
import { UserViewProviderCardProps } from "@/shared/interface/componentInterface";

const UserViewProviderCard: React.FC<UserViewProviderCardProps> = ({
    provider,
    serviceDetails,
}) => {
    const navigate = useNavigate();

    const gradient =
        cardGradients[
        (provider?._id?.charCodeAt(0) || 0) % cardGradients.length
        ];

    return (
        <Card
            onClick={() => navigate(`/user/providerProfile/${provider?._id}`)}
            className={`text-black cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${gradient} border-0`}
        >
            <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-lg leading-tight">
                            {provider?.username}
                        </h3>

                        <Badge className="mt-1 text-xs capitalize">
                            {serviceDetails?.service}
                        </Badge>
                    </div>

                    <img
                        src={provider?.profileImage || avatar}
                        alt={provider?.username}
                        className="w-16 h-16 rounded-xl object-cover border shadow-sm"
                    />
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-medium">
                        {serviceDetails?.serviceName}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">
                            {formatNumberToPrice(serviceDetails?.servicePrice)}
                        </span>

                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                            <Star size={14} fill="currentColor" />
                            <span className="font-semibold">4.5</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                    {!provider?.trustedBySlotflow && (
                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 flex items-center gap-1 rounded-full text-xs font-semibold mt-2">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            SlotFlow Trusted
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default UserViewProviderCard;