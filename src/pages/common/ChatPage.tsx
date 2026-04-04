import { useSelector } from "react-redux";
import { Role } from "@/utils/interface/enums";
import { RootState } from "@/utils/redux/appStore";
import { fetchUsersForChat } from "@/utils/apis/user";
import { fetchProvidersForChat } from "@/utils/apis/provider";
import ChatSidebar from "@/components/common/chat/ChatSideBar";
import ChatContainer from "@/components/common/chat/ChatContainer";

const ChatPage = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    
    return (
        <div className="flex overflow-y-scroll no-scrollbar h-full">
            <ChatSidebar getUsers={authUser?.role === Role.USER ? fetchProvidersForChat : fetchUsersForChat} />
            <ChatContainer />
        </div>
    )
}

export default ChatPage;