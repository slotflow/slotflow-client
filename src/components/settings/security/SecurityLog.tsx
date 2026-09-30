import {
  ShieldAlert,
  KeyRound,
  Globe,
  Laptop,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectSeparator } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import FeatureOverlay from '@/components/app/FeatureOverlay';

export interface SecurityLogEvent {
  id: string;
  type: 'login_success' | 'login_failed' | 'password_change' | '2fa_enabled' | '2fa_disabled';
  description: string;
  device: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

const SecurityLog = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  // Mock security log entries
  const [logs] = useState<SecurityLogEvent[]>([
    {
      id: 'log-1',
      type: 'login_success',
      description: 'Successful Sign-In',
      device: 'Chrome on macOS',
      ipAddress: '192.168.1.45',
      location: 'New York, USA',
      timestamp: 'Today at 10:24 AM',
      status: 'success',
    },
    {
      id: 'log-2',
      type: 'password_change',
      description: 'Password Updated',
      device: 'Chrome on macOS',
      ipAddress: '192.168.1.45',
      location: 'New York, USA',
      timestamp: 'Yesterday at 3:12 PM',
      status: 'success',
    },
    {
      id: 'log-3',
      type: 'login_failed',
      description: 'Failed Login Attempt',
      device: 'Safari on iOS',
      ipAddress: '185.220.101.5',
      location: 'Frankfurt, Germany',
      timestamp: 'Sep 08, 2026 at 11:45 PM',
      status: 'failed',
    },
    {
      id: 'log-4',
      type: '2fa_enabled',
      description: 'Two-Factor Authentication Enabled',
      device: 'Chrome on macOS',
      ipAddress: '192.168.1.45',
      location: 'New York, USA',
      timestamp: 'Sep 05, 2026 at 09:15 AM',
      status: 'success',
    },
  ]);

  const getEventIcon = (type: SecurityLogEvent['type'], status: SecurityLogEvent['status']) => {
    if (status === 'failed') {
      return <XCircle className="size-4 text-red-500" />;
    }
    switch (type) {
      case 'password_change':
        return <KeyRound className="size-4 text-indigo-500" />;
      case '2fa_enabled':
      case '2fa_disabled':
        return <ShieldAlert className="size-4 text-amber-500" />;
      default:
        return <CheckCircle2 className="size-4 text-emerald-500" />;
    }
  };

  const getStatusBadge = (status: SecurityLogEvent['status']) => {
    switch (status) {
      case 'failed':
        return (
          <Badge
            variant="outline"
            className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
          >
            Failed
          </Badge>
        );
      case 'warning':
        return (
          <Badge
            variant="outline"
            className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40"
          >
            Warning
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
          >
            Success
          </Badge>
        );
    }
  };

  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">Security Audit Log</CardTitle>
            <Badge
              variant="outline"
              className="px-2 py-0.5 text-[10px] font-medium rounded-full text-muted-foreground border-slate-200 dark:border-border"
            >
              {logs.length} Events Recorded
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Review recent sign-in attempts, password updates, and security events on your account.
          </CardDescription>
        </div>

        <Button
          title="View Audit Logs"
          variant={showForm ? 'destructive' : 'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'View Log'}
        </Button>
      </CardHeader>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="security-log-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="p-5 pt-4 space-y-3 relative min-h-[300px]">
              <FeatureOverlay
                size='sm'
                isBlur
                isDevMode
                title="Security Audit Logs Coming Soon"
                description="We are building real-time activity tracking and automated threat detection for your account."
              />
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-border/60 bg-slate-50/50 dark:bg-muted/20 transition-all gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-background shrink-0 mt-0.5 sm:mt-0">
                      {getEventIcon(log.type, log.status)}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-semibold text-foreground">
                          {log.description}
                        </h4>
                        {getStatusBadge(log.status)}
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Laptop className="size-3" /> {log.device}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Globe className="size-3" /> {log.location} ({log.ipAddress})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0 self-end sm:self-center">
                    <Clock className="size-3" />
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SecurityLog;