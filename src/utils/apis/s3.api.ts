import axios from "axios";
import { axiosInstance } from "@/lib/axios";
import { ApiBaseResponse } from "../interface/commonInterface";

export const getUploadUrl = async (
  data: { file: File; folder: string }
) => {
  const apiData = {
        fileName: data.file.name,
        fileType: data.file.type,
        folderName: data.folder,
  };
  const response = await axiosInstance.get("/s3/presigned-upload-url",{
    params: apiData,
  });
  return response.data.data;
};

export const getSignedUrl = async (s3FileKey: string): Promise<string> => {
  const response = await axiosInstance.get("/s3/file/presigned-get-url", {
    params: { s3FileKey },
  });
  return response.data.data;
};

export const deleteUserFileFromS3 = async (
  folder: string,
): Promise<ApiBaseResponse> => {
  const response = await axiosInstance.delete("/s3/file", {
    data: { folder },
  });
  return response.data;
};

export const uploadToS3 = async (file: File, uploadUrl: string) => {
  await axios.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};