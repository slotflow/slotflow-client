import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RootState } from "@/shared/redux/appStore";
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { useVideoCallLobby } from "@/hooks/useJoinVideoCallLoby";

const LobbyPage = () => {

  const { roomId } = useParams();
  const { isCameraOn, isMicOn } = useSelector((state: RootState) => state.video);

  const {
    videoRef,
    toggleCamera,
    toggleMic,
    videoCallJoinHandler
  } = useVideoCallLobby({ roomId: roomId!, isCameraOn, isMicOn });

  // function to handle join video call
  const handleJoinVideoCall = async () => {
    const res = await videoCallJoinHandler();
    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  }

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
            title={isCameraOn ? "Video On" : "Video Off"}
            onClick={toggleCamera}
            variant={isCameraOn ? "default" : "destructive"}
            className="cursor-pointer"
          >
            {isCameraOn ? <Video /> : <VideoOff />}
          </Button>
          <Button
            title={isMicOn ? "Mic On" : "Mic Off"}
            onClick={toggleMic}
            variant={isMicOn ? "default" : "destructive"}
            className="cursor-pointer"
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>
        </div>
      </div>

      <div className="col-span-4 flex flex-col justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Start Your Meetings Seemlessly with Us.</h1>
        <p className="mb-6">
          Check your camera and microphone before joining the meeting.
        </p>
        <Button
          title="Join Now"
          onClick={handleJoinVideoCall}
          className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)]"
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default LobbyPage;
