export interface Notification {
    _id: string;
    userId: string;
    title: string;
    body: string;
    pushNotification: boolean;
    isRead: boolean;
    data: Record<string, string> | null;
    createdAt: Date;
    updatedAt: Date;
}