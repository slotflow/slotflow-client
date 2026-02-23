import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;
export let videoSocket: Socket | null = null;
export let eventSocket: Socket | null = null;

export const createChatSocket = (userId: string, baseUrl: string) => {
  if (!socket) {
    socket = io(`${baseUrl}/chat`, { query: { userId }, path: '/socket.io', autoConnect: true, withCredentials: true });
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
    videoSocket = io(`${baseUrl}/video`, { query: { userId }, path: "/socket.io", autoConnect: true, withCredentials: true });
  }
  return videoSocket;
};

export const destroyVideoSocket = () => {
  if (videoSocket?.connected) {
    videoSocket.disconnect();
    videoSocket = null;
  }
};

// export const createEventSocket = (baseUrl: string) => {
//   console.log("createEventSocket");
//   if (!eventSocket) {
//     console.log("creating event Socket");
//     console.log("baseUrl : ", baseUrl);
//     eventSocket = io(`${baseUrl}/events`, { path: "/socket.io", autoConnect: true, withCredentials: true });
//   }
//   return eventSocket;
// };


/**
 * Creates (or returns existing) event namespace socket.
 * This function guarantees a SINGLE instance.
 */
export const getEventSocket = (): Socket => {
  if (!eventSocket) {
    eventSocket = io(`http://localhost:3000/events`, {
      path: "/socket.io",        // must match backend
      withCredentials: true,     // required for cookie-based JWT
      autoConnect: true,         // connect immediately
      transports: ["websocket"], // optional: force websocket
    });
  }

  return eventSocket;
};

/**
 * Disconnects and clears the socket instance.
 * Used on logout or app cleanup.
 */
export const destroyEventSocket = (): void => {
  if (eventSocket) {
    eventSocket.removeAllListeners(); // prevent memory leaks
    eventSocket.disconnect();
    eventSocket = null;
  }
};