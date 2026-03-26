import { sendMessage } from "@/utils/apis/message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from '@/utils/interface/entityInterface/message.interface';
import { chatSliceInitalState, SelectedUser } from "@/utils/interface/sliceInterface";

const initialState: chatSliceInitalState = {
    onlineUsers: null,
    lastMessages: {},
    selectedUser: null,
    socketId: null,
    isConnected: false,
    messages: null,
    isMessagesLoading: false,
}

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        setOnlineUsers: (state, action: PayloadAction<Array<string> | null>) => {
            state.onlineUsers = action.payload;
        },
        setLastMessage: (state, action: PayloadAction<{ userId: string; message: string; date: string }>) => {
            const { userId, message, date } = action.payload;
            state.lastMessages[userId] = { message, date };
        },
        setSelectedUser: (state, action: PayloadAction<SelectedUser | null>) => {
            state.selectedUser = action.payload
        },
        setMessages: (state, action: PayloadAction<Array<Message> | null>) => {
            state.messages = action.payload;
        },
        addNewMessage: (state, action: PayloadAction<Message>) => {
            state.messages?.push(action.payload);
        },
        setSocketConnected: (state, action: PayloadAction<{ socketId: string }>
        ) => {
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
            state.messages?.push(action.payload);
        })
    }
});

export const {
    setMessages,
    addNewMessage,
    setOnlineUsers,
    setLastMessage,
    setSelectedUser,
    setSocketConnected,
    setChatSocketDisconnected
} = chatSlice.actions;
export default chatSlice.reducer;