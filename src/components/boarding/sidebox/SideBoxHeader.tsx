import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/app/store/appStore';
import { LoaderCircle, LogOut } from 'lucide-react';
import ThemeToggler from '@/components/common/ThemeToggler';
import { useSignout } from '@/hooks/systemHooks/useSignout';

const SideBoxHeader = () => {

  const { userSignout, isSigningOut } = useSignout();
  const user = useSelector((store: RootState) => store.auth.authUser);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black text-[var(--mainColor)] italic">Slotflow</h2>

        <p className="text-sm text-muted-foreground mt-1">onboarding</p>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggler />
        {user && (
          <Button
            title="Logout"
            variant="outline"
            onClick={() => userSignout()}
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <LoaderCircle className="animate-spin w-4 h-4" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default SideBoxHeader;
