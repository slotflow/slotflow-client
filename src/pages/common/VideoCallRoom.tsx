import { toast } from "react-toastify";
import peer from "@/utils/service/peer";
import { formatTime } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { videoSocket } from "@/lib/socketService";
import { useEffect, useState, useRef } from "react";
import { joinOrLeft } from "@/utils/apis/booking.api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { toggleMediaTrack } from "@/utils/helper/toggleMediaTrack";
import { disconnectVideoSocket } from "@/utils/socket/videoSocketThunk";
import { MediaTrackKind, PeerValues, Role, VideoCallSocket } from "@/utils/interface/enums";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Loader } from "lucide-react";
import { JoinRoomCallbackRequest } from "@/utils/interface/api/booking";
import { setCamera, setMic, stopVideoCallTimer, updateVideoCallTimer } from "@/utils/redux/slices/videoSlice";

const RoomPage = () => {

  const { roomId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const myStreamRef = useRef<MediaStream | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);

  const [remoteUserName, setRemoteUsername] = useState<string | null>(null);
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const user = useSelector((state: RootState) => state.auth.authUser);
  const { isCameraOn, isMicOn } = useSelector((state: RootState) => state.video);
  const { isVideoCallTimerRunning, videoCallRemainingTime } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    let isMounted = true;

    const initStream = async () => {
      peer.initPeer();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (!isMounted) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      dispatch(setCamera(videoTrack?.enabled ?? false));
      dispatch(setMic(audioTrack?.enabled ?? false));

      myStreamRef.current = stream;
      setMyStream(stream);
      if (peer.peer && peer.peer.signalingState !== "closed") {
        stream.getTracks().forEach((track) => peer.peer.addTrack(track, stream));
      }
    };

    initStream();

    return () => {
      isMounted = false;
      if (myStreamRef.current) {
        myStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };

  }, [dispatch]);

  useEffect(() => {
    const handleTrack = (ev: RTCTrackEvent) => {
      setRemoteStream(ev.streams[0]);
    };
    peer.peer.addEventListener(PeerValues.TRACK, handleTrack);

    const handleNegoNeeded = async () => {
      if (!remoteSocketId) return;
      if (peer.peer.signalingState !== PeerValues.STABLE) return;
      const offer = await peer.getOffer();
      if (offer) {
        videoSocket?.emit(VideoCallSocket.peerNegotiation, { offer, to: remoteSocketId });
      }
    };
    peer.peer.addEventListener(PeerValues.NEGOTIATION_NEEDED, handleNegoNeeded);

    return () => {
      peer.peer.removeEventListener(PeerValues.TRACK, handleTrack);
      peer.peer.removeEventListener(PeerValues.NEGOTIATION_NEEDED, handleNegoNeeded);
    };
  }, [remoteSocketId]);

  useEffect(() => {
    if (myVideoRef.current && myStream) myVideoRef.current.srcObject = myStream;
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  useEffect(() => {
    videoSocket?.emit(VideoCallSocket.roomJoin, { roomId, user: { id: user?.uid, name: user?.username } });

    videoSocket?.on(VideoCallSocket.userJoined, async ({ id, user: joinedUser }) => {
      setRemoteSocketId(id);
      setRemoteUsername(joinedUser?.name);
      const offer = await peer.getOffer();
      if (joinedUser?.id !== user?.uid) {
        toast.success(`${joinedUser?.name} joined the call`);
      }
      videoSocket?.emit(VideoCallSocket.userCall, { to: id, offer, user: { name: user?.username } });
    });

    videoSocket?.on(VideoCallSocket.incomingCall, async ({ from, offer, user: caller }) => {
      setRemoteSocketId(from);
      setRemoteUsername(caller?.name);
      const ans = await peer.getAnswer(offer);
      videoSocket?.emit(VideoCallSocket.callAccepted, { to: from, ans });
    });

    videoSocket?.on(VideoCallSocket.callAccepted, async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on(VideoCallSocket.peerNegotiation, async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      videoSocket?.emit(VideoCallSocket.peerNegotiationDone, { to: from, ans });
    });

    videoSocket?.on(VideoCallSocket.peerNegotiationFinal, async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on(VideoCallSocket.userLeft, () => {
      setRemoteStream(null);
    });

    return () => {
      peer.close();
      videoSocket?.emit(VideoCallSocket.roomLeave, { roomId });
      dispatch(disconnectVideoSocket());
    };
  }, [roomId, user?.email]);

  const toggleCamera = () =>
    toggleMediaTrack({
      kind: MediaTrackKind.VIDEO,
      stream: myStream,
      setStream: setMyStream,
      isOn: isCameraOn,
      setIsOn: (v) => dispatch(setCamera(v)),
      videoRef: myVideoRef,
      peerConnection: peer.peer,
    });

  const toggleMic = () =>
    toggleMediaTrack({
      kind: MediaTrackKind.AUDIO,
      stream: myStream,
      setStream: setMyStream,
      isOn: isMicOn,
      setIsOn: (v) => dispatch(setMic(v)),
      peerConnection: peer.peer,
    });

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
      toast.error("Something went wrong, please try again");
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
