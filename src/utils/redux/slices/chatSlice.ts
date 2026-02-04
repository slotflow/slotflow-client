import { sendMessage } from "@/utils/apis/message.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from '@/utils/interface/entityInterface/message.interface';

type LastMessages = Record<
    string,
    {
        message: string;
        date: string;
    }
>;

interface SelectedUser {
    _id: string;
    username: string;
    profileImage: string;
}


interface chatSliceInitalState {
    onlineUsers: string[] | null;
    lastMessages: LastMessages,
    selectedUser: SelectedUser | null,
    socketId: string | null;
    isConnected: boolean;
    messages: Message[] | null;
    isMessagesLoading: boolean;
}

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
            console.log("action.payload : ", action.payload);
            state.selectedUser = action.payload
        },
        setMessages: (state, action: PayloadAction<Array<Message> | null>) => {
            state.messages = action.payload;
        },
        addNewMessage: (state, action: PayloadAction<Message>) => {
            state.messages?.push(action.payload);
        },
        setSocketConnected: (state,action: PayloadAction<{ socketId: string }>
        ) => {
            state.socketId = action.payload.socketId;
            state.isConnected = true;
        },
        setSocketDisconnected: (state) => {
            state.socketId = null;
            state.isConnected = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.fulfilled,(state, action) => {
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
    setSocketDisconnected
} = chatSlice.actions;
export default chatSlice.reducer;