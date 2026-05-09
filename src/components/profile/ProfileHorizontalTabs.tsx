import React, { useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProfileHorizontalTabsComponentProps } from "@/shared/interface/componentInterface";

const ProfileHorizontalTabs: React.FC<ProfileHorizontalTabsComponentProps> = ({
    isAdmin,
    tab,
    setTab,
    tabArray,
}) => {
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
        <>
            <div className="hidden md:block w-2/12">
                <ScrollArea className="h-[calc(100vh-150px)]">
                    <div className="flex flex-col space-y-2 px-2">
                        {tabs.map((tabName, index) => (
                            <button
                                key={index}
                                onClick={() => setTab(index)}
                                className={`flex items-center px-3 py-2 rounded-md w-full text-sm font-medium cursor-pointer transition-colors
                  ${tab === index ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}
                            >
                                {tabName}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <div className="md:hidden mb-4 w-full">
                <Select
                    value={tabs[tab]}
                    onValueChange={(value) => setTab(tabs.indexOf(value))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select tab" />
                    </SelectTrigger>
                    <SelectContent>
                        {tabs.map((tabName, index) => (
                            <SelectItem key={index} value={tabName}>
                                {tabName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default ProfileHorizontalTabs;
