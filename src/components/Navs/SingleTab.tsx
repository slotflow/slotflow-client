import { Lock } from "lucide-react";
import { SingleTabProps } from "@/shared/interface/componentInterface";

export const SingleTab: React.FC<SingleTabProps> = ({
    icon: Icon,
    text,
    sidebarOpen,
    onClick,
    className = '',
    locked = false,
    active
}) => {
    return (
        <li
            title={!locked ? text : text + " (Locked)"}
            onClick={!locked ? onClick : undefined}
            className={`
                relative flex items-center px-3 py-2.5 my-1 rounded-lg transition-all duration-200
                ${!sidebarOpen ? 'justify-center mx-1' : 'justify-start'}
                ${className}
                ${locked 
                    ? 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500 bg-transparent' 
                    : active 
                        ? 'bg-[var(--mainColor)]/10 text-[var(--mainColor)] font-semibold' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer font-medium'
                }
            `}
        >
            <Icon className={`shrink-0 ${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} ${active && !locked ? 'text-[var(--mainColor)]' : ''}`} />
            
            {sidebarOpen && (
                <span className='ml-3 text-[14px] truncate flex-1'>{text}</span>
            )}
            
            {sidebarOpen && locked && (
                <Lock className="w-4 h-4 ml-auto text-gray-400" />
            )}
            
            {!sidebarOpen && locked && (
                <div className="absolute top-1 right-1">
                     <Lock className="w-3 h-3 text-gray-400" />
                </div>
            )}
        </li>
    );
};