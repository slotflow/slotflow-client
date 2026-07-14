import { fetchUsersForChat } from "@/shared/apis/user";
import ChatSidebar from "@/components/chat/ChatSideBar";
import ChatContainer from "@/components/chat/ChatContainer";

const ChatPage = () => {

    return (
        <div className="flex overflow-y-scroll no-scrollbar h-full">
            <ChatSidebar getUsers={fetchUsersForChat} />
            <ChatContainer />
        </div>
    )
}

export default ChatPage;