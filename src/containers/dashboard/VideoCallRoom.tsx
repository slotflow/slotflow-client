import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Clock,
  ShieldCheck,
  Users,
  Settings,
  User,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoCallRoom } from '@/hooks/useVideoCallRoom';

const VideoCallRoom = () => {
  const {
    myVideoRef,
    remoteVideoRef,
    remoteStream,
    remoteUserName,
    isCameraOn,
    isMicOn,
    isVideoCallTimerRunning,
    formattedTimer,
    toggleCamera,
    toggleMic,
    handleEndCall,
  } = useVideoCallRoom();

  return (
    <div className="relative h-full w-full text-foreground flex flex-col justify-between overflow-hidden selection:bg-primary/20 selection:text-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full justify-between gap-6"
      >
        <header className="w-full flex items-center justify-between bg-card/40 backdrop-blur-2xl border border-border/50 rounded-2xl px-6 py-3.5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Encrypted Call</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Protected session</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/60 shadow-inner">
            <Clock className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-mono font-bold tracking-wide text-foreground">
              {isVideoCallTimerRunning ? formattedTimer : '00:00'}
            </span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center my-auto">
          <div className="relative w-full aspect-video rounded-3xl bg-gradient-to-b from-border/80 via-border/30 to-border/10 shadow-2xl backdrop-blur-xl group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-violet-600/30 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-700 pointer-events-none" />

            <div className="relative w-full h-full bg-card/80 backdrop-blur-2xl rounded-2xl overflow-hidden flex items-center justify-center border border-border/40 shadow-inner">
              <video
                ref={myVideoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover rounded-2xl scale-x-[-1] transition-opacity duration-500 ${
                  isCameraOn ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/40 text-xs font-medium shadow-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCameraOn ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'
                    }`}
                  />
                  <span className="text-foreground/90 font-semibold">You</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/40 text-xs font-medium shadow-sm">
                  {isMicOn ? (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Mic On</span>
                    </>
                  ) : (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-destructive" />
                      <span className="text-destructive font-medium">Mic Off</span>
                    </>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {!isCameraOn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl z-10 p-6 text-center"
                  >
                    <div className="relative mb-3">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-violet-500/20 flex items-center justify-center border border-primary/20 shadow-xl">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <span className="absolute bottom-0 right-0 p-1.5 bg-destructive rounded-full text-white shadow-md">
                        <VideoOff className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="text-base font-semibold tracking-tight text-foreground/90">
                      Your Camera is Off
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative w-full aspect-video rounded-3xl bg-gradient-to-b from-border/80 via-border/30 to-border/10 shadow-2xl backdrop-blur-xl group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-violet-600/30 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-700 pointer-events-none" />

            <div className="relative w-full h-full bg-card/80 backdrop-blur-2xl rounded-2xl overflow-hidden flex items-center justify-center border border-border/40 shadow-inner">
              {remoteStream ? (
                <>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-2xl scale-x-[-1]"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-border/40 text-xs font-semibold text-foreground shadow-sm">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span>{remoteUserName || 'Participant'}</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center border border-border/40 shadow-inner">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold tracking-tight text-foreground/90">
                      Waiting for participant...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      The video stream will connect automatically when they join.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md mx-auto flex items-center justify-between gap-4 bg-card/60 backdrop-blur-xl p-3 px-6 rounded-2xl border border-border/50"
          >
            <Button
              title={isCameraOn ? 'Turn Video Off' : 'Turn Video On'}
              onClick={toggleCamera}
              variant={isCameraOn ? 'secondary' : 'destructive'}
              size="icon"
            >
              {isCameraOn ? (
                <Video className="size-5 text-foreground transition-transform group-hover:scale-110" />
              ) : (
                <VideoOff className="size-5 transition-transform group-hover:scale-110" />
              )}
            </Button>

            <Button
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
              onClick={toggleMic}
              variant={isMicOn ? 'secondary' : 'destructive'}
              size="icon"
            >
              {isMicOn ? (
                <Mic className="size-5 text-foreground transition-transform group-hover:scale-110" />
              ) : (
                <MicOff className="size-5 transition-transform group-hover:scale-110" />
              )}
            </Button>

            <Button title="Audio and Video Settings" variant="outline" size="icon">
              <Settings className="size-5" />
            </Button>

            <Button title="End Call" onClick={handleEndCall} variant="destructive">
              <PhoneOff className="size-5" />
              <span>Leave</span>
            </Button>
          </motion.div>
        </footer>
      </motion.div>
    </div>
  );
};

export default VideoCallRoom;
