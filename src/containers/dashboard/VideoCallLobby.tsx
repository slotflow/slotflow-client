import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  ShieldCheck,
  Wifi,
  Settings,
  Users,
  Copy,
  Check,
  ArrowRight,
  Info,
  LoaderCircle
} from 'lucide-react';
import { useCopy } from '@/hooks/useCopy';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useJVideoCallLobby } from '@/hooks/useJVideoCallLobby';

const VideoCallLobby = () => {

  const { copied, copy } = useCopy();
  const {
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
    isJoiningVideoCall, } = useJVideoCallLobby();

  const roomUserNames = roomUsers.map(({ user }) => user?.name || 'Participant');

  return (
    <div className="relative min-h-full w-full text-foreground flex items-center justify-center overflow-hidden selection:bg-primary/20 selection:text-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-3xl aspect-video rounded-3xl bg-gradient-to-b from-border/80 via-border/30 to-border/10 shadow-md backdrop-blur-xl group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-violet-600/30 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-700 pointer-events-none" />

            <div className="relative w-full h-full bg-card/80 backdrop-blur-2xl rounded-md overflow-hidden flex items-center justify-center border border-border/40 shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover rounded-md scale-x-[-1] transition-opacity duration-500 ${isCameraOn ? 'opacity-100' : 'opacity-0'
                  }`}
              />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/40 text-xs font-medium shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${isCameraOn ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
                    <span className="text-muted-foreground">{isCameraOn ? videoQuality : 'Camera Off'}</span>
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

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/40 text-xs font-medium text-muted-foreground shadow-sm">
                  <Wifi className={`w-3.5 h-3.5 ${networkStatus.color}`} />
                  <span>{networkStatus.label}</span>
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
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-violet-500/20 flex items-center justify-center border border-primary/20 shadow-md">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                      <span className="absolute bottom-0 right-0 p-1.5 bg-destructive rounded-full text-white shadow-md">
                        <VideoOff className="w-4 h-4" />
                      </span>
                    </div>

                    <p className="text-lg font-semibold tracking-tight text-foreground/90">Camera turned off</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                      Toggle video below to preview your camera stream before entering.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {isMicOn && (
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-2 rounded-full bg-background/70 backdrop-blur-md border border-border/40 shadow-sm">
                  <Mic className="w-3.5 h-3.5 text-emerald-500" />
                  <div className="flex items-end gap-0.5 h-3">
                    {audioLevels.map((height, idx) => (
                      <motion.span
                        key={idx}
                        className="w-0.5 bg-emerald-500 rounded-full"
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.05 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-3xl flex items-center gap-4 mt-6 bg-card/60 backdrop-blur-xl p-2.5 px-5 rounded-2xl border border-border/50 shadow-md"
          >
            <Button
              title={isCameraOn ? 'Turn Video Off' : 'Turn Video On'}
              onClick={toggleCamera}
              variant={isCameraOn ? 'secondary' : 'destructive'}
              size='icon'
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
              size='icon'
            >
              {isMicOn ? (
                <Mic className="size-5 text-foreground transition-transform group-hover:scale-110" />
              ) : (
                <MicOff className="size-5 transition-transform group-hover:scale-110" />
              )}
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-card/40 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 shadow-md relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to Join</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-foreground leading-tight">
              Start Your Meetings Seamlessly With Us.
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Check your camera and microphone options before jumping directly into the call.
            </p>

            {roomId && (
              <div className="mb-6 p-3.5 rounded-2xl bg-muted/40 border border-border/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="p-2 rounded-xl bg-background/80 border border-border/50 text-foreground">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Room ID</span>
                    <span className="text-xs font-mono font-medium truncate text-foreground">{roomId}</span>
                  </div>
                </div>

                <Button onClick={() => copy(roomId)} variant="outline" size="icon" className="cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            )}

            <div className="flex items-center gap-3 mb-8 p-3 rounded-2xl bg-background/30 border border-border/30">
              <div className="flex -space-x-2.5 overflow-hidden">
                {roomUsers.length > 0 ? (
                  roomUsers.map(({ id, user }) => {
                    const name = user?.name || 'Participant';
                    return (
                      <img
                        key={id}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                        src={user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
                        alt={name}
                        title={name}
                      />
                    );
                  })
                ) : (
                  <div className="h-8 w-8 rounded-full ring-2 ring-background bg-muted/50 flex items-center justify-center text-xs text-muted-foreground animate-pulse">
                    ?
                  </div>
                )}
              </div>

              <span className="text-xs text-muted-foreground font-medium">
                {roomUserNames.length === 0
                  ? 'No one has joined yet.'
                  : roomUserNames.length === 1
                    ? `${roomUserNames[0]} is in this call`
                    : `${roomUserNames.length} people are in this call`}
              </span>
            </div>

            <Button
              title="Join Now"
              variant='default'
              onClick={handleJoin}
              disabled={isJoiningVideoCall}
              className='w-full'
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="flex items-center justify-center gap-2">
                {isJoiningVideoCall ? (
                  <>
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                    <span>Joining Call...</span>
                  </>
                ) : (
                  <>
                    <span>Join Now</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </Button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>End-to-end encrypted connection</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoCallLobby;