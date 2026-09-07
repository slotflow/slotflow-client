import { useMemo } from 'react';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import { ProfileHorizontalTabsComponentProps } from '@/shared/types/component';

const ProfileTabNavigation = ({
  isAdmin,
  tab,
  setTab,
  tabArray,
}: ProfileHorizontalTabsComponentProps) => {
  const tabs = useMemo(() => {
    return tabArray.reduce((acc: string[], tabItem) => {
      if (isAdmin && tabItem.admin) {
        acc.push(tabItem.tabName);
      } else if (!isAdmin && tabItem.user) {
        acc.push(tabItem.tabName);
      }
      return acc;
    }, []);
  }, [isAdmin, tabArray]);

  return (
    <div className="w-full">
      {/* Desktop Top Horizontal Nav (Stripe Dashboard Style) */}
      <div className="hidden md:block border-b border-slate-200 dark:border-border">
        <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar" aria-label="Tabs">
          {tabs.map((tabName, index) => {
            const isActive = tab === index;
            return (
              <button
                key={index}
                onClick={() => setTab(index)}
                className={`group inline-flex items-center py-3 px-1 border-b-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{tabName}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Select Navigation */}
      <div className="md:hidden w-full">
        <Select value={tabs[tab]} onValueChange={(value) => setTab(tabs.indexOf(value))}>
          <SelectTrigger className="w-full bg-white dark:bg-muted/20 border-slate-200 dark:border-border text-xs font-medium">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tabName, index) => (
              <SelectItem key={index} value={tabName} className="text-xs">
                {tabName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProfileTabNavigation;
