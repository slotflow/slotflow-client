import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store/appStore';
import { Booking } from '@/shared/types/entity/booking';
import { Payment } from '@/shared/types/entity/payment';
import { validateRoomId } from '@/services/apis/booking';
import { ValidateRoomId } from '@/shared/types/api/booking';
import { Subscription } from '@/shared/types/entity/subscription';
import { useRoleBasedNavigationReturn } from '@/shared/types/hooks';

export const useRoleBasedNavigation = (): useRoleBasedNavigationReturn => {
  const navigate = useNavigate();
  const { authUser } = useSelector((state: RootState) => state.auth);

  const handleAdminGetProviderDetailPage = (subscriptionId: Subscription['_id']) => {
    if (authUser?.role === Role.ADMIN) {
      navigate(`/admin/subscriptions/${subscriptionId}`);
    } else if (authUser?.role === Role.PROVIDER) {
      navigate(`/provider/subscriptions/${subscriptionId}`);
    }
  };

  const handleGetPaymentDetailsPage = (paymentId: Payment['_id']) => {
    if (authUser?.role === Role.ADMIN) {
      navigate(`/admin/payments/${paymentId}`);
    } else if (authUser?.role === Role.PROVIDER) {
      navigate(`/provider/payments/${paymentId}`);
    } else if (authUser?.role === Role.USER) {
      navigate(`/user/payments/${paymentId}`);
    }
  };

  const JoinCallHandler = async ({
    appointmentId,
    roomId,
  }: ValidateRoomId): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await validateRoomId({ appointmentId, roomId });
      if (res.success) {
        if (authUser?.role === Role.PROVIDER) {
          navigate(`/provider/video-call-lobby/${roomId}`);
        } else if (authUser?.role === Role.USER) {
          navigate(`/user/video-call-lobby/${roomId}`);
        }
        return { success: true, message: res.message || 'Redirecting to video call...' };
      }
      return { success: false, message: res.message || 'Invalid Room ID' };
    } catch {
      return {
        success: false,
        message: 'Invalid Request, please try again after sometimes.',
      };
    }
  };

  const handleNavigateToBookingsDetailPage = (appointmentId: Booking['_id']) => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(`/provider/bookings/${appointmentId}`);
    } else if (authUser?.role === Role.USER) {
      navigate(`/user/bookings/${appointmentId}`);
    }
  };

  return {
    handleAdminGetProviderDetailPage,
    handleGetPaymentDetailsPage,
    JoinCallHandler,
    handleNavigateToBookingsDetailPage,
  };
};
