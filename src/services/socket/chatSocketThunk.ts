import {
  addNewMessage,
  setSocketConnected,
  setChatSocketDisconnected,
} from '@/app/store/slices/chatSlice';
import { RootState } from '@/app/store/appStore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message } from '@/shared/types/entity/message';
import { getChatSocket, distroyChatSocket } from '@/lib/socketService';

export const connectChatSocket = createAsyncThunk<void, void, { state: RootState }>(
  'chat/connectSocket',
  async (_, { getState, dispatch }) => {
    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const socket = getChatSocket();

    socket.on('connect', () => {
      dispatch(setSocketConnected({ socketId: socket.id as string }));
    });

    socket.on('newMessage', (newMessage: Message) => {
      dispatch(addNewMessage(newMessage));
    });
  },
);

export const disconnectChatSocket = createAsyncThunk<void>(
  'chat/disconnectSocket',
  async (_, { dispatch }) => {
    distroyChatSocket();
    dispatch(setChatSocketDisconnected());
  },
);
