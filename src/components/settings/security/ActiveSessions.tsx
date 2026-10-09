import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectSeparator } from '@/components/ui/select';
import FeatureOverlay from '@/components/app/FeatureOverlay';
import { Monitor, Smartphone, Globe, LogOut, ShieldAlert, Laptop } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Session {
  id: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  deviceName: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

const ActiveSessions = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 'session-1',
      deviceType: 'desktop',
      deviceName: 'macOS Monterey',
      browser: 'Chrome 122.0',
      location: 'New York, USA',
      ipAddress: '192.168.1.45',
      lastActive: 'Active now',
      isCurrent: true,
    },
    {
      id: 'session-2',
      deviceType: 'mobile',
      deviceName: 'iPhone 15 Pro',
      browser: 'Safari Mobile',
      location: 'Los Angeles, USA',
      ipAddress: '172.56.21.89',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
    {
      id: 'session-3',
      deviceType: 'desktop',
      deviceName: 'Windows 11',
      browser: 'Firefox 123.0',
      location: 'Chicago, USA',
      ipAddress: '108.45.12.3',
      lastActive: '3 days ago',
      isCurrent: false,
    },
  ]);

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
  };

  const handleRevokeAllOtherSessions = () => {
    setSessions((prev) => prev.filter((session) => session.isCurrent));
  };

  const getDeviceIcon = (deviceType: Session['deviceType']) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="size-4" />;
      case 'tablet':
        return <Laptop className="size-4" />;
      default:
        return <Monitor className="size-4" />;
    }
  };

  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">Active Sessions</CardTitle>
            <Badge
              variant="outline"
              className="px-2 py-0.5 text-[10px] font-medium rounded-full text-muted-foreground border-slate-200 dark:border-border"
            >
              {sessions.length} Active
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Manage and log out of your active sessions on other browsers and devices.
          </CardDescription>
        </div>

        <Button
          title="Manage Sessions"
          variant={showForm ? 'destructive' : 'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Manage'}
        </Button>
      </CardHeader>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="active-sessions-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="p-5 pt-4 space-y-4 relative min-h-[300px]">
              <FeatureOverlay
                size="md"
                isBlur
                isDevMode
                title="Session Management Coming Soon"
                description="Remote device logout and active session management tools will be released shortly."
              />
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition-all gap-3 ${
                      session.isCurrent
                        ? 'border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                        : 'border-slate-100 dark:border-border/60 bg-slate-50/50 dark:bg-muted/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-background shrink-0 mt-0.5 sm:mt-0">
                        {getDeviceIcon(session.deviceType)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-semibold text-foreground">
                            {session.deviceName} • {session.browser}
                          </h4>
                          {session.isCurrent && (
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40 text-[10px] px-2 py-0">
                              Current Device
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <Globe className="size-3" /> {session.location} ({session.ipAddress})
                          </span>
                          <span>•</span>
                          <span>{session.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    {!session.isCurrent && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        className="h-8 text-xs gap-1.5 self-end sm:self-center border-slate-200 dark:border-border text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 hover:border-red-200"
                      >
                        <LogOut className="size-3.5" />
                        <span>Log Out</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {sessions.filter((s) => !s.isCurrent).length > 0 && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-border/50">
                  <p className="text-xs text-muted-foreground">
                    Notice suspicious activity? You can terminate all non-current sessions.
                  </p>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRevokeAllOtherSessions}
                    className="h-8 text-xs gap-1.5 shrink-0"
                  >
                    <ShieldAlert className="size-3.5" />
                    <span>Log Out Everywhere</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ActiveSessions;
