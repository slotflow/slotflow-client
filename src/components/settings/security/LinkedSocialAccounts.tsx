import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Unlink, Link2 } from 'lucide-react';
import { SelectSeparator } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import FeatureOverlay from '@/components/app/FeatureOverlay';

interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  connectedEmail?: string;
}

const LinkedSocialAccounts = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [providers, setProviders] = useState<SocialProvider[]>([
    {
      id: 'google',
      name: 'Google',
      icon: 'https://authjs.dev/img/providers/google.svg',
      connected: true,
      connectedEmail: 'user@gmail.com',
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'https://authjs.dev/img/providers/apple.svg',
      connected: false,
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'https://authjs.dev/img/providers/microsoft.svg',
      connected: false,
    },
  ]);

  const handleToggleConnection = (id: string) => {
    setProviders((prev) =>
      prev.map((provider) => {
        if (provider.id === id) {
          const isConnecting = !provider.connected;
          return {
            ...provider,
            connected: isConnecting,
            connectedEmail: isConnecting ? 'connected@account.com' : undefined,
          };
        }
        return provider;
      })
    );
  };

  const connectedCount = providers.filter((p) => p.connected).length;

  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">Linked Social Accounts</CardTitle>
            <Badge
              variant="outline"
              className="px-2 py-0.5 text-[10px] font-medium rounded-full text-muted-foreground border-slate-200 dark:border-border"
            >
              {connectedCount} Connected
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Connect external OAuth accounts to log in seamlessly without entering your password.
          </CardDescription>
        </div>

        <Button
          title="Manage Social Accounts"
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
            key="social-accounts-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="p-5 pt-4 space-y-3 relative min-h-[300px]">
              <FeatureOverlay
                size='md'
                isBlur
                isDevMode
                title="Social SSO Connections Coming Soon"
                description="Single sign-on options for Google, GitHub, and Apple account linking are on our roadmap."
              />
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-border/60 bg-slate-50/50 dark:bg-muted/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-background shrink-0">
                      <img
                        src={provider.icon}
                        alt={provider.name}
                        className="size-5 object-contain"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-foreground">
                          {provider.name}
                        </h4>
                        {provider.connected && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="size-3" /> Connected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {provider.connected
                          ? provider.connectedEmail
                          : `Use your ${provider.name} account to log in`}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant={provider.connected ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleToggleConnection(provider.id)}
                    className={`h-8 text-xs gap-1.5 ${provider.connected
                        ? 'border-slate-200 dark:border-border text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 hover:border-red-200'
                        : ''
                      }`}
                  >
                    {provider.connected ? (
                      <>
                        <Unlink className="size-3.5" />
                        <span>Disconnect</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="size-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default LinkedSocialAccounts;