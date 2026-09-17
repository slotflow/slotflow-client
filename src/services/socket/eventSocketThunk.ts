import {
  setSubscription,
  setEventSocketConnected,
  setEventSocketDisconnected,
} from '@/app/store/slices/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '@/app/store/appStore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EventSocketEnum } from '@/shared/types/socket';
import { SubscriptionActivated } from '@/shared/types/api/subscription';
import { destroyEventSocket, getEventSocket } from '@/lib/socketService';
import { StripeAccountStatusUpdatedPayload } from '@/shared/types/api/user';
import { setStripeAccountStatus } from '@/app/store/slices/integrationSlice';

export const connectEventSocket = createAsyncThunk<void, void, { state: RootState }>(
  'event/connectSocket',
  async (_, { getState, dispatch }) => {

    const { authUser } = getState().auth;
    const { stripeAccountStatus } = getState().integration;

    if (!authUser) return;

    const socket = getEventSocket();
    socket.removeAllListeners();

    socket.on(EventSocketEnum.connect, () => {
      console.log('Event socket connected:', socket.id);
      dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.io.on(EventSocketEnum.reconnect, () => {
      console.log('Event socket reconnected:', socket.id);
      dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.on(EventSocketEnum.disconnect, (reason) => {
      console.log('Event socket disconnected:', reason);
      dispatch(setEventSocketDisconnected());
    });

    socket.on(EventSocketEnum.subscriptionActivated, (payload: SubscriptionActivated) => {
      console.log('Subscription activated:', payload);

      const isOwner = payload.userId === authUser.uid;
      if (isOwner) {
        const isExpired = new Date(payload.endDate) < new Date();

        if (isExpired) {
          toast.error('Your subscription has expired.');
        } else {
          toast.success('Subscription Activated!');
        }

        dispatch(setSubscription(payload));
      }
    });

    socket.on(
      EventSocketEnum.stripeAccountStatusUpdated,
      (payload: StripeAccountStatusUpdatedPayload) => {
        console.log('Stripe account status updated:', payload);

        const isOwner = payload.userId === authUser.uid;

        if (isOwner) {
          if (stripeAccountStatus !== payload.stripeAccountStatus) {
            toast.success('Stripe account status updated!');
            dispatch(setStripeAccountStatus(payload.stripeAccountStatus));
          } else {
            toast.info('Stripe account status updated!');
          }
        }
      },
    );
  },
);

export const disconnectEventSocket = createAsyncThunk(
  'event/disconnectSocket',
  async (_, { dispatch }) => {
    destroyEventSocket();
    dispatch(setEventSocketDisconnected());
  },
);
