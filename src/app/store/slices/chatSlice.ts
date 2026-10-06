import { getMessages, sendMessage } from '@/services/apis/message';
import { Message } from '@/shared/types/entity/message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chatSliceInitalState, SelectedUser } from '@/shared/types/slice';

const updateLastMessage = (
  state: chatSliceInitalState,
  userId: string,
  message: string,
  date: string,
) => {
  const currentLastMessage = state.lastMessages?.[userId];
  if (currentLastMessage && Date.parse(currentLastMessage.date) > Date.parse(date)) {
    return;
  }

  state.lastMessages ??= {};
  state.lastMessages[userId] = { message, date };
};

const getMessagePreview = (message: Message) =>
  message.text || (message.image ? 'Image' : '');

const initialState: chatSliceInitalState = {
  onlineUsers: null,
  lastMessages: null,
  selectedUser: null,
  socketId: null,
  isConnected: false,
  messages: null,
  isMessagesLoading: false,
};

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<Array<string> | null>) => {
      state.onlineUsers = action.payload;
    },
    setLastMessage: (
      state,
      action: PayloadAction<{ userId: string; message: string; date: string }>,
    ) => {
      const { userId, message, date } = action.payload;
      updateLastMessage(state, userId, message, date);
    },
    setSelectedUser: (state, action: PayloadAction<SelectedUser | null>) => {
      state.selectedUser = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<Message>) => {
      if (state.messages) {
        state.messages.push(action.payload);
      } else {
        state.messages = [action.payload];
      }
    },
    setSocketConnected: (state, action: PayloadAction<{ socketId: string }>) => {
      state.socketId = action.payload.socketId;
      state.isConnected = true;
    },
    setChatSocketDisconnected: (state) => {
      state.socketId = null;
      state.isConnected = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const message = action.payload.data;
      if (message) {
        if (state.messages) {
          state.messages.push(message);
        } else {
          state.messages = [message];
        }
        updateLastMessage(
          state,
          action.meta.arg.selectedUserId,
          getMessagePreview(message),
          message.createdAt,
        );
      }
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      const messages = action.payload.data;
      if (messages) {
        if (state.messages) {
          state.messages.push(...messages);
        } else {
          state.messages = messages;
        }

        const latestMessage = messages.reduce<Message | null>(
          (latest, message) =>
            !latest || Date.parse(message.createdAt) > Date.parse(latest.createdAt)
              ? message
              : latest,
          null,
        );

        if (latestMessage) {
          updateLastMessage(
            state,
            action.meta.arg.selectedUserId,
            getMessagePreview(latestMessage),
            latestMessage.createdAt,
          );
        }
      }
    });
  },
});

export const {
  addNewMessage,
  setOnlineUsers,
  setLastMessage,
  setSelectedUser,
  setSocketConnected,
  setChatSocketDisconnected,
} = chatSlice.actions;
export default chatSlice.reducer;
