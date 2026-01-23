import { useState } from "react";
import { toast } from "react-toastify";
import { Loader, Pen } from "lucide-react";
import { appConfig } from "@/utils/env";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "@/utils/interface/sliceInterface";
import avatar from '../../../assets/defaultImages/avatar.png';
import { getUploadUrl, uploadToS3 } from "@/utils/apis/s3.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { UserUpdateProfileImageResponse } from "@/utils/interface/api/userApiInterface";
import { ProviderUpdateProfileImageResponse } from "@/utils/interface/api/providerApiInterface";
import { ProfileHeaderComponentProps } from "@/utils/interface/componentInterface/commonComponentInterface";

const ProfileHead: React.FC<ProfileHeaderComponentProps> = ({
    updateProfileImageApiFunction,
    updation,
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

        if (updation && updateProfileImageApiFunction) {
            const { uploadUrl, key } = await getUploadUrl({ file: file, folder: "profiles" });
            await uploadToS3(file, uploadUrl);
            await dispatch(updateProfileImageApiFunction({ s3FileKey: key }))
                .unwrap()
                .then((res: ProviderUpdateProfileImageResponse | UserUpdateProfileImageResponse) => {
                    toast.success(res.message);
                })
                .catch((error) => {
                    if (appConfig.isDevelopment) console.error("Profile Image Upload error : ", error);
                });
        };
    };

    console.log("selectedUserData : ", selectedUserData);

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

                {(updation && profileImageUpdating) && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                        <Loader className="w-6 h-6 text-white animate-spin" />
                    </div>
                )}

                {updation && (
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