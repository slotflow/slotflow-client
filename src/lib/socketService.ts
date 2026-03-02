import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;
export let videoSocket: Socket | null = null;
export let eventSocket: Socket | null = null;

export const getChatSocket = () => {
  if (!socket) {
    socket = io(`http://localhost:3000/chat`, {
      path: "/socket.io",
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket"],
    });
  }
  return socket;
};

export const distroyChatSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const getVideoSocket = () => {
  if (!videoSocket) {
    videoSocket = io(`http://localhost:3000/video`, {
      path: "/socket.io",
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket"],
    });
  }
  return videoSocket;
};

export const destroyVideoSocket = () => {
  if (videoSocket?.connected) {
    videoSocket.disconnect();
    videoSocket = null;
  }
};



export const getEventSocket = (): Socket => {
  if (!eventSocket) {
    eventSocket = io(`http://localhost:3000/events`, {
      path: "/socket.io",
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket"],
    });
  }

  return eventSocket;
};

export const destroyEventSocket = (): void => {
  if (eventSocket) {
    eventSocket.removeAllListeners();
    eventSocket.disconnect();
    eventSocket = null;
  }
};