import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import peer from '@/services/socket/peer';
import { videoSocket } from '@/lib/socketService';
import { joinOrLeft } from '@/services/apis/booking';
import { formatTime } from '@/shared/utils/helper/formatTime';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { JoinRoomCallbackRequest } from '@/shared/types/api/booking';
import {
  setMic,
  setCamera,
  stopVideoCallTimer,
  updateVideoCallTimer,
} from '@/app/store/slices/videoSlice';
import { appConfig } from '@/config/env';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { UseVideoCallRoomReturn } from '@/shared/types/hooks';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { toggleMediaTrack } from '@/shared/utils/helper/toggleMediaTrack';
import { disconnectVideoSocket } from '@/services/socket/videoSocketThunk';
import { MediaTrackKind, PeerValues, VideoSocketEnum } from '@/shared/types/enums';

export const useVideoCallRoom = (): UseVideoCallRoomReturn => {
  const { roomId } = useParams();
  const { goTo } = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const myStreamRef = useRef<MediaStream | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);

  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [remoteUserName, setRemoteUsername] = useState<string | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const user = useSelector((state: RootState) => state.auth.authUser);
  const { isCameraOn, isMicOn } = useSelector((state: RootState) => state.video);
  const { isVideoCallTimerRunning, videoCallRemainingTime } = useSelector(
    (state: RootState) => state.video,
  );

  // Initialize Local Media Stream & Peer Tracks
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
      if (peer.peer && peer.peer.signalingState !== 'closed') {
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

  // Handle Peer Connection Track & Negotiation Events
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
        videoSocket?.emit(VideoSocketEnum.peerNegotiation, { offer, to: remoteSocketId });
      }
    };
    peer.peer.addEventListener(PeerValues.NEGOTIATION_NEEDED, handleNegoNeeded);

    return () => {
      peer.peer.removeEventListener(PeerValues.TRACK, handleTrack);
      peer.peer.removeEventListener(PeerValues.NEGOTIATION_NEEDED, handleNegoNeeded);
    };
  }, [remoteSocketId]);

  // Bind local stream to HTML Video Element
  useEffect(() => {
    if (myVideoRef.current && myStream) myVideoRef.current.srcObject = myStream;
  }, [myStream]);

  // Bind remote stream to HTML Video Element
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  // Signaling Sockets Setup
  useEffect(() => {
    videoSocket?.emit(VideoSocketEnum.roomJoin, {
      roomId,
      user: {
        id: user?.uid,
        name: user?.username,
        profileImage: user?.profileImage,
      },
    });

    videoSocket?.on(VideoSocketEnum.userJoined, async ({ id, user: joinedUser }) => {
      setRemoteSocketId(id);
      setRemoteUsername(joinedUser?.name);

      const offer = await peer.getOffer();

      if (joinedUser?.id !== user?.uid) {
        toast.success(`${joinedUser?.name} joined the call`);
      }

      videoSocket?.emit(VideoSocketEnum.userCall, {
        to: id,
        offer,
        user: {
          name: user?.username,
          profileImage: user?.profileImage,
        },
      });
    });

    videoSocket?.on(VideoSocketEnum.incomingCall, async ({ from, offer, user: caller }) => {
      setRemoteSocketId(from);
      setRemoteUsername(caller?.name);

      const ans = await peer.getAnswer(offer);
      videoSocket?.emit(VideoSocketEnum.callAccepted, { to: from, ans });
    });

    videoSocket?.on(VideoSocketEnum.callAccepted, async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on(VideoSocketEnum.peerNegotiation, async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      videoSocket?.emit(VideoSocketEnum.peerNegotiationDone, { to: from, ans });
    });

    videoSocket?.on(VideoSocketEnum.peerNegotiationFinal, async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on(VideoSocketEnum.userLeft, () => {
      setRemoteStream(null);
    });

    return () => {
      peer.close();
      videoSocket?.emit(VideoSocketEnum.roomLeave, { roomId });
      dispatch(disconnectVideoSocket());
    };
  }, [roomId, user?.email, dispatch, user?.uid, user?.username, user?.profileImage]);

  // Timer Tick Mechanism
  useEffect(() => {
    if (isVideoCallTimerRunning) {
      const interval = setInterval(() => {
        dispatch(updateVideoCallTimer());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVideoCallTimerRunning, dispatch]);

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

  const handleEndCall = async () => {
    if (!user || !roomId) {
      toast.error('Something went wrong, please try again');
      return;
    }

    const currentTime = new Date();

    const data: JoinRoomCallbackRequest = {
      joined: true,
      leftCallTime: currentTime,
      videoCallRoomId: roomId,
    };

    try {
      const res = await joinOrLeft(data);

      if (res.success) {
        toast.success('You left meet successfully');
        myStream?.getTracks().forEach((t) => t.stop());
        peer.peer.close();
        videoSocket?.emit('room:leave', { roomId });
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
          dispatch(
            stopVideoCallTimer({
              remainingTime: videoCallRemainingTime,
              roomId,
            }),
          );
        } else {
          dispatch(
            stopVideoCallTimer({
              remainingTime: 0,
              roomId: null,
            }),
          );
        }

        goTo(redirectPaths.BOOKINGS, true);
      } else {
        toast.error(res.message || 'Unable to join, please try again');
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('error : ', error);
      }
      toast.error('Please try again');
    }
  };

  return {
    myVideoRef,
    remoteVideoRef,
    remoteStream,
    remoteUserName,
    isCameraOn,
    isMicOn,
    isVideoCallTimerRunning,
    formattedTimer: formatTime(videoCallRemainingTime),
    toggleCamera,
    toggleMic,
    handleEndCall,
  };
};
