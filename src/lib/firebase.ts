import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/shared/config/env";
import { getMessaging } from "firebase/messaging";


export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

