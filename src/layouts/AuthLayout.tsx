import { Sparkle } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContent from "@/components/auth/AuthContent";
import SectionHeading from "@/components/common/SectionHeading";
import FloatingCards from "@/components/auth/AuthRightSide/FloatingCards";


const AuthLayout: React.FC = () => {

  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  useEffect(() => {
    if (authUser?.isLoggedIn) {
      if (authUser.role === Role.ADMIN) {
        navigate("/admin/dashboard");
      } else if (authUser.role === Role.USER) {
        navigate("/user/dashboard");
      } else if (authUser.role === Role.PROVIDER) {
        navigate("/provider/dashboard");
      }
    }
  }, [authUser, navigate]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="flex h-screen">
        <section className="flex w-full items-center justify-center lg:w-5/12">
          <AuthContent
          >
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
                  Book <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">Appointments</span>
                  <br />

                  <span className="">
                    without the hassle.
                  </span>
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
