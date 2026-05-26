import { RootState } from "../redux/appStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatSocket, distroyChatSocket } from "@/lib/socketService";
import { Message } from "../interface/entityInterface/message.interface";
import { addNewMessage, setChatSocketDisconnected, setSocketConnected } from "../redux/slices/chatSlice";

export const connectChatSocket = createAsyncThunk<void, void, { state: RootState }>("chat/connectSocket",
  async (_, { getState, dispatch }) => {

    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const socket = getChatSocket();

    socket.on("connect", () => {
      dispatch(setSocketConnected({ socketId: socket.id as string }));
    });

    socket.on("newMessage", (newMessage: Message) => {
      dispatch(addNewMessage(newMessage));
    });

  }
);

export const disconnectChatSocket = createAsyncThunk<void>("chat/disconnectSocket",
  async (_, { dispatch }) => {
    distroyChatSocket();
    dispatch(setChatSocketDisconnected());
  }
);