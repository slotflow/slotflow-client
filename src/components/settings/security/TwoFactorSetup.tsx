import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectSeparator } from '@/components/ui/select';
import { ShieldCheck, ShieldAlert, Smartphone, Key, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import FeatureOverlay from '@/components/app/FeatureOverlay';

const TwoFactorSetup = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const secretKey = 'JBSWY3DPEHPK3PXP';

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyAndEnable = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      setIs2FAEnabled(true);
      setShowForm(false);
      setOtpCode('');
    }
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    setShowForm(false);
  };

  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">Two-Factor Authentication (2FA)</CardTitle>
            <Badge
              variant={is2FAEnabled ? 'secondary' : 'outline'}
              className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1 ${is2FAEnabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40'
                  : 'text-muted-foreground border-slate-200 dark:border-border'
                }`}
            >
              <span
                className={`size-1.5 rounded-full ${is2FAEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
              />
              {is2FAEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Add an extra layer of security to your account using an authenticator app (Google Authenticator, Authy, or 1Password).
          </CardDescription>
        </div>

        <Button
          title={is2FAEnabled ? 'Manage 2FA' : 'Enable 2FA'}
          variant={showForm ? 'destructive' : 'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : is2FAEnabled ? 'Manage' : 'Setup'}
        </Button>
      </CardHeader>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="2fa-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="p-5 pt-4 space-y-5 relative min-h-[300px]">
              <FeatureOverlay
                size='md'
                isBlur
                isDevMode
                title="2FA Authentication Coming Soon"
                description="Enhanced two-factor security via authenticator apps and SMS keys is currently under development."
              />
              {!is2FAEnabled ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-100 dark:border-border/60 bg-slate-50/50 dark:bg-muted/20">
                    <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-background rounded-lg border border-slate-200 dark:border-border text-center">
                      <div className="size-32 bg-slate-100 dark:bg-muted flex items-center justify-center rounded-md border border-dashed border-slate-300 dark:border-border mb-2">
                        <Smartphone className="size-8 text-muted-foreground" />
                      </div>
                      <span className="text-[11px] text-muted-foreground">Scan with Google Authenticator or Authy</span>
                    </div>

                    <div className="flex flex-col justify-center space-y-3">
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Key className="size-3.5 text-indigo-500" /> Manual Setup Key
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          Can't scan the QR code? Enter this secret code into your app manually.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <code className="px-3 py-1.5 text-xs font-mono font-semibold tracking-wider bg-white dark:bg-background border rounded-md border-slate-200 dark:border-border text-foreground flex-1">
                          {secretKey}
                        </code>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleCopySecret}
                          className="h-8 px-2.5 text-xs gap-1"
                        >
                          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                          <span>{copied ? 'Copied' : 'Copy'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyAndEnable} className="space-y-3 max-w-sm">
                    <div className="space-y-1.5">
                      <Label htmlFor="otp" className="text-xs font-medium">
                        Verification Code
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        className="h-9 text-xs tracking-widest font-mono"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="submit"
                        disabled={otpCode.length !== 6}
                        className="h-8 text-xs px-4"
                      >
                        <ShieldCheck className="size-3.5 mr-1.5" />
                        Verify & Enable 2FA
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-emerald-100 dark:border-emerald-950/50 bg-emerald-50/30 dark:bg-emerald-950/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Two-Factor Authentication is Active</h4>
                      <p className="text-[11px] text-muted-foreground">
                        Your account is currently protected with TOTP authenticator security.
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleDisable2FA}
                    className="h-8 text-xs gap-1.5 shrink-0"
                  >
                    <ShieldAlert className="size-3.5" />
                    Disable 2FA
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

export default TwoFactorSetup;