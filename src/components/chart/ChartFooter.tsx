import React from 'react';
import { TrendingUp } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';

const ChartFooter:React.FC = () => {
    return (
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
            </div>
        </CardFooter>
    )
}

export default ChartFooter