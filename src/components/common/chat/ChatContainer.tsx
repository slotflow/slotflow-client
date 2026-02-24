import ChatHeader from "./ChatHeader";
import { Ellipsis } from "lucide-react";
import MessageInput from "./MessageInput";
import { socket } from "@/lib/socketService";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/utils/apis/message.api";
import React, { useEffect, useRef, useState } from "react";
import ChatBubbleProfileImage from "./ChatBubbleProfileImage";
import { formatTo24HourTime } from "@/utils/helper/formatter";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { Message } from "@/utils/interface/entityInterface/message.interface";
import NoChatSelectedSShimmer from "@/components/shimmers/NoChatSelectedSShimmer";
import { connectChatSocket, disconnectChatSocket } from "@/utils/socket/chatSocketThunk";

interface SocketDataInterface {
    fromUserId: Message["senderId"];
    toUserId: Message["receiverId"];
}

const ChatContainer: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [messageSenderId, setMessageSenderId] = useState<string | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const { selectedUser, messages, isMessagesLoading } = useSelector((store: RootState) => store.chat);
    const { authUser } = useSelector((store: RootState) => store.auth);

    useEffect(() => {
        if (!selectedUser || !authUser) return;
        
        dispatch(connectChatSocket());
        dispatch(getMessages({ selectedUserId: selectedUser._id }));

        return () => {
            dispatch(disconnectChatSocket());
        };
    }, [dispatch, selectedUser, authUser]);

    useEffect(() => {
        if (messageEndRef.current && (messages || isTyping)) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (!socket || !authUser) return;

        socket.on("typing", (socketData: SocketDataInterface) => {
            const { fromUserId, toUserId } = socketData;
            if (fromUserId === selectedUser?._id && toUserId === authUser.uid) {
                setMessageSenderId(fromUserId);
                setIsTyping(true);
            }
        });

        socket.on("stopTyping", (socketData: SocketDataInterface) => {
            const { fromUserId, toUserId } = socketData;
            if (fromUserId === selectedUser?._id && toUserId === authUser.uid) {
                setIsTyping(false);
                setMessageSenderId(fromUserId);
            }
        });

        return () => {
            socket?.off("typing");
            socket?.off("stopTyping");
        };
    }, [socket, selectedUser]);

    if (!selectedUser) return <NoChatSelectedSShimmer className="w-9/12" />;

    return (
        <div className="w-full md:w-8/12 flex flex-col overflow-auto border-r  mt-5 md:mt-0 boder-2">
            <ChatHeader />
            {isMessagesLoading ? (
                <NoChatSelectedSShimmer className="w-full" />
            ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages?.map((message, index) => (
                        <div key={index}
                            className={`flex ${message.senderId === authUser?.uid ? "justify-end" : "justify-start"}`}
                            ref={messageEndRef}
                        >
                           
                            {message.senderId !== authUser?.uid && (
                               <ChatBubbleProfileImage profileImage={selectedUser.profileImage || "/user_avatar.jpg"} />
                           )}

                            <div className={`flex flex-col rounded-md bg-[var(--menuItemHoverBg)] px-4 py-1 max-w-8/12 ${message.senderId !== authUser?.uid ? "ml-3" : "mr-3"}`}>
                                {message.image && (
                                    <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                )}
                                {message.text && (
                                    <p className="text-[13px] md:text-[15px]">{message.text}</p>
                                )}
                                <time className="text-[10px] opacity-50 ml-auto">
                                    {formatTo24HourTime(message.createdAt)}
                                </time>
                            </div>

                                {message.senderId === authUser?.uid && (
                                    <ChatBubbleProfileImage profileImage={authUser?.profileImage || "/user_avatar.jpg"} />
                                )}

                        </div>
                    ))}
                </div>
            )}

            {isTyping && authUser?.uid !== messageSenderId && (
                <div className="px-4 pb-2 flex">
                    <div className="justify-start rounded-md bg-[var(--menuItemHoverBg)] px-4 py-2">
                        <div className="chat-bubble flex rounded-md justify-center items-center">
                            <p className="text-[13px] md:text-[15px]">Typing</p>
                            <Ellipsis className="animate-ping" />
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

export default ChatContainer;
