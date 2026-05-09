import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/shared/config/env';
import AlertBox from '@/components/alert/AlertBox';
import { AppDispatch } from '@/shared/redux/appStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getUploadUrl, uploadToS3 } from '@/shared/apis/s3';
import { ArrowUp, Check, Info, Loader, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import noImage from '../../../assets/defaultImages/imagePlaceholder.png';
import { FileUploaderProps } from '@/shared/interface/componentInterface';
import { ImageFileFormType, imageFileZodeSchema } from '@/shared/zod/providerZod';
import { defaultButtonClassName } from '@/shared/utils/constants';

const FileUploader: React.FC<FileUploaderProps> = ({
    folderName,
    uploadFunction,
    message,
    setStateFunction,
    deleteFunction,
    data,
    title
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        setValue,
        watch,
        reset
    } = useForm<ImageFileFormType>({
        resolver: zodResolver(imageFileZodeSchema),
        defaultValues: {
            file: undefined,
        },
    });

    const proofFile = watch("file");

    // handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setValue("file", file, { shouldValidate: true });
        }
    };

    // handle submit
    const onSubmit: SubmitHandler<ImageFileFormType> = async (data) => {
        const file = data.file;
        if (!file) return;

        try {
            dispatch(setStateFunction({
                file: null,
                isLoading: true,
            }));
            const uploadRes = await getUploadUrl({ file: file, folder: folderName });
            if (!uploadRes.data) {
                throw new Error("Failed to get upload URL");
            }
            const { uploadUrl, key } = uploadRes.data;
            await uploadToS3(file, uploadUrl);
            const res = await uploadFunction({ field: "identityProof", s3FileKey: key });
            if (!res.data) {
                throw new Error("Failed to update proof with uploaded file");
            }
            if (res.success) {
                toast.success("Proofs uploaded successfully!");
                dispatch(setStateFunction({
                    file: res.data,
                    isLoading: false,
                }));
                setSelectedImage(null);
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.error("Upload error:", error);
            }
            toast.error("Upload failed! Please try again.");
        }
    };

    // handle delete file
    const handleDeleteFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            dispatch(setStateFunction({
                isLoading: true,
            }));
            const res = await deleteFunction();
            if (res.success) {
                toast.success("File deleted successfully!");
                dispatch(setStateFunction({
                    file: null,
                    isLoading: false,
                }));
                setSelectedImage(null);
                reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        } catch (error) {
            if (appConfig.isDevelopment) {
                console.error("Deletion error:", error);
            }
            toast.error("Deletion failed! Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 space-y-4">
                    <Label className="text-sm font-medium">
                        {title} <span className="text-red-500">*</span>
                    </Label>
                    {!data.file ? (
                        <Input
                            ref={fileInputRef}
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

                    {selectedImage && (
                        <div className="space-y-3">

                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Selected File
                                </h4>

                                <Button
                                    title="Remove file"
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:bg-red-100 hover:text-red-600"
                                    disabled={data.isLoading}
                                    onClick={() => {
                                        setSelectedImage(null);
                                        reset();
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}
                                >
                                    <X className="size-4" />
                                </Button>
                            </div>

                            <div className="relative w-full h-48 rounded-xl border overflow-hidden bg-muted">

                                {!data.isLoading ? (
                                    <img
                                        src={selectedImage ?? noImage}
                                        alt="Proof Preview"
                                        className="w-full h-full object-contain transition-opacity duration-300"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/60 backdrop-blur-sm">

                                        {data.file ? (
                                            <Loader className="animate-spin size-5 text-muted-foreground" />
                                        ) : (
                                            <ArrowUp className="animate-bounce size-5 text-muted-foreground" />
                                        )}

                                        <p className="text-sm text-muted-foreground">
                                            {data.file ? "Deleting file..." : "Processing file..."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {data.file && (
                        <>
                            <h5>Uploaded File</h5>
                            {!data.isLoading ? (
                                <img
                                    src={data.file ?? noImage}
                                    alt="Proof Preview"
                                    className="w-full h-48 object-contain rounded-xl border"
                                />
                            ) : (
                                <div className='w-full h-48 shimmer'></div>
                            )}
                        </>
                    )}

                    {message && (
                        <AlertBox
                            icon={Info}
                            heading={"Important"}
                            message={message}
                        />
                    )}
                </CardContent>
                <CardFooter className='flex justify-end'>
                    {data.file ? (
                        <Button
                            title="Delete File"
                            type="button"
                            variant="destructive"
                            className='cursor-pointer'
                            onClick={handleDeleteFile}
                        >
                            Delete File
                        </Button>
                    ) : proofFile && (
                        <Button
                            title="Upload"
                            variant="secondary"
                            disabled={isSubmitting || !isValid}
                            className={defaultButtonClassName}
                            type="submit"
                        >
                            {isSubmitting ? "Uploading" : "Upload File"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </form>
    );
};

export default FileUploader;
