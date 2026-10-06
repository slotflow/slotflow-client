import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { chatSocket } from '@/lib/socketService';
import ProfileImage from '../profile/ProfileImage';
import { useEffect, useRef, useState } from 'react';
import { getMessages } from '@/services/apis/message';
import { ChatSocketEnum } from '@/shared/types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { SocketDataInterface } from '@/shared/types/common';
import { formatDate } from '@/shared/utils/helper/formatDate';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { dateFormats } from '@/shared/utils/constants/appConstants';
import NoChatSelectedSShimmer from '@/components/shimmers/NoChatSelectedSShimmer';

const ChatModule = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messageSenderId, setMessageSenderId] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { selectedUser, messages, isMessagesLoading } = useSelector(
    (store: RootState) => store.chat,
  );
  const { authUser } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (!selectedUser || !authUser) return;
    dispatch(getMessages({ selectedUserId: selectedUser._id }));
  }, [dispatch, selectedUser, authUser]);

  useEffect(() => {
    if (messageEndRef.current && (messages || isTyping)) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!chatSocket || !authUser) return;

    chatSocket.on(ChatSocketEnum.typing, (socketData: SocketDataInterface) => {
      const { fromUserId, toUserId } = socketData;
      if (fromUserId === selectedUser?._id && toUserId === authUser.uid) {
        setMessageSenderId(fromUserId);
        setIsTyping(true);
      }
    });

    chatSocket.on(ChatSocketEnum.stopTyping, (socketData: SocketDataInterface) => {
      const { fromUserId, toUserId } = socketData;
      if (fromUserId === selectedUser?._id && toUserId === authUser.uid) {
        setIsTyping(false);
        setMessageSenderId(fromUserId);
      }
    });

    return () => {
      chatSocket?.off(ChatSocketEnum.typing);
      chatSocket?.off(ChatSocketEnum.stopTyping);
    };
  }, [authUser, selectedUser]);

  if (!selectedUser) return <NoChatSelectedSShimmer className="w-9/12" />;

  return (
    <div className="w-full md:w-8/12 flex flex-col overflow-auto mt-5 md:mt-0 bg-neutral-200 dark:bg-neutral-900 rounded-md">
      <ChatHeader />
      {isMessagesLoading ? (
        <NoChatSelectedSShimmer className="w-full" />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.senderId === authUser?.uid ? 'justify-end' : 'justify-start'}`}
              ref={messageEndRef}
            >
              {message.senderId !== authUser?.uid && (
                <ProfileImage
                  name={selectedUser.username ?? ''}
                  profileImage={selectedUser.profileImage}
                  size="size-6 md:size-8"
                  rounded="full"
                  className="border"
                />
              )}

              <div
                className={`flex flex-col rounded-md bg-neutral-300 dark:bg-neutral-700 px-4 py-1 max-w-8/12 ${message.senderId !== authUser?.uid ? 'ml-3' : 'mr-3'}`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p className="text-[13px] md:text-[15px]">{message.text}</p>}
                <time className="text-[10px] opacity-50 ml-auto">
                  {formatDate(message.createdAt, dateFormats.TIME_12H_LOWER)}
                </time>
              </div>

              {message.senderId === authUser?.uid && (
                <ProfileImage
                  name={authUser.username ?? ''}
                  profileImage={authUser.profileImage}
                  size="size-6 md:size-8"
                  rounded="full"
                  className="border"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {isTyping && authUser?.uid !== messageSenderId && (
        <div className="px-4 pb-2 flex">
          <div className="rounded-2xl rounded-bl-md bg-[var(--menuItemHoverBg)] px-4 py-3 shadow-sm">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Typing</span>

              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
            </div>
          </div>
        </div>
      )}

      <MessageInput
        setIsTyping={setIsTyping}
        isTyping={isTyping}
        setMessageSenderId={setMessageSenderId}
      />
    </div>
  );
};

export default ChatModule;
