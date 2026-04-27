import dayjs from "dayjs"
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { formateDate } from "@/shared/helper/formatter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NotificationCardProps } from "@/shared/interface/componentInterface";

dayjs.extend(relativeTime)

const NotificationCard: React.FC<NotificationCardProps> = ({ 
    title, 
    body, 
    isRead, 
    createdAt 
}) => {

    return (
        <Alert className={`transition-colors shadow-sm ${isRead ? 'bg-black/5 dark:bg-white/5 opacity-70 border-transparent' : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50'}`}>
            <AlertTitle className={`flex justify-between items-start leading-tight ${!isRead ? 'font-bold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                <span className="break-words mr-2">{title}</span>
                {!isRead && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-1 shadow-[0_0_4px_rgba(59,130,246,0.6)]" />}
            </AlertTitle>
            <AlertDescription className={`mt-1.5 text-sm ${!isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                {body}
                <div className="flex justify-end w-full mt-2.5">
                    <span className="text-[10px] text-gray-400 font-medium uppercase whitespace-nowrap">
                        {formateDate(createdAt)}
                    </span>
                </div>
            </AlertDescription>
        </Alert>
    );
};

export default NotificationCard;