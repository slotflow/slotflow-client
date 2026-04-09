import { useSelector } from "react-redux";
import MainLayout from "./MainLayout";
import { RootState } from "@/shared/redux/appStore";
import { userRoutes } from "@/shared/utils/constants";
import ReviewForm from "@/components/user/ReviewForm";
import { Outlet, useLocation } from "react-router-dom";
import FilterRightSideBar from "@/components/filters/FilterRightSideBar";
import NotificationsContainer from "@/components/notification/NotificationsContainer";

const UserLayout = () => {

  const location = useLocation();
  const user = useSelector((store: RootState) => store.auth.authUser);
  const { isReviewCreateFormOpen } = useSelector((store: RootState) => store.user);

  return (
    <MainLayout
      routes={userRoutes}
      profileImage={user?.profileImage}
      username={user?.username}
      rightSidebar={
        location.pathname === "/user/dashboard" ? <FilterRightSideBar /> : null
      }
    >
      <Outlet />
      {isReviewCreateFormOpen && <ReviewForm />}
      <NotificationsContainer />
    </MainLayout>
  )
}

export default UserLayout;