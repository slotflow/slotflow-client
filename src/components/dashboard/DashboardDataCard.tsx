import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardDataCardProps } from '@/shared/interface/componentInterface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardDataCard: React.FC<DashboardDataCardProps> = ({
  title,
  icon: Icon,
  isLoading,
  isError,
  onReload,
  children,
  className,
  empty,
  emptyMessage = "No data available"
}) => {
  return (
    <Card className={cn("overflow-hidden border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl transition-all duration-300 hover:shadow-md h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100 dark:border-slate-900">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200 uppercase">
            {title}
          </CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onReload} 
          disabled={isLoading}
          className="h-8 w-8 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : isError ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center text-center h-full"
            >
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full mb-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Failed to load data</p>
              <Button 
                variant="link" 
                size="sm" 
                onClick={onReload} 
                className="text-indigo-600 dark:text-indigo-400 mt-1"
              >
                Try again
              </Button>
            </motion.div>
          ) : empty ? (
             <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center text-center h-full"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-900/20 rounded-full mb-3">
                <Icon className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{emptyMessage}</p>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="h-full"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default DashboardDataCard;
