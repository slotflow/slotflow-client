import { useMemo } from 'react';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import { TabNavigationProps } from '@/shared/types/common';

const TabNavigation = ({ isAdmin, tab, setTab, tabArray }: TabNavigationProps) => {
  const tabs = useMemo(() => {
    return tabArray
      .filter((tabItem) => (isAdmin ? tabItem.admin : tabItem.user))
      .map((tabItem) => ({
        label: tabItem.tabName,
        value: tabItem.value || tabItem.tabName.toLowerCase().replace(/\s+/g, '-'),
      }));
  }, [isAdmin, tabArray]);

  return (
    <div className="w-full">
      {/* Desktop Tabs */}
      <div className="hidden md:block border-b border-slate-200 dark:border-border">
        <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar" aria-label="Tabs">
          {tabs.map((tabItem) => {
            const isActive = tab === tabItem.value;
            return (
              <button
                key={tabItem.value}
                type="button"
                onClick={() => setTab(tabItem.value)}
                className={`group inline-flex items-center py-3 px-1 border-b-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{tabItem.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Dropdown Select */}
      <div className="md:hidden w-full">
        <Select value={tab} onValueChange={(val) => setTab(val)}>
          <SelectTrigger className="w-full bg-white dark:bg-muted/20 border-slate-200 dark:border-border text-xs font-medium">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tabItem) => (
              <SelectItem key={tabItem.value} value={tabItem.value} className="text-xs">
                {tabItem.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TabNavigation;
