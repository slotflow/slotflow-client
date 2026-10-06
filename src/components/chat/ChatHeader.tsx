import { X } from 'lucide-react';
import { Button } from '../ui/button';
import ProfileImage from '../profile/ProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { setSelectedUser } from '@/app/store/slices/chatSlice';

const ChatHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, onlineUsers } = useSelector((store: RootState) => store.chat);

  const handleCloseChat = () => {
    dispatch(setSelectedUser(null));
  };

  return (
    <div className="p-2 md:p-3 border-b border-base-300 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <ProfileImage
              name={selectedUser?.username || ''}
              profileImage={selectedUser?.profileImage || '/user_avatar.jpg'}
              size="size-8 md:size-10"
              rounded="full"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium">{selectedUser?.username}</h3>
            <p className="text-xs md:text-sm text-base-content/70">
              {selectedUser && onlineUsers?.includes(selectedUser?._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCloseChat}
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
};
export default ChatHeader;
