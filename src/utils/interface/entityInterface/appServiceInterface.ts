// Application services creating by admin
export interface Service {
    _id: string;
    serviceName: string;
    serviceCategory: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}