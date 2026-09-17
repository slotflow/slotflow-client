export interface Notification {
  _id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  data: Record<string, string> | null;
  createdAt: Date;
  updatedAt: Date;
}
