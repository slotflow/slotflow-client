export type NotificationType =
  | 'account_activity'
  | 'system_updates'
  | 'promotional_updates';
  
export interface Notification {
  _id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  type: NotificationType;
  data: Record<string, string> | null;
  createdAt: Date;
  updatedAt: Date;
}
