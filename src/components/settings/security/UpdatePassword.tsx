import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectSeparator } from '@/components/ui/select';
import UpdatePasswordForm from '@/components/form/Common/UpdatePasswordForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const UpdatePassword = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Change Password</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Update your account password regularly to keep your account secure.
          </CardDescription>
        </div>

        <Button
          title="Update Password"
          variant={showForm ? 'destructive' : 'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Update'}
        </Button>
      </CardHeader>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="password-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="p-5 pt-4">
              <UpdatePasswordForm onClose={() => setShowForm(false)} />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default UpdatePassword;
