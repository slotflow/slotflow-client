import UserProfileTopCard from "./userProfileCards/UserProfileTopCard";
import { UserProfileProps } from "@/shared/interface/componentInterface";

const UserProfile = ({
    username,
    profileImage,
    address,
    profile
}: UserProfileProps) => {
    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <UserProfileTopCard
                        name={username}
                        image={profileImage}
                    />
                    {profile}
                </div>
                <div className="space-y-6">
                    {address}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;