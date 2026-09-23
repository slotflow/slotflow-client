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
import { useMemo } from 'react';
import { filterShowsRoutes } from '@/shared/utils/constants';

const UserLayout = () => {
  const location = useLocation();
  const user = useSelector((store: RootState) => store.auth.authUser);
  const isReviewCreateFormOpen = useSelector(
    (store: RootState) => store.user.isReviewCreateFormOpen,
  );
  const isPaymentModalOpen = useSelector((store: RootState) => store.payment.isPaymentModalOpen);
  const userRoutes = getRoutesByRole(Role.USER);

   const canShowFilter = useMemo(() => {
      return filterShowsRoutes.some((route) => location.pathname.startsWith(route));
    }, [location.pathname]);

  return (
    <MainLayout
      routes={userRoutes}
      // rightSidebar={location.pathname === '/user/services' ? <FilterRightSideBar /> : null}
      rightSidebar={canShowFilter && <FilterRightSideBar />}
    >
      <Outlet />
      {isReviewCreateFormOpen && <ReviewForm />}
      {isPaymentModalOpen && user?.role === Role.USER && <PaymentSelection />}
      <NotificationsContainer />
    </MainLayout>
  );
};

export default UserLayout;
