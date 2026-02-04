import { RootState } from "../redux/appStore";
import { appConfig, serviceConfig } from "../env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createVideoSocket, destroyVideoSocket } from "@/lib/socketService";
import { setVideoSocketConnected, setVideoSocketDisconnected } from "../redux/slices/videoSlice";

export const connectVideoSocket = createAsyncThunk<void, void, { state: RootState }>("video/connectSocket",
    async (_, { getState, dispatch }) => {
    console.log("connectVideoSocket function calling");
    
    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const videoSocket = createVideoSocket(authUser.uid as string, serviceConfig.realtimeService+appConfig.version);
    console.log("videoSocket : ",videoSocket);
    
    videoSocket.on("connect", () => {
      dispatch(setVideoSocketConnected({ videoSocketId: videoSocket.id as string }));
    });

    // Add events like user joined, provider joined 
    // videoSocket.on("newMessage", (newMessage: Message) => {
    //     dispatch(addNewMessage(newMessage));
    // });

  }
);

export const disconnectVideoSocket = createAsyncThunk<void>("video/disconnectSocket",
  async (_, { dispatch }) => {
    console.log("disconnectVideoSocket function calling");

    destroyVideoSocket();
    dispatch(setVideoSocketDisconnected());
  }
);