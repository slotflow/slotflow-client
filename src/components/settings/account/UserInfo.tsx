import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/app/store/appStore';
import DataField from '@/components/app/DataField';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectSeparator } from '@/components/ui/select';
import StatusBadge from '@/components/common/StatusBadge';
import { Globe, Mail, Phone, ShieldUser, User } from 'lucide-react';
import UpdateUserInfoForm from '@/components/form/Common/UpdateUserInfoForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserInfo = () => {
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex flex-row space-x-2">
          {' '}
          <User className="size-4 text-indigo-500" /> <span>Profile Info</span>
        </CardTitle>
        <Button
          title="Update Password"
          variant={showForm ? 'destructive' : 'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Update'}
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField label="Username" value={authUser?.username} Icon={User} />
        <DataField label="Phone" value={authUser?.phone} Icon={Phone} />
        <DataField label="Email" value={authUser?.email} Icon={Mail} />
        <DataField
          label="Account Status"
          value={<StatusBadge type={authUser?.isBlocked ? 'blocked' : 'active'} />}
          Icon={ShieldUser}
        />
        <DataField label="time zone" value={authUser?.timeZone} Icon={Globe} />
      </CardContent>
      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="user-info-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <SelectSeparator />
            <CardContent className="space-y-2 mt-4">
              <UpdateUserInfoForm onClose={() => setShowForm(false)} />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default UserInfo;
