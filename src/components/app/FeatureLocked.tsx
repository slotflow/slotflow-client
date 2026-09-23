import { Button } from '@/components/ui/button';
import { actionBtnClass } from '@/shared/utils/constants';
import { FeatureLockedProps } from '@/shared/types/component';

const FeatureLocked = ({
  icon: Icon,
  message,
  buttonText = 'Upgrade Subscription',
  onButtonClick,
}: FeatureLockedProps) => {
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-center items-center space-y-4 text-center">
      {Icon && <Icon className="text-red-500 size-20" />}
      <h1 className="font-semibold text-lg max-w-md text-foreground">{message}</h1>
      {onButtonClick && (
        <Button
          title={buttonText}
          variant="secondary"
          className={actionBtnClass}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default FeatureLocked;