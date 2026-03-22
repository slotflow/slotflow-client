import { toast } from "react-toastify";
import peer from "@/utils/service/peer";
import { formatTime } from "@/utils/helper";
import { Role } from "@/utils/interface/enums";
import { Button } from "@/components/ui/button";
import { videoSocket } from "@/lib/socketService";
import { useEffect, useState, useRef } from "react";
import { joinOrLeft } from "@/utils/apis/booking.api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { disconnectVideoSocket } from "@/utils/socket/videoSocketThunk";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Loader } from "lucide-react";
import { JoinRoomCallbackRequest } from "@/utils/interface/api/bookingApiInterface";
import { setCamera, setMic, stopVideoCallTimer, updateVideoCallTimer } from "@/utils/redux/slices/videoSlice";

enum VideoCallSocketEnum {
  roomJoin = "room:join",
  userJoined = "user:joined",
  userCall = "user:call",
  incomingCall = "incoming:call",
  callAccepted = "call:accepted",
  peerNegotiation = "peer:nego:needed",
  peerNegotiationDone = "peer:nego:done",
  peerNegotiationFinal = "peer:nego:final",
  roomLeave = "room:leave",
  userLeft = "user:left",
}

const RoomPage = () => {

  const { roomId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [myStream, setMyStream] = useState<MediaStream | null>(null);

  const [ remoteUserName, setRemoteUsername ] = useState<string | null>(null);
  const [ remoteSocketId, setRemoteSocketId ] = useState<string | null>(null);
  const [ remoteStream, setRemoteStream ] = useState<MediaStream | null>(null);

  const user = useSelector((state: RootState) => state.auth.authUser);
  const { isCameraOn, isMicOn } = useSelector((state: RootState) => state.video);
  const { isVideoCallTimerRunning, videoCallRemainingTime } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let isMounted = true;

    const initStream = async () => {
      peer.initPeer();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (!isMounted) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      currentStream = stream;
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      dispatch(setCamera(videoTrack?.enabled ?? false));
      dispatch(setMic(audioTrack?.enabled ?? false));

      setMyStream(stream);
      if (peer.peer && peer.peer.signalingState !== "closed") {
        stream.getTracks().forEach((track) => peer.peer.addTrack(track, stream));
      }
    };

    initStream();

    return () => {
      isMounted = false;
      if (currentStream) {
        currentStream.getTracks().forEach((t) => t.stop());
      }
    };

  }, [dispatch]);

  useEffect(() => {
    const handleTrack = (ev: RTCTrackEvent) => {
       setRemoteStream(ev.streams[0]);
    };
    peer.peer.addEventListener("track", handleTrack);

    const handleNegoNeeded = async () => {
      if (!remoteSocketId) return;
      if (peer.peer.signalingState !== "stable") return;
      const offer = await peer.getOffer();
      if (offer) {
        videoSocket?.emit(VideoCallSocketEnum.peerNegotiation, { offer, to: remoteSocketId });
      }
    };
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

    return () => {
      peer.peer.removeEventListener("track", handleTrack);
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [remoteSocketId]);

  useEffect(() => {
    if (myVideoRef.current && myStream) myVideoRef.current.srcObject = myStream;
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  useEffect(() => {
    videoSocket?.emit(VideoCallSocketEnum.roomJoin, { roomId, user: { id: user?.uid, name: user?.username } });

    videoSocket?.on(VideoCallSocketEnum.userJoined, async ({ id, user: joinedUser }) => {
      setRemoteSocketId(id);
      setRemoteUsername(joinedUser?.name);
      const offer = await peer.getOffer();
      if (joinedUser?.id !== user?.uid) {
        toast.success(`${joinedUser?.name} joined the call`);
      }
      videoSocket?.emit(VideoCallSocketEnum.userCall, { to: id, offer, user: { name: user?.username } });
    });

    videoSocket?.on(VideoCallSocketEnum.incomingCall, async ({ from, offer, user: caller }) => {
      setRemoteSocketId(from);
      setRemoteUsername(caller?.name);
      const ans = await peer.getAnswer(offer);
      videoSocket?.emit(VideoCallSocketEnum.callAccepted, { to: from, ans });
    });

    videoSocket?.on(VideoCallSocketEnum.callAccepted, async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on(VideoCallSocketEnum.peerNegotiation, async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      videoSocket?.emit(VideoCallSocketEnum.peerNegotiationDone, { to: from, ans });
    });

    videoSocket?.on(VideoCallSocketEnum.peerNegotiationFinal, async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on(VideoCallSocketEnum.userLeft, () => {
      setRemoteStream(null);
    });

    return () => {
      peer.close();
      videoSocket?.emit(VideoCallSocketEnum.roomLeave, { roomId });
      dispatch(disconnectVideoSocket());
    };
  }, [roomId, user?.email]);


  const toggleCamera = async () => {
    if (isCameraOn) {
      if (myStream) myStream.getVideoTracks().forEach(t => t.stop());
      dispatch(setCamera(false));
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const newTrack = newStream.getVideoTracks()[0];
        if (myStream) {
          myStream.getVideoTracks().forEach(t => myStream.removeTrack(t));
          myStream.addTrack(newTrack);
        }

        const sender = peer.peer.getSenders().find(s => s.track && s.track.kind === 'video');
        if (sender) {
          sender.replaceTrack(newTrack);
        }

        if (myVideoRef.current) myVideoRef.current.srcObject = myStream;
        dispatch(setCamera(true));
      } catch (err) {
        console.error("Cannot turn on camera:", err);
      }
    }
  };

  const toggleMic = async () => {
    if (isMicOn) {
      if (myStream) myStream.getAudioTracks().forEach(t => t.stop());
      dispatch(setMic(false));
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const newTrack = newStream.getAudioTracks()[0];
        if (myStream) {
          myStream.getAudioTracks().forEach(t => myStream.removeTrack(t));
          myStream.addTrack(newTrack);
        }

        const sender = peer.peer.getSenders().find(s => s.track && s.track.kind === 'audio');
        if (sender) {
          sender.replaceTrack(newTrack);
        }

        dispatch(setMic(true));
      } catch (err) {
        console.error("Cannot turn on mic:", err);
      }
    }
  };

  useEffect(() => {
    if (isVideoCallTimerRunning) {
      const interval = setInterval(() => {
        dispatch(updateVideoCallTimer());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVideoCallTimerRunning, dispatch]);

  const handleEndCall = async () => {
    if (!user || !roomId) {
      toast.error("Something went wrong, please truy again");
      return;
    }

    const currentTime = new Date();

    const data: JoinRoomCallbackRequest = {
      joined: true,
      leftCallTime: currentTime,
      videoCallRoomId: roomId,
    }

    try {

      const res = await joinOrLeft(data);

      if (res.success) {
        toast.success("You leaved meet successfully");
        myStream?.getTracks().forEach((t) => t.stop());
        peer.peer.close();
        videoSocket?.emit("room:leave", { roomId });
        dispatch(disconnectVideoSocket());

        if (myStream) {
          const audioTrack = myStream.getAudioTracks()[0];
          if (audioTrack) {
            audioTrack.enabled = false;
            dispatch(setMic(false));
          }

          const videoTrack = myStream.getVideoTracks()[0];
          if (videoTrack) {
            videoTrack.enabled = false;
            dispatch(setCamera(false));
          }
        }

        if (videoCallRemainingTime > 0) {
          dispatch(stopVideoCallTimer({
            remainingTime: videoCallRemainingTime,
            roomId
          }));
        } else {
          dispatch(stopVideoCallTimer({
            remainingTime: 0,
            roomId: null
          }));
        }

        navigate(`/${user?.role === Role.PROVIDER ? "provider/appointments" : "user/bookings"}`, { replace: true });
      } else {
        toast.error(res.message || "Unable to join, please try again");
      }
    } catch (error) {
      console.log("error : ", error)
      toast.error("Please try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">

      <div className="absolute top-2 right-4">
        {isVideoCallTimerRunning ? (
          <span className="text-xs md:text-sm text-black font-semibold bg-amber-300 px-3 py-1 rounded-md shadow">
            {formatTime(videoCallRemainingTime)}
          </span>
        ) : (
          <span className="text-xs md:text-sm text-black font-semibold bg-amber-300 px-3 py-1 rounded-md shadow">
            00:00
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-black">
          <video
            ref={myVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl scale-x-[-1]"
          />
          {(!isCameraOn || !isMicOn) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-semibold border">
              {!isCameraOn && !isMicOn
                ? "Camera and Mic turned off"
                : !isCameraOn
                  ? "Camera turned off"
                  : "Mic turned off"}
            </div>
          )}
        </div>

        {remoteStream ? (
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-black">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-2xl scale-x-[-1]"
            />
            <div className="absolute bottom-3 left-3 text-white bg-black/50 px-3 py-1 rounded-lg text-sm">
              {remoteUserName}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center border rounded-2xl w-full h-[300px] md:h-[400px]">
            <Loader className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-6 bg-[var(--menuItemHoverBg)] p-4 rounded-xl shadow">
        <Button title={isCameraOn ? "Video On" : "Video Off"} onClick={toggleCamera} variant={isCameraOn ? "default" : "destructive"} className="cursor-pointer" >
          {isCameraOn ? <Video /> : <VideoOff />}
        </Button>
        <Button title={isMicOn ? "Mic On" : "Mic Off"} onClick={toggleMic} variant={isMicOn ? "default" : "destructive"} className="cursor-pointer" >
          {isMicOn ? <Mic /> : <MicOff />}
        </Button>
        <Button title="End Call" onClick={handleEndCall} variant="destructive" className="cursor-pointer" >
          <PhoneOff />
        </Button>
      </div>
    </div>

  );
};

export default RoomPage;
