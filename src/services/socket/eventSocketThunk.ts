import {
  setSubscription,
  setEventSocketConnected,
  setEventSocketDisconnected,
} from '@/app/store/slices/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '@/app/store/appStore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EventSocketEnum } from '@/shared/types/enums';
import { setStripeData } from '@/app/store/slices/integrationSlice';
import { SubscriptionActivated } from '@/shared/types/api/subscription';
import { destroyEventSocket, getEventSocket } from '@/lib/socketService';
import { StripeAccountStatusUpdatedPayload } from '@/shared/types/api/user';

export const connectEventSocket = createAsyncThunk<void, void, { state: RootState }>(
  'event/connectSocket',
  async (_, { getState, dispatch }) => {

    const { authUser } = getState().auth;
    const { stripe } = getState().integration;

    if (!authUser) return;

    const socket = getEventSocket();
    socket.removeAllListeners();

    socket.on(EventSocketEnum.connect, () => {
      dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.io.on(EventSocketEnum.reconnect, () => {
      dispatch(setEventSocketConnected({ socketId: socket.id! }));
    });

    socket.on(EventSocketEnum.disconnect, (reason) => {
      dispatch(setEventSocketDisconnected());
    });

    socket.on(EventSocketEnum.subscriptionActivated, (payload: SubscriptionActivated) => {

      const isOwner = payload.userId === authUser.uid;
      if (isOwner) {
        const isExpired = new Date(payload.currentPeriodEnd) < new Date();

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

        const isOwner = payload.userId === authUser.uid;

        if (isOwner) {
          if (stripe.status !== payload.stripeAccountStatus) {
            toast.success('Stripe account status updated!');
            dispatch(setStripeData({
              isConnecting: false,
              status: payload.stripeAccountStatus
            }));
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
