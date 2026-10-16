import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface NotificationPermissionBannerProps {
  onAllow: () => void;
  onDismiss: () => void;
  isLoading: boolean;
}

export const NotificationPermissionBanner: React.FC<NotificationPermissionBannerProps> = ({
  onAllow,
  onDismiss,
  isLoading,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <Card className="border border-slate-200 dark:border-border bg-white dark:bg-card shadow-lg rounded-2xl p-2">
        <CardContent className="p-3 flex items-start gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5">
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Turn on Notifications</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Get real-time updates for appointment bookings, reminders, and messages.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                disabled={isLoading}
                className="text-xs h-8 px-3 text-muted-foreground hover:text-foreground"
              >
                Maybe Later
              </Button>
              <Button
                size="sm"
                onClick={onAllow}
                disabled={isLoading}
                className="text-xs h-8 px-3 bg-primary text-primary-foreground font-medium rounded-lg"
              >
                {isLoading ? 'Enabling...' : 'Enable'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
