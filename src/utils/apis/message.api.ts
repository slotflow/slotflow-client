import { RootState } from "../redux/appStore";
import { chatAxiosInstance } from "@/lib/axios";
import { appConfig, serviceConfig } from "../env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectSocket, disconnectSocket } from "@/lib/socketService";
import { Message } from "../interface/entityInterface/message.interface";
import { addNewMessage, setMessages, setSocketConnected, setSocketDisconnected } from "../redux/slices/chatSlice";

export const getMessages = createAsyncThunk<Array<Message>, { selectedUserId: string }>('message/getMessages',
    async ({ selectedUserId }, thunkAPI) => {
        const response = await chatAxiosInstance.get(`/message/${selectedUserId}`);
        if (response.data.success) {
          console.log("messages : ",response.data.data);
            const messages: Message[] = response.data.data;
            thunkAPI.dispatch(setMessages(messages));
        }
        return thunkAPI.rejectWithValue("Failed to fetch messages");
    }
);

export const sendMessage = createAsyncThunk<Message,{ selectedUserId: string, messageData: FormData}>('messages/sendMessage',
    async ({ selectedUserId, messageData }, thunkAPI) => {
        const response = await chatAxiosInstance.post(`/message/send/${selectedUserId}`, messageData);
        if (response.status === 200) {
            const message: Message = response.data.data;
            console.log("message : ",message);
            return message;
        }
        return thunkAPI.rejectWithValue("Failed to send message");
    }
)


export const connectChatSocket = createAsyncThunk<void, void, { state: RootState }>("chat/connectSocket",
  async (_, { getState, dispatch }) => {

    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const socket = connectSocket(authUser.uid as string, serviceConfig.realtimeService+appConfig.version+"/chat");
    
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
    disconnectSocket();
    dispatch(setSocketDisconnected());
  }
);