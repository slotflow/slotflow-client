import { Button } from '@/components/ui/button';
import { FeatureLockedProps } from '@/shared/types/component';
import { defaultButtonClassName } from '@/shared/utils/constants';

const FeatureLocked = ({
  icon: Icon,
  message,
  buttonText = 'Upgrade Subscription',
  onButtonClick,
}: FeatureLockedProps) => {
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
