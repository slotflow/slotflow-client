import ProfileImage from '../profile/ProfileImage';
import noProfile from '../../assets/defaultImages/avatar.png';
import { ReviewUserProfileProps } from '@/shared/types/component';

const ReviewUserProfile = ({ profileImage, username, text }: ReviewUserProfileProps) => {
  return (
    <div className="flex items-center gap-3 border-t pt-3 mt-3">
      <ProfileImage
        name={username || 'User'}
        profileImage={profileImage || noProfile}
        size="size-10"
        rounded="full"
      />
      <div className="text-sm">
        <p className="font-medium">{text}</p>
        <p className="text-muted-foreground">{username}</p>
      </div>
    </div>
  );
};

export default ReviewUserProfile;
