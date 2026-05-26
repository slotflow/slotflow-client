import { appConfig } from "../config/env";
import { toast } from "react-toastify";

export const toggleMediaTrack = async ({
  kind,
  stream,
  setStream,
  isOn,
  setIsOn,
  videoRef,
  peerConnection,
}: {
  kind: "video" | "audio";
  stream: MediaStream | null;
  setStream: (s: MediaStream) => void;
  isOn: boolean;
  setIsOn: (v: boolean) => void;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  peerConnection?: RTCPeerConnection;
}) => {
  if (isOn) {
    stream?.getTracks()
      .filter(t => t.kind === kind)
      .forEach(t => t.stop());

    setIsOn(false);
    return;
  }

  try {
    const newStream = await navigator.mediaDevices.getUserMedia({
      [kind]: true,
    });

    const newTrack = newStream.getTracks()[0];

    if (!stream) {
      const freshStream = new MediaStream([newTrack]);
      setStream(freshStream);

      if (videoRef?.current) {
        videoRef.current.srcObject = freshStream;
      }
    } else {
      stream.getTracks()
        .filter(t => t.kind === kind)
        .forEach(t => stream.removeTrack(t));

      stream.addTrack(newTrack);

      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
      }
    }

    if (peerConnection) {
      const sender = peerConnection
        .getSenders()
        .find(s => s.track?.kind === kind);

      if (sender) {
        sender.replaceTrack(newTrack);
      }
    }

    setIsOn(true);
  } catch (err) {
    toast.error(`Failed to turn on ${kind}`);
    if (appConfig.isDevelopment) {
      console.error(`Cannot turn on ${kind}:`, err);
    } 
  }
};