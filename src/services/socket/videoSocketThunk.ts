import { RootState } from '@/app/store/appStore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { VideoSocketEnum } from '@/shared/types/enums';
import { getVideoSocket, destroyVideoSocket } from '@/lib/socketService';
import { setVideoSocketConnected, setVideoSocketDisconnected } from '@/app/store/slices/videoSlice';

export const connectVideoSocket = createAsyncThunk<void, void, { state: RootState }>(
  'video/connectSocket',
  async (_, { getState, dispatch }) => {
    console.log('connectVideoSocket function calling');

    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const videoSocket = getVideoSocket();

    videoSocket.on(VideoSocketEnum.connect, () => {
      dispatch(setVideoSocketConnected({ videoSocketId: videoSocket.id as string }));
    });
  },
);

export const disconnectVideoSocket = createAsyncThunk<void>(
  'video/disconnectSocket',
  async (_, { dispatch }) => {
    console.log('disconnectVideoSocket function calling');
    destroyVideoSocket();
    dispatch(setVideoSocketDisconnected());
  },
);
