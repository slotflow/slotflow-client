import ChatSidebar from '@/components/chat/ChatSideBar';
import { fetchUsersForChat } from '@/services/apis/user';
import ChatModule from '@/components/chat/ChatModule';

const ChatWindow = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar getUsers={fetchUsersForChat} />
      <ChatModule />
    </div>
  );
};

export default ChatWindow;
