import { appConfig } from '@/config/env';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/appStore';
import { useQueryClient } from '@tanstack/react-query';
import { UseBookingCustomHookReturn } from '@/shared/types/hooks';
import { toggleReviewCreateForm } from '@/app/store/slices/userSlice';
import { changeAppointmentStatusRequest } from '@/shared/types/api/booking';
import { cancelBooking, changeAppointmentStatus } from '@/services/apis/booking';

export const useBooking = (): UseBookingCustomHookReturn => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleReviewAddFormToggle = (
    e: React.MouseEvent<HTMLDivElement>,
    bookingId: string,
    providerId: string,
  ) => {
    e.preventDefault();
    dispatch(
      toggleReviewCreateForm({
        id: bookingId,
        isOpen: true,
        providerId: providerId,
      }),
    );
  };

  const changeAppointmentStatusHandler = async (data: changeAppointmentStatusRequest) => {
    try {
      const res = await changeAppointmentStatus(data);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['bookings'] });
      }
      return res;
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('Error in changeAppointmentStatusHandler', error);
      }
      return { success: false, message: 'Please try again' };
    }
  };

  const cancelBookingHandler = async (bookingId: string) => {
    try {
      const res = await cancelBooking(bookingId);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['bookings'] });
      }
      return res;
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log('Error in cancelBookingHandler ', error);
      }
      return { success: false, message: 'Please try again' };
    }
  };

  return {
    handleReviewAddFormToggle,
    changeAppointmentStatusHandler,
    cancelBookingHandler,
  };
};
