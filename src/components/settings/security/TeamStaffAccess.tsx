import { Mail, Trash2, Clock, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectSeparator } from '@/components/ui/select';
import FeatureOverlay from '@/components/app/FeatureOverlay';

export type RoleType = 'Owner' | 'Admin' | 'Manager' | 'Support' | 'Staff';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  avatarUrl?: string;
  status: 'active' | 'pending' | 'suspended';
  addedAt: string;
  isOwner?: boolean;
}

const TeamStaffAccess = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<RoleType>('Staff');

  const [members, setMembers] = useState<StaffMember[]>([
    {
      id: 'mem-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@company.com',
      role: 'Owner',
      status: 'active',
      addedAt: 'Jan 10, 2024',
      isOwner: true,
    },
    {
      id: 'mem-2',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Admin',
      status: 'active',
      addedAt: 'Mar 15, 2024',
    },
    {
      id: 'mem-3',
      name: 'David Miller',
      email: 'david.m@company.com',
      role: 'Support',
      status: 'pending',
      addedAt: 'Sep 09, 2026',
    },
    {
      id: 'mem-4',
      name: 'Emma Watson',
      email: 'emma.w@company.com',
      role: 'Manager',
      status: 'active',
      addedAt: 'Jun 22, 2025',
    },
  ]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newMember: StaffMember = {
      id: `mem-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      addedAt: 'Just now',
    };

    setMembers((prev) => [newMember, ...prev]);
    setInviteEmail('');
  };

  const handleRoleChange = (memberId: string, newRole: RoleType) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)));
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const getRoleBadge = (role: RoleType) => {
    switch (role) {
      case 'Owner':
        return (
          <Badge className="bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/40 text-[10px] px-2 py-0">
            Owner
          </Badge>
        );
      case 'Admin':
        return (
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/40 text-[10px] px-2 py-0">
            Admin
          </Badge>
        );
      case 'Manager':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40 text-[10px] px-2 py-0">
            Manager
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-[10px] px-2 py-0 border-slate-200 text-slate-600 dark:border-border dark:text-slate-300"
          >
            {role}
          </Badge>
        );
    }
  };

  return (
    <Card className="p-2 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">Team & Staff Access</CardTitle>
            <Badge
              variant="outline"
              className="px-2 py-0.5 text-[10px] font-medium rounded-full text-muted-foreground border-slate-200 dark:border-border"
            >
              {members.length} Members
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Manage staff roles, grant fine-grained permissions, and invite team members.
          </CardDescription>
        </div>

        <Button
          title="Manage Team"
          variant={showForm ? 'destructive' : 'secondary'}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-muted/20 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/30 shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Manage Access'}
        </Button>
      </CardHeader>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            key="team-access-form"
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
                title="Team & Permissions Coming Soon"
                description="Role-based access control and custom staff permissions will be available in an upcoming update."
              />
              <form
                onSubmit={handleSendInvite}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-border/80 bg-slate-50/50 dark:bg-muted/20 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <UserPlus className="size-4 text-primary" />
                  <span>Invite New Team Member</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="pl-8 h-9 text-xs"
                      required
                    />
                  </div>

                  <Select
                    value={inviteRole}
                    onValueChange={(val) => setInviteRole(val as RoleType)}
                  >
                    <SelectTrigger className="w-full sm:w-[130px] h-9 text-xs">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button type="submit" size="sm" className="h-9 text-xs gap-1.5 shrink-0">
                    <UserPlus className="size-3.5" />
                    <span>Send Invite</span>
                  </Button>
                </div>
              </form>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
                  <span>Member Details</span>
                  <span>Role & Access</span>
                </div>

                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-border/60 bg-slate-50/30 dark:bg-muted/10 hover:bg-slate-50/80 dark:hover:bg-muted/20 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full border border-slate-200 dark:border-border bg-slate-100 dark:bg-muted flex items-center justify-center font-semibold text-xs text-foreground uppercase shrink-0">
                        {member.name.substring(0, 2)}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-semibold text-foreground">{member.name}</h4>
                          {getRoleBadge(member.role)}
                          {member.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400">
                              <Clock className="size-3" /> Pending Invite
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {member.isOwner ? (
                        <span className="text-[11px] text-muted-foreground font-medium px-2 py-1">
                          Primary Owner
                        </span>
                      ) : (
                        <>
                          <Select
                            value={member.role}
                            onValueChange={(val) => handleRoleChange(member.id, val as RoleType)}
                          >
                            <SelectTrigger className="h-8 w-[110px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="Support">Support</SelectItem>
                              <SelectItem value="Staff">Staff</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            className="size-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                            title="Remove Member"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default TeamStaffAccess;
