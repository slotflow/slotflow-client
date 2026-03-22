import { toast } from "react-toastify";
import { appConfig } from "@/utils/env";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "@/utils/redux/appStore";
import { joinOrLeft } from "@/utils/apis/booking.api";
import { AuthUser } from "@/utils/interface/sliceInterface";
import { MediaTrackKind, Role } from "@/utils/interface/enums";
import { toggleMediaTrack } from "@/utils/helper/toggleMediaTrack";
import { connectVideoSocket } from "@/utils/socket/videoSocketThunk";
import { JoinRoomCallbackRequest } from "@/utils/interface/api/bookingApiInterface";
import { setCamera, setMic, startVideoCallTimer, updateVideoCallTimer } from "@/utils/redux/slices/videoSlice";

interface useVideoCallLobbyInterface {
  user: AuthUser;
  roomId: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  videoCallRoomId: string | null;
  videoCallRemainingTime: number;
  isCameraOn: boolean;
  isMicOn: boolean;
  isVideoCallTimerRunning: boolean;
}

interface useVideoCallLobbyReturnInterface {
  handleJoin: () => Promise<void>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  toggleCamera: () => void;
  toggleMic: () => void;
}

export const useVideoCallLobby = ({
  user,
  roomId,
  dispatch,
  navigate,
  videoCallRoomId,
  videoCallRemainingTime,
  isCameraOn,
  isMicOn,
  isVideoCallTimerRunning
}: useVideoCallLobbyInterface): useVideoCallLobbyReturnInterface => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleJoin = async () => {
    if (!user || !roomId) {
      toast.error("Something went wrong, please truy again");
      return;
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
          toast.error("Something went wrong");
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
          toast.success("Welcome to meet");
          navigate(`/${user.role === Role.PROVIDER ? "provider" : "user"}/video-call-room/${roomId}`);
        }
      } else {
        toast.error(res.message || "Unable to join, please try again");
      }
    } catch (error) {
      if (appConfig.dev) {
        console.error("Join room error:", error);
      }
      toast.error("Please try again");
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
      if(appConfig.dev) {
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
    handleJoin,
    videoRef,
    toggleCamera,
    toggleMic
  };
}