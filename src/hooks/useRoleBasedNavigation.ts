import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store/appStore';
import { User } from '@/shared/types/entity/user';
import { Booking } from '@/shared/types/entity/booking';
import { Payment } from '@/shared/types/entity/payment';
import { Plan } from '@/shared/types/entity/planInterface';
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

  const handleNavigateToBookingsDetailPage = (appointmentId: Booking['_id']) => {
    if (authUser?.role === Role.PROVIDER) {
      navigate(`/provider/bookings/${appointmentId}`);
    } else if (authUser?.role === Role.USER) {
      navigate(`/user/bookings/${appointmentId}`);
    }
  };

  const handleNavigateToPlanDetailPage = (planId: Plan['_id']) => {
    navigate(`/admin/plans/${planId}`);
  };

  const handleGetProviderDetailPage = (providerId: string) => {
    navigate(`/admin/service-providers/${providerId}`);
  };

  const handleGetUserDetailPage = (userId: User['_id']) => {
    navigate(`/admin/users/${userId}`);
  };

  return {
    handleAdminGetProviderDetailPage,
    handleGetPaymentDetailsPage,
    handleNavigateToBookingsDetailPage,
    handleNavigateToPlanDetailPage,
    handleGetProviderDetailPage,
    handleGetUserDetailPage,
  };
};
