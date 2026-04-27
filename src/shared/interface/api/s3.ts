// Request interfaces for S3 upload operations
export interface GetUploadUrlRequest {
    file: File; 
    folder: string;
}

// Response interface for getting a presigned upload URL from the server
export interface GetUploadUrlResponse {
    key: string; 
    uploadUrl: string;
}