import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Check, LoaderCircle } from 'lucide-react';
import { defaultButtonClassName } from '@/shared/utils/constants';
import { IntegrationCardProps } from '@/shared/interface/componentInterface';

const IntegrationCard = ({
  image,
  heading,
  description,
  action,
  title,
  text,
  show,
  connectionStatus,
  connectionText,
  isLoading,
}: IntegrationCardProps) => {
  return (
    <Card className={`w-full overflow-hidden rounded-md ${show ? 'flex flex-col' : 'hidden'}`}>
      <CardHeader className="px-3">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt="Integration"
            className="size-10 rounded-md border object-contain bg-muted"
          />

          <CardTitle className="text-2xl font-semibold">
            {heading}
          </CardTitle>
        </div>

        <CardDescription className="mt-2 text-base">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="hidden" />

      <CardFooter className="flex items-center justify-between border-t px-3">
        {connectionStatus ? (
          <div className="flex items-center gap-2 text-sm font-medium">
            <Check className="size-4" />
            {connectionText}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Connect this integration to enable its features.
          </p>
        )}

        {connectionStatus ? null : isLoading ? (
          <div className="flex items-center gap-2 text-sm">
            <LoaderCircle className="size-4 animate-spin" />
            Connecting...
          </div>
        ) : (
          <Button
            title={title}
            variant="default"
            onClick={(e) => action(e)}
            className={defaultButtonClassName}
          >
            {text}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default IntegrationCard;