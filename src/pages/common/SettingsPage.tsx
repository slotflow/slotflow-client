import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { settingsTabs } from "@/shared/utils/constants";
import PageHeader from "@/components/common/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountSettings from "@/components/settings/AccountSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import IntegrationsListing from "@/components/settings/IntegrationsListing";
import NotificationSettings from "@/components/settings/NotificationSettings";

const SettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("notifications");

  const renderContent = () => {
    switch (selectedTab) {
      case "notifications":
        return <NotificationSettings />;
      case "account":
        return <AccountSettings />;
      case "integrations":
        return <IntegrationsListing />;
      case "security":
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="container p-4 space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account, notifications and security."
      />

      <div className="flex flex-col md:flex-row w-full py-4 mt-4 space-x-0 md:space-x-2">
        <div className="hidden md:block w-2/12">
          <ScrollArea className="h-[calc(100vh-150px)]">
            <div className="flex flex-col space-y-2 px-2">
              {settingsTabs.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSelectedTab(value)}
                  className={`flex items-center gap-2 w-full justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${selectedTab === value
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                    }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="md:hidden mb-4">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent>
              {settingsTabs.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 w-full md:w-10/12">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
