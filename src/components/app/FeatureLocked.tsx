import React from "react";
import { Button } from "@/components/ui/button";
import { defaultButtonClassName } from "@/shared/utils/constants";
import { FeatureLockedProps } from "@/shared/interface/componentInterface";

const FeatureLocked: React.FC<FeatureLockedProps> = ({
  icon: Icon,
  message,
  buttonText = "Upgrade Subscription",
  onButtonClick,
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-3 text-center p-4">
      {Icon && <Icon className="text-red-500 size-24" />}
      <h1 className="font-semibold">{message}</h1>
      {onButtonClick && (
        <Button
          title={buttonText}
          className={defaultButtonClassName}
          variant="secondary"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default FeatureLocked;
