import DataPrivacy from './security/DataPrivacy';
import SecurityLog from './security/SecurityLog';
import TwoFactorSetup from './security/TwoFactorSetup';
import UpdatePassword from './security/UpdatePassword';
import ActiveSessions from './security/ActiveSessions';
import TeamStaffAccess from './security/TeamStaffAccess';
import LinkedSocialAccounts from './security/LinkedSocialAccounts';

const SecuritySettings = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2">
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Authentication & Access
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your credentials, multi-factor authentication, social sign-ins, and active device sessions.
          </p>
        </div>
        <UpdatePassword />
        <TwoFactorSetup />
        <LinkedSocialAccounts />
        <ActiveSessions />
      </div>

      <div className="space-y-3 pt-2">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Audit Logs & Team Permissions
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitor recent account security events and manage staff access controls.
          </p>
        </div>
        <SecurityLog />
        <TeamStaffAccess />
      </div>

      <div className="space-y-3 pt-2">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Data & Privacy
          </h2>
          <p className="text-sm text-muted-foreground">
            Export your personal account data archive or manage account deactivation and deletion options.
          </p>
        </div>
        <DataPrivacy />
      </div>
    </div>
  );
};

export default SecuritySettings;