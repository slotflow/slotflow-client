import React from 'react';

interface ChatBubbleProfileImageProps {
    profileImage: string;
}

const ChatBubbleProfileImage: React.FC<ChatBubbleProfileImageProps> = ({
    profileImage = "/user_avatar.jpg"
}) => {
    return (
        <div className="chat-image">
            <img
                src={profileImage}
                className="size-6 md:size-8 rounded-full border object-cover"
                alt="profile pic"
            />
        </div>
    )
}

export default ChatBubbleProfileImage