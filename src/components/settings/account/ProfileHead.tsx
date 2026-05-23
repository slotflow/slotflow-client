import { useState } from "react";
import { toast } from "react-toastify";
import { LoaderCircle, Pen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/shared/config/env";
import { useDispatch, useSelector } from "react-redux";
import avatar from '@/assets/defaultImages/avatar.png';
import { getUploadUrl, uploadToS3 } from "@/shared/apis/s3";
import { userUpdateProfileImage } from "@/shared/apis/user";
import { AuthState } from "@/shared/interface/sliceInterface";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { ApiBaseResponse } from "@/shared/interface/commonInterface";
import { UserUpdateProfileImageResponse } from "@/shared/interface/api/user";

const ProfileHead: React.FC = () => {

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

        try {
            const res = await getUploadUrl({ file: file, folder: "profiles" });
            if (!res.data) {
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

    return (
        <div className="w-full flex items-center gap-6 p-6 rounded-xl border bg-muted/30">
            <div className="relative group">

                <img
                    src={selectedImage || authUser?.profileImage || avatar}
                    alt="Profile"
                    className={`h-32 w-32 rounded-xl object-cover border shadow-sm transition ${profileImageUpdating ? "opacity-50" : ""
                        }`}
                />

                {profileImageUpdating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                        <LoaderCircle className="w-6 h-6 text-white animate-spin" />
                    </div>
                )}

                <Label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition rounded-xl cursor-pointer"
                >
                    <div className="opacity-0 group-hover:opacity-100 transition">
                        <div className="bg-background p-2 rounded-full shadow">
                            <Pen className="w-4 h-4 text-foreground" />
                        </div>
                    </div>
                </Label>

                <Input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={profileImageUpdating}
                />
            </div>

            <div className="flex flex-col justify-center">
                <h1 className="text-2xl md:text-3xl font-bold">
                    {authUser?.username}
                </h1>
                <p className="text-sm text-muted-foreground">
                    Click on image to update profile picture
                </p>
            </div>
        </div>
    )
}

export default ProfileHead