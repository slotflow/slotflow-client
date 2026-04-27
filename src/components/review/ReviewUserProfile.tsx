import React from "react";
import noProfile from "../../assets/defaultImages/avatar.png";
import { ReviewUserProfileProps } from "@/shared/interface/componentInterface";

const ReviewUserProfile: React.FC<ReviewUserProfileProps> = ({
    profileImage,
    username,
    text
}) => {
    return (
        <div className="flex items-center gap-3 border-t pt-3 mt-3">
            <img
                src={profileImage ?? noProfile}
                alt="user"
                className="size-10 rounded-full object-cover"
            />
            <div className="text-sm">
                <p className="font-medium">{text}</p>
                <p className="text-muted-foreground">
                    {username}
                </p>
            </div>
        </div>
    );
};

export default ReviewUserProfile;