import { 
  Bell, 
  User, 
  Blocks, 
  ShieldCheck, 
  ChevronRight, 
  Settings as SettingsIcon, 
  LucideIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { redirectPaths } from "@/shared/utils/constants/routeConstants";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface SettingOption {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
}

const SETTINGS_OPTIONS: SettingOption[] = [
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage alerts, email communications, and push notifications",
    path: redirectPaths.NOTIFICATIONS,
    icon: Bell,
  },
  {
    id: "account",
    title: "Account",
    description: "Update personal details, profile picture, and email settings",
    path: redirectPaths.ACCOUNT,
    icon: User,
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect third-party tools, webhooks, and API keys",
    path: redirectPaths.INTEGRATIONS,
    icon: Blocks,
    badge: "Connected",
  },
  {
    id: "security",
    title: "Security & Privacy",
    description: "Manage passkeys, two-factor auth, and active user sessions",
    path: redirectPaths.SECURITY,
    icon: ShieldCheck,
  },
];

const SettingsMenuPage = () => {

  const { goTo } = useAppNavigation();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        <div className="space-y-1 border-b border-border/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          <p className="text-sm text-muted-foreground pt-1">
            Select a category to view and manage your workspace preferences.
          </p>
        </div>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden rounded-xl">
          <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
            <CardTitle className="text-base font-semibold">General Preferences</CardTitle>
            <CardDescription className="text-xs">
              Account-level controls and app behaviors
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border/40">
            {SETTINGS_OPTIONS.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.id}
                  onClick={() => goTo(option.path)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors duration-200 hover:bg-accent/50 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default SettingsMenuPage;