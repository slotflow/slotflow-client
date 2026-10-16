import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/app/store/appStore';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { ChartOverlayProps } from '@/shared/types/component';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';

const ChartOverlay = ({ stringOne, chartTitle }: ChartOverlayProps) => {
  const { goTo } = useAppNavigation();
  const themeMode = useSelector((store: RootState) => store.app.lightTheme);

  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-xs ${themeMode ? 'bg-white/70' : 'bg-black/70'}`}
    >
      <div className="text-center flex flex-col items-center justify-center">
        <div className="text-xl font-semibold mb-2">{chartTitle + ' '}Chart</div>
        <div className="text-lg font-semibold mb-2">Upgrade Required</div>
        <div className="text-sm text-muted-foreground mb-4">
          This chart is available on {stringOne} plan and above
        </div>
        <Button title="upgrade" variant="outline" onClick={() => goTo(redirectPaths.UPGRADE)}>
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

export default ChartOverlay;
