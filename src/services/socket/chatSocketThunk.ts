import {
  addNewMessage,
  setLastMessage,
  setSocketConnected,
  setChatSocketDisconnected,
} from '@/app/store/slices/chatSlice';
import { RootState } from '@/app/store/appStore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatSocketEnum } from '@/shared/types/enums';
import { Message } from '@/shared/types/entity/message';
import { getChatSocket, distroyChatSocket } from '@/lib/socketService';
import { Socket } from 'socket.io-client';
import { setOnlineUsers } from '@/app/store/slices/chatSlice';

let configuredSocket: Socket | null = null;

export const connectChatSocket = createAsyncThunk<void, void, { state: RootState }>(
  'chat/connectSocket',
  async (_, { getState, dispatch }) => {
    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const socket = getChatSocket();

    if (configuredSocket !== socket) {
      socket.on(ChatSocketEnum.connect, () => {
        if (socket.id) {
          dispatch(setSocketConnected({ socketId: socket.id }));
        }
      });

      socket.on(ChatSocketEnum.disconnect, () => {
        dispatch(setChatSocketDisconnected());
        dispatch(setOnlineUsers(null));
      });

      socket.on(ChatSocketEnum.getOnlineUsers, (userIds: string[]) => {
        dispatch(setOnlineUsers(userIds));
      });

      socket.on(ChatSocketEnum.newMessage, (newMessage: Message) => {
        dispatch(addNewMessage(newMessage));
        const conversationUserId =
          newMessage.senderId === authUser.uid ? newMessage.receiverId : newMessage.senderId;
        dispatch(
          setLastMessage({
            userId: conversationUserId,
            message: newMessage.text || (newMessage.image ? 'Image' : ''),
            date: newMessage.createdAt,
          }),
        );
      });

      configuredSocket = socket;
    }

    if (!socket.connected) {
      socket.connect();
    }
  },
);

export const disconnectChatSocket = createAsyncThunk<void>(
  'chat/disconnectSocket',
  async (_, { dispatch }) => {
    distroyChatSocket();
    dispatch(setChatSocketDisconnected());
  },
);
