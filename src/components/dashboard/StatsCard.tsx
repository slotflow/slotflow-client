import React from 'react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, LockIcon, TrendingUp } from 'lucide-react';
import { formatNumberToPrice } from '@/shared/helper/formatter';
import { DashboardCardOneProps } from '@/shared/interface/componentInterface';

const StatsCard: React.FC<DashboardCardOneProps> = ({
  title,
  value,
  icon: Icon,
  price,
  isShow = true,
  trend = "+12% from last month"
}) => {
  const isDark = !useSelector((store: RootState) => store.app.lightTheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 border border-slate-200/60 dark:border-slate-800/60",
        "backdrop-blur-xl shadow-sm hover:shadow-md",
        !isShow && "grayscale-[0.5] opacity-90"
      )}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-xl",
                  isDark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"
                )}>
                  {Icon ? <Icon size={20} className="shrink-0" /> : <Activity size={20} className="shrink-0" />}
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                  {title}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {price ? formatNumberToPrice(value ?? 0) : value?.toLocaleString() ?? 0}
                </h3>
                {isShow && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <TrendingUp size={12} className="mr-1" />
                      {trend.split(' ')[0]}
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                      growth
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transform rotate-12">
              {Icon ? <Icon size={120} /> : <Activity size={120} />}
            </div>
          </div>
        </CardContent>

        {/* Lock Overlay for No Access */}
        <AnimatePresence>
          {!isShow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-950/80 backdrop-blur-[6px]" />
              <div className="relative z-30 flex flex-col items-center gap-3">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-lg border border-slate-200 dark:border-slate-800">
                  <LockIcon className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                    Pro Feature
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Upgrade to access
                  </p>
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



