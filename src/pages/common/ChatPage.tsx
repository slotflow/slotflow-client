import { useSelector } from "react-redux";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import { fetchUsersForChat } from "@/shared/apis/user";
import { fetchProvidersForChat } from "@/shared/apis/provider";
import ChatSidebar from "@/components/chat/ChatSideBar";
import ChatContainer from "@/components/chat/ChatContainer";

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