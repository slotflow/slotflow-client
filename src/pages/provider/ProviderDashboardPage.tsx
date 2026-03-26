import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardStats from '@/components/common/dashboard/DashboardStats';
import { providerFetchDashboardStatsData } from '@/utils/apis/provider';
import { providerDashboardTabs, statsMapForProvider } from '@/utils/constants';
import ProviderDashboardGraphs from '@/components/provider/ProviderDashboardGraphs';
import { ProviderFetchDashboardStatsDataResponse } from '@/utils/interface/api/provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProviderDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('stats')

  return (
    <div className="pb-4 space-y-4">
      <div className="md:hidden">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {providerDashboardTabs.map(({ value, label, icon: Icon }) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:block">
        <ScrollArea className="w-full">
          <div className="flex gap-2 w-full md:w-1/2">
            {providerDashboardTabs.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`flex items-center gap-2 px-3 py-2 w-full justify-center rounded-md border text-sm font-medium transition-colors
                  ${activeTab === value ? 'bg-[var(--menuItemHoverBg)]' : 'hover:bg-[var(--menuItemHoverBg)]'}`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Card className="p-4">
        {activeTab === 'stats' && (
          <DashboardStats<ProviderFetchDashboardStatsDataResponse>
            queryFunction={providerFetchDashboardStatsData}
            queryKey="dashboardStats"
            statsMap={statsMapForProvider}
            shimmerCount={11}
            role="PROVIDER"
          />
        )}
        {activeTab === 'graphs' && <ProviderDashboardGraphs />}
      </Card>
    </div>
  )
}

export default ProviderDashboardPage
