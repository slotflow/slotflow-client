import { useState } from "react";
import { toast } from "react-toastify";
import { Loader, Pen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/shared/config/env";
import { useDispatch, useSelector } from "react-redux";
import avatar from '../../assets/defaultImages/avatar.png';
import { getUploadUrl, uploadToS3 } from "@/shared/apis/s3";
import { userUpdateProfileImage } from "@/shared/apis/user";
import { AuthState } from "@/shared/interface/sliceInterface";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { ProfileHeaderProps } from "@/shared/interface/componentInterface";
import { UserUpdateProfileImageResponse } from "@/shared/interface/api/user";

const ProfileHead: React.FC<ProfileHeaderProps> = ({
    canUpdate,
    showDetails,
    isMyProfile,
    selectedUserData
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const { authUser, profileImageUpdating }: AuthState = useSelector((store: RootState) => store.auth);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);

        const formData = new FormData();
        formData.append("profileImage", file);

        if (canUpdate) {
            try {
                const res = await getUploadUrl({ file: file, folder: "profiles" });
                if(!res.data) {
                    throw new Error("Failed to get upload URL");
                }
                const { uploadUrl, key } = res.data;
                await uploadToS3(file, uploadUrl);
                await dispatch(userUpdateProfileImage({ s3FileKey: key }))
                .unwrap()
                .then((res: ApiBaseResponse<UserUpdateProfileImageResponse>) => {
                    toast.success(res.message);
                })
                .catch((error) => {
                    if (appConfig.isDevelopment) console.error("Profile Image Upload error : ", error);
                });
            } catch (error) {
                if (appConfig.isDevelopment) console.error("Error getting upload URL : ", error);
                toast.error("Failed to upload image. Please try again.");
                return;
            }
        };
    };

    const profileImage = isMyProfile
        ? authUser?.profileImage
        : selectedUserData?.selectedUserProfileImage || authUser?.profileImage;

    const username = isMyProfile
        ? authUser?.username
        : selectedUserData?.selectedUserName || authUser?.username;

    return (
        <div className={`w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)] rounded-[6px]`}>
            <div className="relative">

                <img
                    className={`h-32 w-32 object-cover rounded-lg transition-opacity ${profileImageUpdating ? "opacity-50" : "opacity-100"}`}
                    src={selectedImage || profileImage || avatar}
                    alt="Profile"
                />

                {(canUpdate && profileImageUpdating) && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                        <Loader className="w-6 h-6 text-white animate-spin" />
                    </div>
                )}

                {canUpdate && (
                    <Label
                        htmlFor="avatar-upload"
                        className={`absolute bottom-0 right-0 bg-black opacity-40 bg-base-content hover:scale-105 p-2 cursor-pointer transition-all duration-200 ${profileImageUpdating ? "cursor-not-allowed opacity-30" : "opacity-100"}`}
                    >
                        <Pen className="w-5 h-5 text-white" />
                        <Input
                            type="file"
                            id="avatar-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={profileImageUpdating}
                        />
                    </Label>
                )}

            </div>
            {showDetails && (
                <div className="flex flex-col justify-center ml-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{username}</h1>
                    <p>
                        {isMyProfile ? "Experience the seamless booking with us" : authUser?.serviceDescription ? "Empowering the world with seamless services through Slotflow" : "Empowering the world with seamless services through Slotflow"}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProfileHead