import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/env";
import { getMessaging } from "firebase/messaging";


export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

