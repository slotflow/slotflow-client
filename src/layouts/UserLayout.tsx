import MainLayout from './MainLayout';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { RootState } from '@/app/store/appStore';
import ReviewForm from '@/components/user/ReviewForm';
import { Outlet, useLocation } from 'react-router-dom';
import PaymentSelection from '@/components/payment/PaymentSelection';
import { getRoutesByRole } from '@/shared/utils/helper/getRouteByRole';
import FilterRightSideBar from '@/components/filters/FilterRightSideBar';
import NotificationsContainer from '@/components/notification/NotificationsContainer';

const UserLayout = () => {
  const location = useLocation();
  const user = useSelector((store: RootState) => store.auth.authUser);
  const isReviewCreateFormOpen = useSelector(
    (store: RootState) => store.user.isReviewCreateFormOpen,
  );
  const isPaymentSelectionOpen = useSelector((store: RootState) => store.payment.isOpen);
  const userRoutes = getRoutesByRole(Role.USER);

  return (
    <MainLayout
      routes={userRoutes}
      rightSidebar={location.pathname === '/user/dashboard' ? <FilterRightSideBar /> : null}
    >
      <Outlet />
      {isReviewCreateFormOpen && <ReviewForm />}
      {isPaymentSelectionOpen && user?.role === Role.USER && <PaymentSelection />}
      <NotificationsContainer />
    </MainLayout>
  );
};

export default UserLayout;
