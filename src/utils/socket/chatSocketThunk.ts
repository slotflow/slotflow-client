import { RootState } from "../redux/appStore";
import { appConfig, serviceConfig } from "../env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "../interface/entityInterface/message.interface";
import { createChatSocket, distroyChatSocket } from "@/lib/socketService";
import { addNewMessage, setChatSocketDisconnected, setSocketConnected } from "../redux/slices/chatSlice";

export const connectChatSocket = createAsyncThunk<void, void, { state: RootState }>("chat/connectSocket",
  async (_, { getState, dispatch }) => {

    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const socket = createChatSocket(authUser.uid as string, serviceConfig.apiGatewayUrl + appConfig.version + "/chat");

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