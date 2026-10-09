import {
  setMic,
  setCamera,
  startVideoCallTimer,
  updateVideoCallTimer,
} from '@/app/store/slices/videoSlice';
import { toast } from 'react-toastify';
import { appConfig } from '@/config/env';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { MediaTrackKind, VideoSocketEnum } from '@/shared/types/enums';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { handleError } from '@/shared/utils/helper/handleError';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiBaseResponse, ApiError } from '@/shared/types/common';
import { joinOrLeft } from '@/services/apis/booking';
import { connectVideoSocket } from '@/services/socket/videoSocketThunk';
import { toggleMediaTrack } from '@/shared/utils/helper/toggleMediaTrack';
import { useVideoCallLobbyReturn } from '@/shared/types/hooks';
import { JoinRoomCallbackRequest, JoinRoomCallbackResponse } from '@/shared/types/api/booking';
import { getVideoSocket } from '@/lib/socketService';
import { VideoRoomParticipant, VideoRoomStatePayload } from '@/shared/types/socket';

interface Window {
  webkitAudioContext?: typeof AudioContext;
}

interface NetworkInformation {
  downlink?: number;
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  rtt?: number;
  saveData?: boolean;
  type?: string;
}

interface Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

export const useJVideoCallLobby = (): useVideoCallLobbyReturn => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [roomUsers, setRoomUsers] = useState<VideoRoomParticipant[]>([]);
  const [videoQuality, setVideoQuality] = useState<string>('Detecting...');
  const [audioLevels, setAudioLevels] = useState<number[]>([10, 10, 10, 10, 10, 10]);
  const [networkStatus, setNetworkStatus] = useState<{ label: string; color: string }>({
    label: 'Good',
    color: 'text-emerald-500',
  });

  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const { authUser } = useSelector((state: RootState) => state.auth);
  const { isCameraOn, isMicOn, isVideoCallTimerRunning, videoCallRemainingTime } = useSelector(
    (state: RootState) => state.video,
  );

  // Join Room Mutation
  const videoCallJoinMutation = useMutation<
    ApiBaseResponse<JoinRoomCallbackResponse>,
    ApiError,
    JoinRoomCallbackRequest
  >({
    mutationFn: async (data) => {
      if (!authUser || !data.videoCallRoomId) {
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
        const remainingTime =
          videoCallRemainingTime > 0 ? videoCallRemainingTime : totalDurationInSec;
        dispatch(
          startVideoCallTimer({
            remainingTime,
            roomId: videoCallRoomId,
          }),
        );
        toast.success(res.message || 'Welcome to meet');
        navigate(`/video-call-room/${videoCallRoomId}`);
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Unable to join video call. Please try again.');
    },
  });

  // Camera / Audio Preview Initialization
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

  // Camera Toggler
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

  // Mic toggler
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

  // Video Socket Room Listening
  useEffect(() => {
    if (!roomId) {
      setRoomUsers([]);
      return;
    }

    const socket = getVideoSocket();

    const handleRoomState = ({ roomId: stateRoomId, users }: VideoRoomStatePayload) => {
      if (stateRoomId === roomId) {
        setRoomUsers(Array.isArray(users) ? users : []);
      }
    };

    const watchRoom = () => {
      socket.emit(VideoSocketEnum.roomWatch, { roomId });
    };

    socket.on(VideoSocketEnum.roomState, handleRoomState);
    socket.on(VideoSocketEnum.connect, watchRoom);

    if (socket.connected) watchRoom();

    return () => {
      socket.off(VideoSocketEnum.roomState, handleRoomState);
      socket.off(VideoSocketEnum.connect, watchRoom);
      socket.emit(VideoSocketEnum.roomUnwatch, { roomId });
      setRoomUsers([]);
    };
  }, [roomId]);

  // Video Quality Detection
  useEffect(() => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    const currentStream = videoRef.current.srcObject as MediaStream;
    const videoTrack = currentStream.getVideoTracks()[0];

    if (!videoTrack || !isCameraOn) {
      setVideoQuality('Camera Off');
      return;
    }

    const updateQualityInfo = () => {
      const settings = videoTrack.getSettings();
      const height = settings.height || 0;
      const frameRate = Math.round(settings.frameRate || 30);

      let resLabel = `${height}p`;
      if (height >= 1080) resLabel = 'HD 1080p';
      else if (height >= 720) resLabel = 'HD 720p';
      else if (height >= 480) resLabel = 'SD 480p';

      setVideoQuality(`${resLabel} • ${frameRate}fps`);
    };

    updateQualityInfo();
    videoTrack.addEventListener('ended', updateQualityInfo);
    return () => videoTrack.removeEventListener('ended', updateQualityInfo);
  }, [isCameraOn]);

  // Audio Visualizer Analyzer
  useEffect(() => {
    if (!videoRef.current || !videoRef.current.srcObject || !isMicOn) {
      setAudioLevels([10, 10, 10, 10, 10, 10]);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const currentStream = videoRef.current.srcObject as MediaStream;
    const audioTrack = currentStream.getAudioTracks()[0];

    if (!audioTrack) return;

    try {
      const AudioCtx = window.AudioContext || (window as Window).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 32;

      const source = audioCtx.createMediaStreamSource(currentStream);
      source.connect(analyser);

      audioCtxRef.current = audioCtx;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioVisualizer = () => {
        analyser.getByteFrequencyData(dataArray);
        const sliced = Array.from(dataArray.slice(0, 6)).map((val) =>
          Math.max(12, Math.min(100, Math.floor((val / 255) * 100))),
        );
        setAudioLevels(sliced);
        animFrameRef.current = requestAnimationFrame(updateAudioVisualizer);
      };

      updateAudioVisualizer();
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error('Video call lobby error : ', error);
      }
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [isMicOn]);

  // Network Monitor
  useEffect(() => {
    const checkNetwork = () => {
      if (!navigator.onLine) {
        setNetworkStatus({ label: 'Offline', color: 'text-destructive' });
        return;
      }
      const navConn =
        (navigator as Navigator).connection ||
        (navigator as Navigator).mozConnection ||
        (navigator as Navigator).webkitConnection;
      if (navConn) {
        const rtt = navConn.rtt || 50;
        if (rtt < 100) setNetworkStatus({ label: 'Excellent', color: 'text-emerald-500' });
        else if (rtt < 300) setNetworkStatus({ label: 'Good', color: 'text-amber-500' });
        else setNetworkStatus({ label: 'Poor', color: 'text-destructive' });
      } else {
        setNetworkStatus({ label: 'Excellent', color: 'text-emerald-500' });
      }
    };

    checkNetwork();
    window.addEventListener('online', checkNetwork);
    window.addEventListener('offline', checkNetwork);
    return () => {
      window.removeEventListener('online', checkNetwork);
      window.removeEventListener('offline', checkNetwork);
    };
  }, []);

  // Initialization & Timer Hooks
  useEffect(() => {
    getPreview();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [getPreview]);

  useEffect(() => {
    if (isVideoCallTimerRunning) {
      const interval = setInterval(() => {
        dispatch(updateVideoCallTimer());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVideoCallTimerRunning, dispatch]);

  const handleJoin = () => {
    if (roomId) {
      videoCallJoinMutation.mutate({
        joined: true,
        videoCallRoomId: roomId,
        joinedTime: new Date(),
      });
    }
  };

  return {
    roomId,
    videoRef,
    isCameraOn,
    isMicOn,
    roomUsers,
    videoQuality,
    audioLevels,
    networkStatus,
    toggleCamera,
    toggleMic,
    handleJoin,
    isJoiningVideoCall: videoCallJoinMutation.isPending,
  };
};
