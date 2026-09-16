import { UserProfileProps } from '@/shared/types/component';
import UserProfileTopCard from './userProfileCards/UserProfileTopCard';

const UserProfile = ({ username, profileImage, address, profile }: UserProfileProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UserProfileTopCard name={username} image={profileImage} />
          {profile}
        </div>
        <div className="space-y-6">{address}</div>
      </div>
    </div>
  );
};

export default UserProfile;
