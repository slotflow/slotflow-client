import ChatSidebar from '@/components/chat/ChatSideBar';
import ChatModule from '@/components/chat/ChatModule';

const ChatWindow = () => {
  return (
    <div className="w-full flex overflow-y-scroll no-scrollbar h-full space-x-2">
      <ChatSidebar />
      <ChatModule />
    </div>
  );
};

export default ChatWindow;
