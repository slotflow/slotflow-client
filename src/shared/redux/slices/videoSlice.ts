import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface videoSliceInitalState {
    videoSocketId: string | null;
    isConnectedVideoSocket: boolean;
    isCameraOn: boolean;
    isMicOn: boolean;
    isVideoCallTimerRunning: boolean;
    videoCallRemainingTime: number;
    videoCallRoomId: string | null;
}

const initialState: videoSliceInitalState = {
    videoSocketId: null,
    isConnectedVideoSocket: false,
    isCameraOn: true,
    isMicOn: true,
    isVideoCallTimerRunning: false,
    videoCallRemainingTime: 0,
    videoCallRoomId: null,
}

const videoSlice = createSlice({
    name: "videoSlice",
    initialState,
    reducers: {
        setVideoSocketConnected: (state, action: PayloadAction<{ videoSocketId: string }>
        ) => {
            state.videoSocketId = action.payload.videoSocketId;
            state.isConnectedVideoSocket = true;
        },
        setVideoSocketDisconnected: (state) => {
            state.videoSocketId = null;
            state.isConnectedVideoSocket = false;
        },
        setCamera: (state, action: PayloadAction<boolean>) => {
            state.isCameraOn = action.payload;
        },
        setMic: (state, action: PayloadAction<boolean>) => {
            state.isMicOn = action.payload;
        },
        startVideoCallTimer: (state, action: PayloadAction<{ remainingTime: number, roomId: string }>) => {
            state.videoCallRemainingTime = action.payload.remainingTime;
            state.videoCallRoomId = action.payload.roomId;
            state.isVideoCallTimerRunning = true;
        },
        updateVideoCallTimer: (state) => {
            if (state.videoCallRemainingTime > 0 && state.isVideoCallTimerRunning) {
                state.videoCallRemainingTime -= 1;
            } else {
                state.isVideoCallTimerRunning = false;
            }
        },
        stopVideoCallTimer: (state, action: PayloadAction<{ remainingTime: number, roomId: string | null }>) => {
            state.isVideoCallTimerRunning = false;
            state.videoCallRemainingTime = action.payload.remainingTime;
            state.videoCallRoomId = action.payload.roomId;
        }
    }
});

export const {
    setMic,
    setCamera,
    stopVideoCallTimer,
    startVideoCallTimer,
    updateVideoCallTimer,
    setVideoSocketConnected,
    setVideoSocketDisconnected,
} = videoSlice.actions;
export default videoSlice.reducer;