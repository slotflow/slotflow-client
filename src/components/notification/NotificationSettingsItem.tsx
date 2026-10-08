import { Switch } from '../ui/switch';
import { NotificationItemProps } from '@/shared/types/component';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const NotificationSettingsItem = ({
  title,
  description,
  channel,
  type,
  checked,
  isLoading,
  onChange,
}: NotificationItemProps) => {
  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
        </div>
        <Switch
          className={`cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          checked={checked}
          disabled={isLoading}
          onCheckedChange={(enabled) => onChange(channel, type, enabled)}
        />
      </CardHeader>
    </Card>
  );
};

export default NotificationSettingsItem;
