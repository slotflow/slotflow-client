import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DataFilter from '@/components/common/DataFilter';
import { providerDashboardTabs } from '@/utils/constants';
import ProviderDashboardStats from '@/components/common/dashboard/provider/ProviderDashboardStats';
import ProviderDashboardGraphs from '@/components/common/dashboard/provider/ProviderDashboardGraphs';

const ProviderDashboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(providerDashboardTabs[0].value);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="p-4 w-full">
      <div className="mb-6">
        <div className="md:hidden mb-4">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
              <SelectValue placeholder="Select Tab" />
            </SelectTrigger>
            <SelectContent>
              {providerDashboardTabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  <div className="flex items-center gap-2">
                    {tab.icon && <tab.icon className="w-4 h-4" />}
                    {tab.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="hidden md:block mb-6">
            <TabsList className="grid grid-cols-2 gap-2 w-full md:w-1/2 bg-slate-100/50 dark:bg-slate-900/50 p-1 border border-slate-200 dark:border-slate-800 rounded-xl">
              {providerDashboardTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    {tab.icon && <tab.icon className="w-4 h-4" />}
                    {tab.label}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <DataFilter dateRange={dateRange} setDateRange={setDateRange} />

          <TabsContent value="stats" className="mt-0 border-none p-0">
            <ProviderDashboardStats dateRange={dateRange as DateRange} />
          </TabsContent>
          <TabsContent value="graphs" className="mt-0 border-none p-0">
            <ProviderDashboardGraphs dateRange={dateRange as DateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProviderDashboardPage
