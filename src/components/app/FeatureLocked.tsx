import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureLockedProps {
  icon?: LucideIcon;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonVariant?: "default" | "outline" | "ghost" | "destructive";
}

const FeatureLocked: React.FC<FeatureLockedProps> = ({
  icon: Icon,
  message,
  buttonText = "Upgrade Subscription",
  onButtonClick,
  buttonVariant = "outline",
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-3 text-center p-4">
      {Icon && <Icon className="text-red-500 size-24" />}
      <h1 className="font-semibold">{message}</h1>
      {onButtonClick && (
        <Button
          title={buttonText}
          className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
          variant={buttonVariant}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default FeatureLocked;
