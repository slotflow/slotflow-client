import { useNavigate } from "react-router-dom";
import { appConfig } from "@/shared/config/env";
import { joinOrLeft } from "@/shared/apis/booking";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { MediaTrackKind, Role } from "@/shared/interface/enums";
import { toggleMediaTrack } from "@/shared/helper/toggleMediaTrack";
import { connectVideoSocket } from "@/shared/socket/videoSocketThunk";
import { JoinRoomCallbackRequest } from "@/shared/interface/api/booking";
import { setCamera, setMic, startVideoCallTimer, updateVideoCallTimer } from "@/shared/redux/slices/videoSlice";

interface useVideoCallLobbyInterface {
  roomId: string;
  isCameraOn: boolean;
  isMicOn: boolean;
}

interface useVideoCallLobbyReturnInterface {
  videoCallJoinHandler: () => Promise<{ success: boolean; message: string }>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  toggleCamera: () => void;
  toggleMic: () => void;
}

export const useVideoCallLobby = ({
  roomId,
  isCameraOn,
  isMicOn,
}: useVideoCallLobbyInterface): useVideoCallLobbyReturnInterface => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { authUser: user } = useSelector((state: RootState) => state.auth);
  const { isVideoCallTimerRunning, videoCallRoomId, videoCallRemainingTime } = useSelector((state: RootState) => state.video);

  const videoCallJoinHandler = async () => {
    if (!user || !roomId) {
      return { success: false, message: "Something went wrong, please truy again" };
    }

    const currentTime = new Date();

    const data: JoinRoomCallbackRequest = {
      joined: true,
      joinedTime: currentTime,
      videoCallRoomId: roomId
    }

    try {
      const res = await joinOrLeft(data);

      if (res.success) {
        if (!res.data.duration) {
          return { success: false, message: "Something went wrong" };
        } else {
          const totalDurationInSec = res.data.duration * 60;
          dispatch(connectVideoSocket());

          const remainingTime =
            roomId === videoCallRoomId && videoCallRemainingTime > 0
              ? videoCallRemainingTime
              : totalDurationInSec;

          dispatch(startVideoCallTimer({
            remainingTime,
            roomId
          }));
          navigate(`/${user.role === Role.PROVIDER ? "provider" : "user"}/video-call-room/${roomId}`);
          return { success: true, message: "Welcome to meet" };
        }
      } else {
        return { success: res.success || false, message: res.message || "Unable to join, please try again" };
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error("Join room error:", error);
      }
      return { success: false, message: "Please try again" };
    }
  };

  const getPreview = async () => {
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
        console.error("Media access error:", error);
      }
      dispatch(setCamera(false));
      dispatch(setMic(false));
    }
  };

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
    getPreview();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isVideoCallTimerRunning) {
      const interval = setInterval(() => {
        dispatch(updateVideoCallTimer());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVideoCallTimerRunning, dispatch]);

  return {
    videoCallJoinHandler,
    videoRef,
    toggleCamera,
    toggleMic
  };
}