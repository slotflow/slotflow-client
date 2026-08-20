import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Role } from '@/shared/interface/enums';
import { RootState } from '@/shared/redux/appStore';
import { Outlet, useNavigate } from 'react-router-dom';
import { settingsTabs } from '@/shared/utils/constants';
import { ScrollArea } from '@/components/ui/scroll-area';

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const currentTab = location.pathname.split('/')[2] || 'notifications';

  console.log('authUser : ', authUser);

  return (
    <div className="container p-4 space-y-6">
      <div className="flex flex-col md:flex-row w-full py-4 mt-4 space-x-0 md:space-x-2">
        <div className="hidden md:block w-2/12">
          <ScrollArea className="h-[calc(100vh-150px)]">
            <div className="flex flex-col space-y-2 px-2">
              {settingsTabs.map(({ value, label, icon: Icon }) => {
                if (value === 'subscription' && authUser?.role === Role.USER) {
                  return null;
                }

                return (
                  <button
                    key={value}
                    onClick={() => navigate(value)}
                    className={`flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      currentTab === value ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        <div className="md:hidden mb-4">
          <Select value={currentTab} onValueChange={(value) => navigate(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent>
              {settingsTabs
                .filter(
                  ({ value }) => !(value === 'subscription' && authUser?.role === Role.PROVIDER),
                )
                .map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 w-full md:w-10/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
