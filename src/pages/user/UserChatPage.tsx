import React from "react";
import ChatSidebar from "@/components/common/chat/ChatSideBar";
import ChatContainer from "@/components/common/chat/ChatContainer";
import { fetchProvidersForChat } from "@/utils/apis/provider";

const UserChatPage: React.FC = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar getUsers={fetchProvidersForChat} />
      <ChatContainer />
    </div>
  )
}

export default UserChatPage