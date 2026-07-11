import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Role } from "@/shared/interface/enums";
import { RootState } from "@/shared/redux/appStore";
import { Outlet, useNavigate } from "react-router-dom";
import WorldMapWrapper from "@/components/map/WorldMapWrapper";
// import AnimatedBeamIntegrations from "@/components/animation/AnimatedCircleWithBeam";

const AuthLayout: React.FC = () => {

  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const lightTheme: boolean = useSelector((state: RootState) => state.app.lightTheme);

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
    <div className="h-screen flex">
      <div className={`w-full md:w-6/12 lg:w-4/12 flex justify-center items-center ${lightTheme ? "bg-[#f5f5f5]" : "bg-[#171717]"}`}>
        <Outlet />
      </div>

      <div className="w-0 md:w-6/12 lg:w-8/12 relative flex h-full items-center justify-center overflow-hidden bg-background">
        {/* <div className={`absolute w-full flex h-full ${active === "beam" ? "block" : "hidden"
            }`}
        >
          <AnimatedBeamIntegrations />
        </div> */}
        <div className={`absolute w-full flex h-full`}
        >
          <WorldMapWrapper />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
