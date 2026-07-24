import defaultProfileImg from '../../assets/defaultImages/avatar.png';
import { ChatBubbleProfileImageProps } from '@/shared/interface/componentInterface';

const ChatBubbleProfileImage = ({
    profileImage
}: ChatBubbleProfileImageProps) => {
    return (
        <div className="chat-image">
            <img
                src={profileImage ?? defaultProfileImg}
                className="size-6 md:size-8 rounded-full border object-cover"
                alt="profile pic"
            />
        </div>
    )
}

export default ChatBubbleProfileImage