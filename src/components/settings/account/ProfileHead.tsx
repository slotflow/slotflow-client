import { useState } from 'react';
import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '@/assets/defaultImages/avatar.png';
import { ApiBaseResponse } from '@/shared/types/common';
import { Card, CardContent } from '@/components/ui/card';
import { getUploadUrl, uploadToS3 } from '@/services/apis/s3';
import { userUpdateProfileImage } from '@/services/apis/user';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { LoaderCircle, Pen, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserUpdateProfileImageResponse } from '@/shared/types/api/user';

const ProfileHead = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const [profileImageUpdating, setProfileImageUpdating] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    const formData = new FormData();
    formData.append('profileImage', file);
    setProfileImageUpdating(true);

    try {
      const res = await getUploadUrl({ file: file, folder: 'profiles' });
      if (!res.data) {
        throw new Error('Failed to get upload URL');
      }
      const { uploadUrl, key } = res.data;
      await uploadToS3(file, uploadUrl);
      await dispatch(userUpdateProfileImage({ s3FileKey: key }))
        .unwrap()
        .then((res: ApiBaseResponse<UserUpdateProfileImageResponse>) => {
          toast.success(res.message);
        })
        .catch((error) => {
          if (appConfig.isDevelopment) console.error('Profile Image Upload error : ', error);
        });
    } catch (error) {
      if (appConfig.isDevelopment) console.error('Error getting upload URL : ', error);
      toast.error('Failed to upload image. Please try again.');
      return;
    } finally {
      setProfileImageUpdating(false);
    }
  };

  return (
    <Card className="rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-muted/10 shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 group-hover:opacity-60 blur-md transition duration-300" />

            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden border-2 border-background shadow-md">
              <img
                src={selectedImage || authUser?.profileImage || avatar}
                alt="Profile"
                className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  profileImageUpdating ? 'opacity-40 filter blur-xs' : ''
                }`}
              />

              {profileImageUpdating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs text-white">
                  <LoaderCircle className="w-7 h-7 animate-spin text-indigo-400 mb-1" />
                  <span className="text-[10px] font-medium tracking-wider uppercase text-slate-200">
                    Updating
                  </span>
                </div>
              )}

              {!profileImageUpdating && (
                <Label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer backdrop-blur-[2px]"
                >
                  <div className="bg-white/90 dark:bg-slate-900/90 text-foreground p-2.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <Pen className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-white mt-1.5 drop-shadow-sm">
                    Change Photo
                  </span>
                </Label>
              )}
            </div>

            <div className="absolute -bottom-1 -right-1 bg-indigo-600 dark:bg-indigo-500 border-2 border-background p-1.5 rounded-full text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <Input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={profileImageUpdating}
            />
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {authUser?.username || 'User Profile'}
              </h1>
              {authUser?.email && (
                <Badge variant="secondary" className="gap-1 font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/50">
                  <CheckCircle2 className="w-3 h-3 text-indigo-500" /> Verified
                </Badge>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
              <span>Hover over your photo to upload a new profile picture.</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHead;