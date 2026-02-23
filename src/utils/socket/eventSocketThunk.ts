// eventSocketThunk.ts
// --------------------------------------------------
// This file connects socket to Redux lifecycle.
// All event listeners are attached here ONLY ONCE.
// Pages should NEVER directly attach listeners.
// --------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { destroyEventSocket, getEventSocket } from "@/lib/socketService";
import { RootState } from "../redux/appStore";
import { setEventSocketConnected, setEventSocketDisconnected, setSubscription } from "../redux/slices/authSlice";
import { ProviderSubscriptionActivated } from "../interface/api/providerApiInterface";

export const connectEventSocket = createAsyncThunk<
    void,
    void,
    { state: RootState }
>("event/connectSocket", async (_, { getState, dispatch }) => {
    const { authUser, eventSocketId, eventSocketIsConnected } = getState().auth;

    console.log("eventSocketId : ",eventSocketId);
    console.log("eventSocketIsConnected : ",eventSocketIsConnected);

    // If user not logged in, do not connect
    if (!authUser) return;

    const socket = getEventSocket();

    // Remove old listeners to avoid duplication
    socket.removeAllListeners();

    // ===============================
    // CONNECTION HANDLERS
    // ===============================

    socket.on("connect", () => {
        console.log("✅ Event socket connected:", socket.id);
        dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.io.on("reconnect", () => {
        console.log("🔁 Event socket reconnected:", socket.id);
        dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.on("disconnect", (reason) => {
        console.log("❌ Event socket disconnected:", reason);
        dispatch(setEventSocketDisconnected());
    });

    // ===============================
    // BUSINESS EVENT HANDLERS
    // ===============================

    socket.on("subscription:activated", (payload: ProviderSubscriptionActivated) => {
        console.log("📦 Subscription activated:", payload);

        const isOwner = payload.providerId === authUser.uid;
        const isExpired = new Date(payload.endDate) < new Date();

        if (isOwner && isExpired) {
            toast.error("Your subscription has expired.");
        } else if (isOwner) {
            toast.success("Subscription Activated!");
        }

        dispatch(setSubscription(payload));
    });
});

export const disconnectEventSocket = createAsyncThunk(
    "event/disconnectSocket",
    async (_, { dispatch }) => {
        destroyEventSocket();
        dispatch(setEventSocketDisconnected());
    }
);