import {
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { settingsMenu } from "@/shared/utils/constants/routeConstants";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const SettingsMenuPage = () => {

  const { goTo } = useAppNavigation();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">

      <div className="p-0 divide-y divide-border/40">
        {settingsMenu.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              onClick={() => goTo(option.path)}
              className="cursor-pointer w-full flex items-center justify-between p-2 text-left transition-colors duration-200 hover:bg-accent/50 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center space-x-4 min-w-0 pr-4">
                <div className="p-2.5 rounded-lg bg-muted/80 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 shrink-0">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-0.5 truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {option.title}
                    </span>
                    {option.badge && (
                      <Badge variant="secondary" className="text-[10px] h-4 px-1.5 py-0 font-medium">
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {option.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="size-5 shrink-0 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SettingsMenuPage;