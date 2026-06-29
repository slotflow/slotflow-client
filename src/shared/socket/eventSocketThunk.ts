import { toast } from "react-toastify";
import { RootState } from "../redux/appStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventSocketEnum } from "../interface/socket.interface";
import { SubscriptionActivated } from "../interface/api/subscription";
import { destroyEventSocket, getEventSocket } from "@/lib/socketService";
import { StripeAccountStatusUpdatedPayload } from "../interface/api/user";
import { setEventSocketConnected, setEventSocketDisconnected, setStripeAccountStatus, setSubscription } from "../redux/slices/authSlice";

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

    socket.on(EventSocketEnum.subscriptionActivated, (payload: SubscriptionActivated) => {
        console.log("Subscription activated:", payload);

        const isOwner = payload.userId === authUser.uid;
        const isExpired = new Date(payload.endDate) < new Date();

        if (isOwner && isExpired) {
            toast.error("Your subscription has expired.");
        } else if (isOwner) {
            toast.success("Subscription Activated!");
        }

        dispatch(setSubscription(payload));
    });

    socket.on(EventSocketEnum.stripeAccountStatusUpdated, (payload: StripeAccountStatusUpdatedPayload) => {
        console.log("Stripe account status updated:", payload);

        const isOwner = payload.userId === authUser.uid;

        if (isOwner) {
            if(authUser.stripeAccountStatus !== payload.stripeAccountStatus) {
                toast.success("Stripe account status updated!");
                dispatch(setStripeAccountStatus(payload.stripeAccountStatus))
            } else {
                toast.info("Stripe account status updated!");
            }
        }
    })

});

export const disconnectEventSocket = createAsyncThunk(
    "event/disconnectSocket",
    async (_, { dispatch }) => {
        destroyEventSocket();
        dispatch(setEventSocketDisconnected());
    }
);