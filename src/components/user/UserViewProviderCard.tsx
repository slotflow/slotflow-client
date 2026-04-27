import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CardTitle } from "@/components/ui/card";
import avatar from '../../assets/defaultImages/avatar.png';
import { formatNumberToPrice } from "@/shared/helper/formatter";
import { UserViewProviderCardProps } from "@/shared/interface/componentInterface";

const UserViewProviderCard: React.FC<UserViewProviderCardProps> = ({
    provider, serviceDetails
}) => {

    const navigate = useNavigate();

    return (
        <div className="w-full max-w-sm rounded-2xl shadow-sm hover:shadow-md transition-all border p-4 cursor-pointer"
            onClick={(e) => {
                e.preventDefault();
                navigate(`/user/providerProfile/${provider?._id}`);
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-base font-semibold">
                        {provider?.username}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs capitalize w-fit">
                        {serviceDetails?.service}
                    </Badge>
                </div>

                <img
                    src={provider?.profileImage || avatar}
                    alt={provider?.username}
                    className="w-20 h-20 object-cover rounded-xl border"
                />
            </div>

            <div className="my-3 border-t" />

            <div className="space-y-1 text-sm">
                <p className="font-medium">{serviceDetails?.serviceName}</p>

                <div className="flex justify-between items-center">
                    <p>{formatNumberToPrice(serviceDetails?.servicePrice)}</p>
                    {provider?.trustedBySlotflow && (
                        <span className="text-xs text-green-600 font-medium whitespace-nowrap">
                            ✅ Trusted by Slotflow
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserViewProviderCard;
