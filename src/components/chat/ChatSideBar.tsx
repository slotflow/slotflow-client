import { Users } from 'lucide-react';
import { Button } from '../ui/button';
import { socket } from '@/lib/socketService';
import { useQuery } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersForChat } from '@/services/apis/user';
import DataFetchingError from '../error/DataFetchingError';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatSidebarShimmer from '@/components/shimmers/ChatSidebarShimmer';
import { ChatListUserProps, setLatMessageProps } from '@/shared/types/common';
import { setLastMessage, setOnlineUsers, setSelectedUser } from '@/app/store/slices/chatSlice';

const formatDate = (date: string) => {
  const now = new Date();
  const messageDate = new Date(date);

  if (
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear()
  ) {
    return messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    const day = messageDate.getDate().toString().padStart(2, '0');
    const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
    const year = messageDate.getFullYear().toString().slice(2);
    return `${day}/${month}/${year}`;
  }
};

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
    socket?.on('getOnlineUsers', handleOnlineUsers);
    return () => {
      socket?.off('getOnlineUsers', handleOnlineUsers);
    };
  }, [handleOnlineUsers]);

  useEffect(() => {
    const setNewMessage = (message: setLatMessageProps) => {
      setLastMessage({
        userId: message.senderId,
        message: message.text ? message.text : 'Image',
        date: message.createdAt,
      });
    };
    socket?.on('newMessage', setNewMessage);
    return () => {
      socket?.off('newMessage', setNewMessage);
    };
  }, []);

  if (isLoading) return <ChatSidebarShimmer />;
  if (!data || (isError && error))
    return <DataFetchingError message={(error as Error).message} className="min-h-full" />;

  return (
    <aside
      className={`h-full w-full md:w-4/12 space-y-2 flex flex-col transition-all duration-200 sticky ${selectedUser ? 'hidden md:block' : 'block'}`}
    >
      <div className="w-full p-3 md:p-5 bg-neutral-200 dark:bg-neutral-800 rounded-md">
        <div className="lg:flex items-center gap-3">
          <Users className="size-6" />
          <label className="cursor-pointer flex items-center gap-2">
            <Checkbox
              checked={showOnlineOnly}
              onCheckedChange={(checked) => setShowOnlineOnly(checked === true)}
              className="size-4 cursor-pointer"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-sm text-zinc-500">({(onlineUsers?.length ?? 1) - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-md">
        {filteredUsers?.map((user: ChatListUserProps) => (
          <Button
            variant='outline'
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`w-full p-2 flex gap-3 items-center border-b ${selectedUser?._id === user._id ? '' : ''}`}
          >
            <div className="relative w-fit">
              <img
                src={user.profileImage || '/user_avatar.jpg'}
                alt={user.username}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers?.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="w-10/12">
              <div className="flex justify-between">
                <p className="font-medium truncate text-sm lg:text-md">{user.username}</p>
                {getLastMessage(user._id) && (
                  <p className="text-xs truncate mt-1 ">
                    {getLastMessage(user._id)?.date && formatDate(getLastMessage(user._id)!.date)}
                  </p>
                )}
              </div>
              <div className="flex text-sm lg:text-md text-stone-500">
                {getLastMessage(user._id) ? (
                  <p className="font-normal truncate">{getLastMessage(user._id)?.message}</p>
                ) : onlineUsers?.includes(user._id) ? (
                  'Online'
                ) : (
                  'Offline'
                )}
              </div>
            </div>
          </Button>
        ))}

        {filteredUsers?.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default ChatSidebar;
