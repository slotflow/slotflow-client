import { chatAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessages } from "../redux/slices/chatSlice";
import { Message } from "../interface/entityInterface/message.interface";

export const getMessages = createAsyncThunk<Array<Message>, { selectedUserId: string }>('message/getMessages',
  async ({ selectedUserId }, thunkAPI) => {
    const response = await chatAxiosInstance.get(`/message/${selectedUserId}`);
    if (response.data.success) {
      console.log("messages : ", response.data.data);
      const messages: Message[] = response.data.data;
      thunkAPI.dispatch(setMessages(messages));
    }
    return thunkAPI.rejectWithValue("Failed to fetch messages");
  }
);

export const sendMessage = createAsyncThunk<Message, { selectedUserId: string, messageData: FormData }>('messages/sendMessage',
  async ({ selectedUserId, messageData }, thunkAPI) => {
    const response = await chatAxiosInstance.post(`/message/send/${selectedUserId}`, messageData);
    if (response.status === 200) {
      const message: Message = response.data.data;
      console.log("message : ", message);
      return message;
    }
    return thunkAPI.rejectWithValue("Failed to send message");
  }
)