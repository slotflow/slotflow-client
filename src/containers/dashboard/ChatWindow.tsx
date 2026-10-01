import ChatSidebar from '@/components/chat/ChatSideBar';
import ChatModule from '@/components/chat/ChatModule';

const ChatWindow = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar />
      <ChatModule />
    </div>
  );
};

export default ChatWindow;
