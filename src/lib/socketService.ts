import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;
export let videoSocket: Socket | null = null;
export let eventSocket: Socket | null = null;

export const createChatSocket = (userId: string, baseUrl: string) => {
  if (!socket) {
    socket = io(baseUrl, { query: { userId }, path: '/chat', autoConnect: true });
  }
  return socket;
};

export const distroyChatSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const createVideoSocket = (userId: string, baseUrl: string) => {
  if (!videoSocket) {
    videoSocket = io(baseUrl, { query: { userId }, path: "/video", autoConnect: true });
  }
  return videoSocket;
};

export const destroyVideoSocket = () => {
  if (videoSocket?.connected) {
    videoSocket.disconnect();
    videoSocket = null;
  }
};

export const createEventSocket = (baseUrl: string) => {
  console.log("createEventSocket");
  if (!eventSocket) {
    console.log("creating event Socket");
    console.log("baseUrl : ",baseUrl);
    eventSocket = io(baseUrl, { path: "/api/v1/events", autoConnect: true, withCredentials: true });
  }
  return eventSocket;
};

export const destroyEventSocket = () => {
  if (eventSocket) {
    console.log("destroying event socket");
    eventSocket.disconnect();
    eventSocket = null;
  }
};