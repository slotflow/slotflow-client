import { chatAxiosInstance } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMessages } from '@/app/store/slices/chatSlice';
import { ApiBaseResponse } from '../../shared/types/common';
import { Message } from '../../shared/types/entity/message';

export const getMessages = createAsyncThunk<
  ApiBaseResponse<Array<Message>>,
  { selectedUserId: string }
>('message/getMessages', async ({ selectedUserId }, thunkAPI) => {
  const response = await chatAxiosInstance.get(`/message/${selectedUserId}`);
  if (response.data.success) {
    thunkAPI.dispatch(setMessages(response.data));
  }
  return thunkAPI.rejectWithValue('Failed to fetch messages');
});

export const sendMessage = createAsyncThunk<
  ApiBaseResponse<Message>,
  { selectedUserId: string; messageData: FormData }
>('messages/sendMessage', async ({ selectedUserId, messageData }, thunkAPI) => {
  const response = await chatAxiosInstance.post(`/message/send/${selectedUserId}`, messageData);
  if (response.data.success) {
    return response.data;
  }
  return thunkAPI.rejectWithValue('Failed to send message');
});
