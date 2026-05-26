import React from 'react';
import { Button } from '../ui/button';
import { Check, LoaderCircle } from 'lucide-react';
import { defaultButtonClassName } from '@/shared/utils/constants';
import { IntegrationCardProps } from '@/shared/interface/componentInterface';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

const IntegrationCard: React.FC<IntegrationCardProps> = ({
    image,
    heading,
    description,
    action,
    title,
    text,
    show,
    connectionStatus,
    connectionText,
    isLoading
}) => {
    return (
        <Card
            className={`w-full mt-4 border shadow-sm transition-all hover:shadow-md ${show ? 'flex flex-col' : 'hidden'
                }`}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={image}
                        alt="Integration"
                        className="size-10 rounded-md border object-contain bg-muted"
                    />
                    <div>
                        <CardTitle className="text-base font-semibold leading-none">
                            {heading}
                        </CardTitle>
                    </div>
                </div>

                {connectionStatus && (
                    <div className="flex items-center gap-1 text-xs font-medium border rounded-md px-2 py-1">
                        <Check className="w-3.5 h-3.5" />
                        {connectionText}
                    </div>
                )}
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground pb-4">
                {description}
            </CardContent>

            <CardFooter className="flex justify-end pt-0 mt-auto">
                {connectionStatus ? null : isLoading ? (
                    <div className="flex items-center gap-2 text-sm">
                        <LoaderCircle className="animate-spin w-4 h-4" />
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