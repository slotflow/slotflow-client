import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { durationMap } from "@/utils/interface/commonInterface";
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { setCamera, setMic, startVideoCallTimer, updateVideoCallTimer } from '@/utils/redux/slices/videoSlice';
import { joinOrLeft } from "@/utils/apis/booking.api";
import { JoinRoomCallbackRequest } from "@/utils/interface/api/bookingApiInterface";

const LobbyPage = () => {

  const { roomId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const user = useSelector((state: RootState) => state.auth.authUser);
  const { isCameraOn, isMicOn } = useSelector((state: RootState) => state.video);
  const { isVideoCallTimerRunning, videoCallRoomId, videoCallRemainingTime } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    const getPreview = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const videoTrack = localStream.getVideoTracks()[0];
        const audioTrack = localStream.getAudioTracks()[0];

        dispatch(setCamera(videoTrack?.enabled ?? false));
        dispatch(setMic(audioTrack?.enabled ?? false));

        setStream(localStream);
        if (videoRef.current) videoRef.current.srcObject = localStream;
      } catch (err) {
        console.error("Cannot access camera:", err);
        dispatch(setCamera(false));
        dispatch(setMic(false));
      }
    };

    getPreview();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
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
        if(!res.data.duration) {
          toast.error("Something went wrong");
        } else{
          const totalDurationInSec = durationMap[res.data.duration];
      
          if(!videoCallRoomId || videoCallRemainingTime === 0) {
            dispatch(startVideoCallTimer({
              remainingTime: totalDurationInSec, 
              roomId
            }));
          } else {
            if(roomId === videoCallRoomId) {
              dispatch(startVideoCallTimer({
                remainingTime: videoCallRemainingTime, 
                roomId
              }));
            } else {
                dispatch(startVideoCallTimer({
                  remainingTime: totalDurationInSec, 
                  roomId
                }));
              }
          }
          toast.success("Welcome to meet");
          navigate(`/${user?.role === "PROVIDER" ? "provider" : "user"}/video-call-room/${roomId}`);
        }
      } else {
        toast.error(res.message || "Unable to join, please try again");
      }
    } catch {
      toast.error("Please try again");
    }
  }

  const toggleCamera = () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      dispatch(setCamera(videoTrack.enabled));
    }
  };

  const toggleMic = () => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      dispatch(setMic(audioTrack.enabled));
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-8 flex flex-col justify-center items-center p-8">
        <div className="relative w-full max-w-3xl h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl scale-x-[-1]"
          />
          {(!isCameraOn || !isMicOn) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-semibold">
              {!isCameraOn && !isMicOn
                ? "Camera and Mic turned off"
                : !isCameraOn
                  ? "Camera turned off"
                  : "Mic turned off"}
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6 bg-[var(--menuItemHoverBg)] p-4 rounded-xl shadow">
          <Button
            onClick={toggleCamera}
            variant={isCameraOn ? "default" : "destructive"}
            className="cursor-pointer"
          >
            {isCameraOn ? <Video /> : <VideoOff />}
          </Button>
          <Button
            onClick={toggleMic}
            variant={isMicOn ? "default" : "destructive"}
            className="cursor-pointer"
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>
        </div>
      </div>

      <div className="col-span-4 flex flex-col justify-center p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Lobby</h1>
        <p className="mb-6">
          Check your camera and microphone before joining the meeting.
        </p>
        <Button
          onClick={handleJoin}
          className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default LobbyPage;
