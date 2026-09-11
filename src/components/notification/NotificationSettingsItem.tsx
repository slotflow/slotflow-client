import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { NotificationItemProps } from '@/shared/types/component';

const NotificationSettingsItem = ({
  title,
  description,
  channel,
  type,
  checked,
  onChange,
}: NotificationItemProps) => {
  return (
    <div className="flex items-center justify-between gap-6 py-4 bg-primary-foreground rounded-md p-2 mt-1">
      <div className="min-w-0 space-y-1">
        <Label className="text-sm font-medium">{title}</Label>

        <p className="text-sm leading-5 text-muted-foreground">{description}</p>
      </div>

      <Switch className="cursor-pointer" checked={checked} onCheckedChange={(enabled) => onChange(channel, type, enabled)} />
    </div>
  );
};

export default NotificationSettingsItem;
