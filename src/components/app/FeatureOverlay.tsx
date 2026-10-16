import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LucideIcon, Sparkles } from 'lucide-react';

export type FeatureOverlaySize = 'sm' | 'md' | 'lg';

interface FeatureOverlayProps {
  title?: string;
  description?: string;
  isDevMode?: boolean;
  icon?: LucideIcon;
  size?: FeatureOverlaySize;
  isBlur?: boolean;
  borderRadius?: string;
  className?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const sizeConfig = {
  sm: {
    maxContentWidth: 'max-w-sm',
    spaceY: 'space-y-2.5',
    iconWrapperPadding: 'p-2.5',
    iconSize: 'size-5',
    badgeText: 'text-[10px] px-2.5 py-0.5',
    titleText: 'text-sm font-bold',
    descriptionText: 'text-xs leading-relaxed',
    buttonSize: 'sm' as const,
  },
  md: {
    maxContentWidth: 'max-w-md',
    spaceY: 'space-y-3.5',
    iconWrapperPadding: 'p-3.5',
    iconSize: 'size-7',
    badgeText: 'text-xs px-3 py-1',
    titleText: 'text-base sm:text-lg font-extrabold',
    descriptionText: 'text-sm leading-relaxed',
    buttonSize: 'default' as const,
  },
  lg: {
    maxContentWidth: 'max-w-lg',
    spaceY: 'space-y-5',
    iconWrapperPadding: 'p-4.5',
    iconSize: 'size-9',
    badgeText: 'text-xs sm:text-sm px-3.5 py-1',
    titleText: 'text-lg sm:text-xl md:text-2xl font-black',
    descriptionText: 'text-base leading-relaxed',
    buttonSize: 'lg' as const,
  },
};

const FeatureOverlay = ({
  title = 'Coming Soon',
  description = 'This feature is currently under active development.',
  isDevMode = false,
  icon: Icon = Sparkles,
  size = 'sm',
  isBlur = false,
  borderRadius = 'rounded-0',
  className = '',
  showButton = false,
  buttonText = 'Learn More',
  onButtonClick,
}: FeatureOverlayProps) => {
  const config = sizeConfig[size] || sizeConfig.sm;

  return (
    <div
      className={`absolute h-full w-full inset-0 z-50 flex flex-col items-center justify-center text-center shadow-sm transition-colors ${borderRadius} ${
        isBlur ? 'backdrop-blur-md bg-background/60 dark:bg-background/60' : ''
      } ${className}`}
    >
      <div className={`flex flex-col items-center ${config.maxContentWidth} ${config.spaceY}`}>
        <div
          className={`${config.iconWrapperPadding} rounded-full bg-primary/15 dark:bg-primary/20 border border-primary/30 text-primary shadow-sm`}
        >
          <Icon className={`${config.iconSize} animate-pulse`} />
        </div>

        {isDevMode && (
          <Badge
            variant="outline"
            className={`font-semibold tracking-wider uppercase rounded-full border-primary/30 bg-primary/10 dark:bg-primary/20 text-primary ${config.badgeText}`}
          >
            In Development
          </Badge>
        )}

        <h3 className={`text-foreground dark:text-slate-100 tracking-tight ${config.titleText}`}>
          {title}
        </h3>

        <p
          className={`text-muted-foreground dark:text-neutral-400 font-medium ${config.descriptionText}`}
        >
          {description}
        </p>

        {showButton && (
          <Button
            variant="outline"
            size={config.buttonSize}
            onClick={onButtonClick}
            className="mt-1 font-medium shadow-xs"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeatureOverlay;
