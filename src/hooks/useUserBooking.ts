import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/appStore';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { UseBookingCustomHookReturn } from '@/shared/types/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleReviewCreateForm } from '@/app/store/slices/userSlice';
import { handleError } from '@/shared/utils/helper/handleError';
import { cancelBooking, changeAppointmentStatus } from '@/services/apis/booking';
import { ApiBaseResponse, ApiError, ApiPaginatedResponse } from '@/shared/types/common';
import { CancelBookingRequest, CancelBookingResponse, ChangeAppointmentStatusRequest, ChangeAppointmentStatusResponse, FetchBookingsResponse } from '@/shared/types/api/booking';

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

  const changeAppointmentStatusMutation = useMutation<
    ApiBaseResponse<ChangeAppointmentStatusResponse>,
    ApiError,
    ChangeAppointmentStatusRequest
  >({
    mutationFn: async (data) => {
      if (!data.appointmentId || !data.appointmentStatus) {
        throw new Error('Booking details are missing, please refresh.');
      }
      return await changeAppointmentStatus(data);
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        const { _id, appointmentStatus } = res.data;
        toast.success(res.message || 'Appointment status updated successfully.');

        queryClient.setQueriesData<ApiPaginatedResponse<FetchBookingsResponse>>(
          { queryKey: [queryKeys.BOOKINGS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((booking) =>
                booking._id === _id
                  ? {
                    ...booking,
                    appointmentStatus: appointmentStatus,
                  }
                  : booking
              ),
            };
          }
        );
      } else {
        toast.error(res.message || 'Could not change status, please try again');
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Failed to update appointment status.');
    },
  });

  const cancelBookingMutation = useMutation<
    ApiBaseResponse<CancelBookingResponse>,
    ApiError,
    CancelBookingRequest
  >({
    mutationFn: async ({ bookingId }) => {
      if (!bookingId) {
        throw new Error('Invalid booking ID.');
      }
      return await cancelBooking({ bookingId });
    },
    onSuccess: (res) => {
      if (res.success && res.data) {
        const { _id, appointmentStatus } = res.data;
        toast.success(res.message || 'Booking cancelled successfully.');

        queryClient.setQueriesData<ApiPaginatedResponse<FetchBookingsResponse>>(
          { queryKey: [queryKeys.BOOKINGS] },
          (oldData) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.map((booking) =>
                booking._id === _id
                  ? {
                    ...booking,
                    appointmentStatus: appointmentStatus,
                  }
                  : booking
              ),
            };
          }
        );
      } else {
        toast.error(res.message || 'Could not cancel booking, please try again.');
      }
    },
    onError: (error: ApiError) => {
      handleError(error, 'Failed to cancel booking.');
    },
  })

  return {
    handleReviewAddFormToggle,
    changeAppointmentStatus: changeAppointmentStatusMutation.mutate,
    statusChangingAppointmentId: changeAppointmentStatusMutation.isPending ? changeAppointmentStatusMutation.variables.appointmentId : null,
    cancelBooking: cancelBookingMutation.mutate,
    isCancelling: cancelBookingMutation.isPending,
  };
};
