import { messaging } from "@/lib/firebase";
import { onMessage } from "firebase/messaging";
import type { MessagePayload } from "firebase/messaging";

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
