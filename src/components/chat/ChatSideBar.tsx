import { Users } from 'lucide-react';
import { chatSocket } from '@/lib/socketService';
import { useQuery } from '@tanstack/react-query';
import ProfileImage from '../profile/ProfileImage';
import { Checkbox } from '@/components/ui/checkbox';
import { ChatSocketEnum } from '@/shared/types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersForChat } from '@/services/apis/user';
import DataFetchingError from '../error/DataFetchingError';
import { ChatListUserProps } from '@/shared/types/common';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { dateFormats } from '@/shared/utils/constants/appConstants';
import ChatSidebarShimmer from '@/components/shimmers/ChatSidebarShimmer';
import { setOnlineUsers, setSelectedUser } from '@/app/store/slices/chatSlice';

const ChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, lastMessages, onlineUsers } = useSelector((store: RootState) => store.chat);
  const getLastMessage = (userId: string): { message: string; date: string } | null => {
    return lastMessages?.[userId] || null;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await fetchUsersForChat();
      return res.data;
    },
    queryKey: ['chatUsers'],
  });

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = useMemo(() => {
    return showOnlineOnly
      ? data?.filter((user: ChatListUserProps) => onlineUsers?.includes(user._id))
      : data;
  }, [showOnlineOnly, data, onlineUsers]);

  const handleOnlineUsers = useCallback(
    (userIds: string[]) => {
      dispatch(setOnlineUsers(userIds));
    },
    [dispatch],
  );

  useEffect(() => {
    chatSocket?.on(ChatSocketEnum.getOnlineUsers, handleOnlineUsers);
    return () => {
      chatSocket?.off(ChatSocketEnum.getOnlineUsers, handleOnlineUsers);
    };
  }, [handleOnlineUsers]);

  const onlineCount = Math.max(0, (onlineUsers?.length ?? 1) - 1);

  if (isLoading) return <ChatSidebarShimmer />;
  if (!data || (isError && error))
    return <DataFetchingError message={(error as Error).message} className="min-h-full" />;

  return (
    <aside
      className={`h-full w-full md:w-4/12 flex flex-col bg-neutral-200 dark:bg-neutral-900 rounded-md text-card-foreground backdrop-blur-sm transition-all duration-200 shrink-0 ${
        selectedUser ? 'hidden md:flex' : 'flex'
      }`}
    >
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-muted-foreground" />
            <h2 className="font-semibold text-base tracking-tight">Messages</h2>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
            {onlineCount} online
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="cursor-pointer flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors select-none">
            <Checkbox
              checked={showOnlineOnly}
              onCheckedChange={(checked) => setShowOnlineOnly(checked === true)}
              className="cursor-pointer size-4 rounded border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            Show online only
          </label>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-2 space-y-1 divide-y-0">
        {filteredUsers?.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers?.includes(user._id);
          const lastMsg = getLastMessage(user._id);

          return (
            <button
              key={user._id}
              type="button"
              onClick={() => dispatch(setSelectedUser(user))}
              className={`cursor-pointer w-full p-2.5 rounded-lg flex items-center gap-3 transition-colors text-left group relative ${
                isSelected
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'hover:bg-muted/60 text-foreground'
              }`}
            >
              <div className="relative shrink-0">
                <ProfileImage
                  name={user.username || 'User'}
                  profileImage={user.profileImage}
                  size="size-11"
                  rounded="full"
                />
                {isOnline && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-background"
                    title="Online"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm truncate leading-none">{user.username}</p>
                  {lastMsg?.date && (
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
                      {formatDate(lastMsg.date, dateFormats.FULL)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground truncate leading-tight">
                    {isOnline ? (
                      <>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Online
                        </span>
                        <span className="ml-2 font-semibold truncate">{lastMsg?.message}</span>
                      </>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
            </button>
          );
        })}

        {(!filteredUsers || filteredUsers.length === 0) && (
          <div className="h-40 flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
            <p className="text-sm font-medium">No users found</p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              {showOnlineOnly ? 'Try unchecking "Show online only"' : 'No conversations available'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default ChatSidebar;
