export interface CommonChannelPreferences {
  email: boolean;
  push: boolean;
  inapp: boolean;
  sms: boolean;
}

export interface NotificationPreference {
  _id: string;
  userId: string;
  accountActivity: CommonChannelPreferences;
  systemUpdates: CommonChannelPreferences;
  promotionalUpdates: CommonChannelPreferences;
  createdAt: Date;
  updatedDate: Date;
}
