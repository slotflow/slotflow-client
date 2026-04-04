
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { settingsTabs } from "@/utils/constants";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountSecurity from "@/components/settings/AccountSecurity";
import IntegrationsListing from "@/components/settings/IntegrationsListing";
import PersonalizationList from "@/components/settings/PersonalizationList";
import NotificationSettings from "@/components/settings/NotificationSettings";

const SettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("notifications");

  const renderContent = () => {
    switch (selectedTab) {
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <AccountSecurity />;
      case "integrations":
        return <IntegrationsListing />;
      case "personalization":
        return <PersonalizationList />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2">
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <h2 className="text-3xl font-bold tracking-tighter">Settings</h2>
          </div>
        </div>
        <p className="w-8/12 mt-2 text-gray-500 text-sm font-semibold">
          List of all integrations, you can use based on your subscription
        </p>
      </div>
      <Separator className="shadow-sm" />

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
