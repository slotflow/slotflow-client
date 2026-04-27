import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import React, { useMemo } from "react";
import { OptionTabsProps } from "@/shared/interface/componentInterface";

const OptionTabs: React.FC<OptionTabsProps> = ({
  selectedTab,
  setSelectedTab,
  profileTabs,
  authUser,
}) => {

  const filteredTabs = useMemo(() => {
    return profileTabs.filter(tab =>
      tab.role?.includes(authUser?.role || "")
    );
  }, [profileTabs, authUser?.role]);

  return (
    <>
      <div className="hidden md:flex md:flex-col w-2/12 space-y-2">
        {filteredTabs.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSelectedTab(value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
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

      <div className="w-full md:hidden">
        <Select value={selectedTab} onValueChange={setSelectedTab}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>

          <SelectContent>
            {filteredTabs.map(({ value, label, icon: Icon }) => (
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
    </>
  );
};

export default OptionTabs;