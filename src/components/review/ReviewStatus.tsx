import { LucideIcon } from "lucide-react";

interface ReviewStatusProps {
    status: string;
    icon: LucideIcon;
    isNot?: boolean;
}

const ReviewStatus: React.FC<ReviewStatusProps> = ({ 
    status,
    icon: Icon,
    isNot = false
}) => {
    return (
        <span className="flex items-center space-x-2">
            <Icon className={`w-4 h-4 text-${isNot ? "red" : "green"}-55`} />
            <span>
                {status}
            </span>
        </span>
    );
};

export default ReviewStatus;