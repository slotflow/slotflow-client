import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSlice } from '@/shared/interface/sliceInterface';
import { UpdateNotificationPreferenceResponse } from '@/shared/interface/api/notification';


const initialState: NotificationSlice = {
  preferences: [
    {
      channel: 'email',
      preferences: {
        appointment_updates: true,
        appointment_reminders: true,
        payment_notifications: true,
        account_activity: true,
        promotional_updates: true,
      },
    },

    {
      channel: 'push',
      preferences: {
        new_appointments: true,
        appointment_reminders: true,
        appointment_changes: true,
        payment_activity: true,
      },
    },

    {
      channel: 'in_app',
      preferences: {
        appointment_updates: true,
        payment_activity: true,
        system_updates: true,
        promotional_updates: true,
      },
    },
  ],
};

const notificationSlice = createSlice({
  name: 'notification',

  initialState,

  reducers: {
    setNotificationPreference: (
      state,
      action: PayloadAction<UpdateNotificationPreferenceResponse>,
    ) => {
      const { channel, type, enabled } = action.payload;

      const channelPreference = state.preferences.find(
        (item) => item.channel === channel,
      );

      if (!channelPreference) {
        return;
      }

      channelPreference.preferences[type] = enabled;
    },
  },
});

export const {
  setNotificationPreference,
} = notificationSlice.actions;

export default notificationSlice.reducer;