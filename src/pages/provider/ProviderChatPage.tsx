import React from 'react';
import ChatSidebar from '@/components/common/chat/ChatSideBar';
import ChatContainer from '@/components/common/chat/ChatContainer';
import { fetchUsersForChat } from '@/utils/apis/user';

const ProviderChatPage: React.FC = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full rounded-md">
      <ChatSidebar getUsers={fetchUsersForChat} />
      <ChatContainer />
    </div>
  )
}

export default ProviderChatPage