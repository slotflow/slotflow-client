import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, LockIcon, TrendingUp } from 'lucide-react';
import { DashboardCardOneProps } from '@/shared/types/component';
import { formatNumberToPrice } from '@/shared/utils/helper/formatter';

const StatsCard = ({
  title,
  value,
  icon: Icon,
  price,
  isShow = true,
  trend = '+12% from last month',
}: DashboardCardOneProps) => {
  const isDark = !useSelector((store: RootState) => store.app.lightTheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative h-full"
    >
      <Card
        className={cn(
          'h-full overflow-hidden transition-all duration-300 border border-border backdrop-blur-xl shadow-sm hover:shadow-md p-0',
          !isShow && 'grayscale-[0.5] opacity-90',
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'p-2 rounded-xl',
                    isDark ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary',
                  )}
                >
                  {Icon ? (
                    <Icon size={20} className="shrink-0" />
                  ) : (
                    <Activity size={20} className="shrink-0" />
                  )}
                </div>

                <span className="text-sm font-medium text-muted-foreground line-clamp-1">
                  {title}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {price ? formatNumberToPrice(value ?? 0) : (value?.toLocaleString() ?? 0)}
                </h3>

                {isShow && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <TrendingUp size={12} className="mr-1" />
                      {trend.split(' ')[0]}
                    </div>

                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      growth
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transform rotate-12">
              {Icon ? <Icon size={120} /> : <Activity size={120} />}
            </div>
          </div>
        </CardContent>

        <AnimatePresence>
          {!isShow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[6px]" />

              <div className="relative z-30 flex flex-col items-center gap-3">
                <div className="p-3 bg-background rounded-full shadow-lg border border-border">
                  <LockIcon className="w-5 h-5 text-primary" />
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold text-foreground uppercase tracking-widest">
                    Pro Feature
                  </p>

                  <p className="text-[10px] text-muted-foreground mt-0.5">Upgrade to access</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
