import {
  Download,
  ShieldAlert,
  UserX,
  Trash2,
  FileSpreadsheet,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectSeparator } from '@/components/ui/select';
import FeatureOverlay from '@/components/app/FeatureOverlay';

const DataPrivacy = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportComplete, setExportComplete] = useState<boolean>(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState<string>('');
  const [isDeactivated, setIsDeactivated] = useState<boolean>(false);

  const handleExportData = () => {
    setIsExporting(true);
    setExportComplete(false);

    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 4000);
    }, 2000);
  };

  const handleDeactivateAccount = () => {
    setIsDeactivated(true);
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmationText === 'DELETE') {
      alert('Account deletion request queued.');
    }
  };

  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">
              Data Privacy & Account Controls
            </CardTitle>
            <Badge
              variant="outline"
              className="px-2 py-0.5 text-[10px] font-medium rounded-full text-muted-foreground border-slate-200 dark:border-border"
            >
              GDPR / CCPA
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Download your account data archive, temporarily deactivate your account, or permanently
            delete your profile.
          </CardDescription>
        </div>

        <Button
          title="Manage Privacy"
          variant={showForm ? 'destructive' : 'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Manage Privacy'}
        </Button>
      </CardHeader>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="data-privacy-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="p-5 pt-4 space-y-5 relative min-h-[300px]">
              <FeatureOverlay
                size="md"
                isBlur
                isDevMode
                title="Data Controls Coming Soon"
                description="We are building advanced privacy tools. This module will be live shortly."
              />
              <div className="p-3.5 rounded-xl border border-slate-100 dark:border-border/60 bg-slate-50/50 dark:bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="size-4 text-indigo-500" />
                    <h4 className="text-xs font-semibold text-foreground">Export Account Data</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Download a copy of your personal data, appointments, and billing history in JSON
                    format.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  disabled={isExporting}
                  className="h-8 text-xs gap-1.5 shrink-0 border-slate-200 dark:border-border"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Generating Archive...</span>
                    </>
                  ) : exportComplete ? (
                    <>
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                      <span>Export Sent to Email</span>
                    </>
                  ) : (
                    <>
                      <Download className="size-3.5" />
                      <span>Request Export</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <UserX className="size-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="text-xs font-semibold text-foreground">Deactivate Account</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Temporarily hide your profile and calendar listings. You can reactivate anytime
                    by logging in.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDeactivateAccount}
                  className="h-8 text-xs gap-1.5 shrink-0 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-950/40"
                >
                  <ShieldAlert className="size-3.5" />
                  <span>{isDeactivated ? 'Account Deactivated' : 'Deactivate'}</span>
                </Button>
              </div>

              <div className="p-4 rounded-xl border border-red-200/80 dark:border-red-900/50 bg-red-50/20 dark:bg-red-950/10 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-4 text-red-600 dark:text-red-400" />
                  <h4 className="text-xs font-semibold text-red-600 dark:text-red-400">
                    Permanently Delete Account
                  </h4>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Once deleted, your account cannot be recovered. All active bookings, client
                  profiles, payouts, and calendar settings will be permanently erased.
                </p>

                <form onSubmit={handleDeleteAccount} className="space-y-3 pt-1">
                  <div className="space-y-1.5 max-w-sm">
                    <Label htmlFor="confirm-delete" className="text-[11px] text-muted-foreground">
                      Type <span className="font-semibold text-foreground">DELETE</span> to confirm:
                    </Label>
                    <Input
                      id="confirm-delete"
                      type="text"
                      placeholder="Type DELETE"
                      value={deleteConfirmationText}
                      onChange={(e) => setDeleteConfirmationText(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    disabled={deleteConfirmationText !== 'DELETE'}
                    className="h-8 text-xs gap-1.5"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Delete Account Permanently</span>
                  </Button>
                </form>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default DataPrivacy;
