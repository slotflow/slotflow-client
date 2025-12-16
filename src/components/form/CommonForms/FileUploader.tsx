import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Check, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/utils/redux/appStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getUploadUrl, uploadToS3 } from '@/utils/apis/s3.api';
import NotificationBox from '@/components/common/NotificationBox';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ImageFileFormType, imageFileZodeSchema } from '@/utils/zod/providerZod';
import { FileUploaderProps } from '@/utils/interface/componentInterface/commonComponentInterface';

const FileUploader: React.FC<FileUploaderProps> = ({
    folderName,
    uploadFunction,
    message,
    setStateFunction,
    setLoadingFunction,
    fileUploaded,
    deleteFunction,
    loading,
    data,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        setValue,
        watch,
    } = useForm<ImageFileFormType>({
        resolver: zodResolver(imageFileZodeSchema),
        defaultValues: {
            file: undefined,
        },
    });

    const proofFile = watch("file");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setValue("file", file, { shouldValidate: true });
        }
    };

    const onSubmit: SubmitHandler<ImageFileFormType> = async (data) => {
        const file = data.file;
        if (!file) return;

        try {
            dispatch(setLoadingFunction(true));
            const { uploadUrl, key } = await getUploadUrl({ file: file, folder: folderName });
            await uploadToS3(file, uploadUrl);
            const res = await uploadFunction({ field: "identityProof", s3FileKey: key });
            if (res.success) {
                toast.success("Proofs uploaded successfully!");
                dispatch(setStateFunction(res.data));
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error("Upload error:", error);
            toast.error("Upload failed! Please try again.");
        } finally {
            dispatch(setLoadingFunction(false));
        }
    };

    const handleDeleteFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            dispatch(setLoadingFunction(true));
            const res = await deleteFunction();
            if (res.success) {
                toast.success("File deleted successfully!");
                dispatch(setStateFunction(null));
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error("Deletion error:", error);
            toast.error("Deletion failed! Please try again.");
        } finally {
            dispatch(setLoadingFunction(false));
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 space-y-4">
                    <Label className="font-medium">
                        Identity Proof <span className="text-red-500">*</span>
                    </Label>
                    {!fileUploaded ? (
                        <Input
                            type="file"
                            id="file"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                        />
                    ) : (
                        <h6 className='flex justify-center'><Check className="mx-2" /> File Uploaded </h6>
                    )}

                    {errors.file && (
                        <p className="text-red-500 text-sm">
                            {errors.file.message || "Identity proof is required."}
                        </p>
                    )}

                    {(selectedImage) && (
                        <>
                            <h5>Selected File</h5>
                            {!loading ? (
                                <img
                                    src={selectedImage}
                                    alt="Proof Preview"
                                    className="w-full h-48 object-contain rounded-xl border"
                                />
                            ) : (
                                <div className='w-full h-48 shimmer'></div>
                            )
                            }
                        </>
                    )}

                    {data && (
                        <>
                            <h5>Uploaded File</h5>
                            {!loading ? (
                                <img
                                    src={data}
                                    alt="Proof Preview"
                                    className="w-full h-48 object-contain rounded-xl border"
                                />
                            ) : (
                                <div className='w-full h-48 shimmer'></div>
                            )
                            }
                            <Button
                                type="button"
                                variant="destructive"
                                className='cursor-pointer'
                                onClick={handleDeleteFile}
                            >
                                Delete File
                            </Button>
                        </>
                    )}

                    {message && (
                        <NotificationBox
                            icon={Info}
                            heading={"Important"}
                            message={message}
                        />
                    )}
                </CardContent>
                {(!fileUploaded && proofFile) && (
                    <CardFooter className='flex justify-end'>
                        <Button
                            variant="outline"
                            disabled={isSubmitting || !isValid}
                            className="cursor-pointer w-auto text-xs md:text-sm hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                            type="submit"
                        >
                            {isSubmitting ? "Uploading" : "Upload"}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </form>
    );
};

export default FileUploader;
