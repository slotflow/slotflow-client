// request type of get upload url api
export interface GetUploadUrlRequest {
    file: File; 
    folder: string;
}

// response type of get upload url api
export interface GetUploadUrlResponse {
    key: string; 
    uploadUrl: string;
}