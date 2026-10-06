import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { getInitials } from '@/shared/utils/helper/getInitials';
import { PredefinedSize, ProfileImageProps } from '@/shared/types/component';
import { roundedClasses, sizeClasses } from '@/shared/utils/constants/styleConstants';

const ProfileImage = ({
    name,
    profileImage,
    size = 'md',
    rounded = 'md',
    textSize,
    isLoading = false,
    isUpdating = false,
    updatingText = 'Updating',
    className = '',
    imgClassName = '',
}: ProfileImageProps) => {
    const [hasError, setHasError] = useState(false);

    const isPredefinedSize = size in sizeClasses;
    const sizeConfig = isPredefinedSize ? sizeClasses[size as PredefinedSize] : null;

    const boxSizeClass = sizeConfig ? sizeConfig.box : size;
    const roundedClass = roundedClasses[rounded] ?? 'rounded-md';
    const textFontClass = textSize || (sizeConfig ? sizeConfig.text : 'text-sm');

    if (isLoading) {
        return (
            <div
                className={`shrink-0 bg-muted animate-pulse ${boxSizeClass} ${roundedClass} ${className}`}
            />
        );
    }

    const showImage = Boolean(profileImage) && !hasError;

    return (
        <div
            className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-primary text-primary-foreground font-semibold uppercase select-none ${boxSizeClass} ${roundedClass} ${className}`}
        >
            {showImage ? (
                <img
                    src={profileImage!}
                    alt={name}
                    className={`h-full w-full object-cover transition-transform duration-300 ${isUpdating ? 'opacity-40 filter blur-xs' : ''
                        } ${imgClassName}`}
                    onError={() => setHasError(true)}
                />
            ) : (
                <span className={textFontClass}>{getInitials(name)}</span>
            )}

            {isUpdating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs text-white z-10">
                    <LoaderCircle className="w-6 h-6 animate-spin text-indigo-400 mb-1" />
                    <span className="text-[10px] font-medium tracking-wider uppercase text-slate-200">
                        {updatingText}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfileImage;