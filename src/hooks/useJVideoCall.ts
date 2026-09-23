import {
  setMic,
  setCamera,
  startVideoCallTimer,
  updateVideoCallTimer,
} from '@/app/store/slices/videoSlice';
import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useVideoCallProps, useVideoCallReturn } from '@/shared/types/hooks';
import { MediaTrackKind, Role } from '@/shared/types/enums';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiBaseResponse, ApiError } from '@/shared/types/common';
import { joinOrLeft, validateRoomId } from '@/services/apis/booking';
import { connectVideoSocket } from '@/services/socket/videoSocketThunk';
import { toggleMediaTrack } from '@/shared/utils/helper/toggleMediaTrack';
import { handleError } from '@/shared/utils/helper/handleError';
import { JoinRoomCallbackRequest, JoinRoomCallbackResponse, ValidateRoomIdRequest } from '@/shared/types/api/booking';

export const useJVideoCall = (props: useVideoCallProps): useVideoCallReturn => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { isCameraOn, isMicOn } = useSelector((state: RootState) => state.video);
  const { authUser } = useSelector((state: RootState) => state.auth);

  const { authUser: user } = useSelector((state: RootState) => state.auth);
  const { isVideoCallTimerRunning, videoCallRoomId: savedRoomId, videoCallRemainingTime } = useSelector(
    (state: RootState) => state.video,
  );

  const videoCallJoinMutation = useMutation<
    ApiBaseResponse<JoinRoomCallbackResponse>,
    ApiError,
    JoinRoomCallbackRequest
  >({
    mutationFn: async (data) => {
      if (!user || data.videoCallRoomId) {
        throw new Error('Data is missing. Please refresh.');
      }

      return await joinOrLeft({
        joined: true,
        joinedTime: new Date(),
        videoCallRoomId: data.videoCallRoomId,
      });
    },

    onSuccess: (res) => {
      if (res.success && res.data) {
        const { duration, videoCallRoomId } = res.data;
        const totalDurationInSec = duration * 60;
        dispatch(connectVideoSocket());
        if (savedRoomId === videoCallRoomId) {
          const remainingTime = videoCallRemainingTime > 0 ? videoCallRemainingTime : totalDurationInSec;
          dispatch(
            startVideoCallTimer({
              remainingTime,
              roomId: videoCallRoomId,
            })
          );
          toast.success(res.message || 'Welcome to meet');
          const rolePath = user?.role === Role.PROVIDER ? 'provider' : 'user';
          navigate(`/${rolePath}/video-call-room/${videoCallRoomId}`);
        }
      } else {
        toast.error(res.message || 'Unable to join, please try again');
      }
    },

    onError: (error: ApiError) => {
      handleError(error, 'Unable to join video call. Please try again.');
    },
  });


  const JoinCallLobbyMutation = useMutation<
    ApiBaseResponse,
    ApiError,
    ValidateRoomIdRequest
  >({
    mutationFn: async (data: ValidateRoomIdRequest) => {
      return await validateRoomId(data);
    },
    onSuccess: (res, variables) => {
      if (res.success) {
        toast.success(res.message || 'Redirecting to video call...');
        if (authUser?.role === Role.PROVIDER) {
          navigate(`/video-call-lobby/${variables.roomId}`);
        } else if (authUser?.role === Role.USER) {
          navigate(`/video-call-lobby/${variables.roomId}`);
        }
      } else {
        toast.error(res.message || 'Invalid Room ID');
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Invalid Request, please try again after sometimes.');
    },
  });



  const getPreview = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = localStream;
      setStream(localStream);

      if (videoRef.current) {
        videoRef.current.srcObject = localStream;
      }

      const [videoTrack] = localStream.getVideoTracks();
      const [audioTrack] = localStream.getAudioTracks();

      dispatch(setCamera(videoTrack?.enabled ?? false));
      dispatch(setMic(audioTrack?.enabled ?? false));
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error('Media access error:', error);
      }
      dispatch(setCamera(false));
      dispatch(setMic(false));
    }
  }, [dispatch]);

  const toggleCamera = () =>
    toggleMediaTrack({
      kind: MediaTrackKind.VIDEO,
      stream,
      setStream: (updatedStream) => {
        streamRef.current = updatedStream;
        setStream(updatedStream);
      },
      isOn: isCameraOn,
      setIsOn: (v) => dispatch(setCamera(v)),
      videoRef,
    });

  const toggleMic = () =>
    toggleMediaTrack({
      kind: MediaTrackKind.AUDIO,
      stream,
      setStream: (updatedStream) => {
        streamRef.current = updatedStream;
        setStream(updatedStream);
      },
      isOn: isMicOn,
      setIsOn: (v) => dispatch(setMic(v)),
    });

  useEffect(() => {
    if (!props.initializeMedia) {
      return;
    }

    getPreview();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [getPreview, props.initializeMedia]);

  useEffect(() => {
    if (isVideoCallTimerRunning) {
      const interval = setInterval(() => {
        dispatch(updateVideoCallTimer());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVideoCallTimerRunning, dispatch]);

  return {
    videoCallJoin: videoCallJoinMutation.mutate,
    isJoiningVideoCall: videoCallJoinMutation.isPending,
    JoinCallLobby: JoinCallLobbyMutation.mutate,
    videoRef,
    toggleCamera,
    toggleMic,
  };
};
