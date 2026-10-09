import { Sparkle } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { RootState } from '@/app/store/appStore';
import { Outlet, useLocation } from 'react-router-dom';
import AuthContent from '@/components/auth/AuthContent';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import SectionHeading from '@/components/common/SectionHeading';
import FloatingCards from '@/components/auth/AuthRightSide/FloatingCards';

const AuthLayout = () => {
  const { goTo } = useAppNavigation();
  const location = useLocation();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useEffect(() => {
    if (authUser?.isLoggedIn) {
      if (
        (authUser.role === Role.ADMIN || authUser.role === Role.PROVIDER) &&
        location.pathname !== '/dashboard'
      ) {
        goTo(redirectPaths.DASHBOARD);
      } else if (authUser.role === Role.USER && location.pathname !== '/services') {
        goTo(redirectPaths.SERVICES);
      }
    }
  }, [authUser, location.pathname, goTo]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="flex h-screen">
        <section className="flex w-full items-center justify-center lg:w-5/12">
          <AuthContent>
            <Outlet />
          </AuthContent>
        </section>
        <section className=" bg-gradient-to-r from-slate-50 to-gray-300 dark:from-neutral-600 dark:to-neutral-800 relative hidden lg:flex lg:w-7/12 items-center justify-center overflow-hidden px-12">
          <div className="flex max-w-3xl flex-col items-center">
            <SectionHeading
              badge="Smart Appointment Booking Platform"
              badgeIcon={Sparkle}
              title={
                <span className="text-">
                  Book{' '}
                  <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                    Appointments
                  </span>
                  <br />
                  <span className="">without the hassle.</span>
                </span>
              }
              isAuth={true}
            />
            <FloatingCards />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
