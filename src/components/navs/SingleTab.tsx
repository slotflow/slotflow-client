import { ChevronDown } from 'lucide-react';
import { SingleTabProps } from '@/shared/types/component';

const SingleTab = ({
  icon: Icon,
  text,
  isSidebarOpen,
  onClick,
  className = '',
  locked = false,
  active,
  hasSubroutes = false,
  expanded = false,
}: SingleTabProps) => {
  return (
    <li
      title={!locked ? text : `${text} (Locked)`}
      onClick={!locked ? onClick : undefined}
      className={`
                relative flex items-center
                px-3 py-2 my-1
                rounded-sm
                transition-all duration-200
                ${!isSidebarOpen ? 'justify-center mx-1' : 'justify-start'}
                ${className}
                ${
                  locked
                    ? 'opacity-50 cursor-not-allowed text-gray-400 bg-transparent'
                    : active
                      ? 'bg-primary/10 font-semibold'
                      : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer font-medium'
                }
            `}
    >
      <Icon
        className={`
                    shrink-0
                    ${isSidebarOpen ? 'size-5' : 'w-6 h-6'}
                    ${active && !locked ? 'text-[var(--mainColor)]' : ''}
                `}
      />

      {isSidebarOpen && <span className="ml-3 text-[14px] truncate flex-1">{text}</span>}

      {isSidebarOpen && hasSubroutes && !locked && (
        <ChevronDown
          className={`
                        ml-auto
                        size-4
                        transition-transform duration-200
                        ${expanded ? 'rotate-180' : ''}
                    `}
        />
      )}
    </li>
  );
};

export default SingleTab;
