import { toast } from "react-toastify";
import { RootState } from "../redux/appStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventSocketEnum } from "../interface/socket.interface";
import { destroyEventSocket, getEventSocket } from "@/lib/socketService";
import { ProviderSubscriptionActivated } from "../interface/api/providerApiInterface";
import { setEventSocketConnected, setEventSocketDisconnected, setSubscription } from "../redux/slices/authSlice";

export const connectEventSocket = createAsyncThunk<
    void,
    void,
    { state: RootState }
>("event/connectSocket", async (_, { getState, dispatch }) => {
    const { authUser } = getState().auth;

    if (!authUser) return;

    const socket = getEventSocket();
    socket.removeAllListeners();

    socket.on(EventSocketEnum.connect, () => {
        console.log("Event socket connected:", socket.id);
        dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.io.on(EventSocketEnum.reconnect, () => {
        console.log("Event socket reconnected:", socket.id);
        dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.on(EventSocketEnum.disconnect, (reason) => {
        console.log("Event socket disconnected:", reason);
        dispatch(setEventSocketDisconnected());
    });

    socket.on(EventSocketEnum.subscriptionActivated, (payload: ProviderSubscriptionActivated) => {
        console.log("Subscription activated:", payload);

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