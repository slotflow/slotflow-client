import MainLayout from './MainLayout';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/interface/enums';
import { RootState } from '@/shared/redux/appStore';
import ReviewForm from '@/components/user/ReviewForm';
import { Outlet, useLocation } from 'react-router-dom';
import { getRoutesByRole } from '@/shared/helper/getRouteByRole';
import PaymentSelection from '@/components/payment/PaymentSelection';
import FilterRightSideBar from '@/components/filters/FilterRightSideBar';
import NotificationsContainer from '@/components/notification/NotificationsContainer';

const UserLayout = () => {
  const location = useLocation();
  const user = useSelector((store: RootState) => store.auth.authUser);
  const isReviewCreateFormOpen = useSelector(
    (store: RootState) => store.user.isReviewCreateFormOpen,
  );
  const isPaymentSelectionOpen = useSelector((store: RootState) => store.payment.isOpen);
  const userRoutes = getRoutesByRole(Role.PROVIDER);

  return (
    <MainLayout
      routes={userRoutes}
      profileImage={user?.profileImage}
      username={user?.username}
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
