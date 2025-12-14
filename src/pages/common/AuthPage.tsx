import gsap from "gsap";
import { useSelector } from "react-redux";
import { Meteors } from "@/components/ui/meteors";
import { RootState } from "@/utils/redux/appStore";
import React, { useEffect, useRef, useState } from "react";
import { RoleType } from "@/utils/interface/commonInterface";
import LoginForm from "@/components/form/CommonForms/LoginForm";
import SignUpForm from "@/components/form/CommonForms/SignUpForm";
import WorldMapWrapper from "@/components/common/WorldMapWrapper";
import { useAuthCheckInLogin } from "@/utils/hooks/useAuthCheckInLogin";
import ResetPasswordForm from "@/components/form/CommonForms/ResetPasswordForm";
import OtpVerificatioForm from "@/components/form/CommonForms/OtpVerificatioForm";
import AnimatedBeamIntegrations from "@/components/common/AnimatedCircleWithBeam";
import EmailVerificationForm from "@/components/form/CommonForms/EmailVerificationForm";

interface AuthPageProp {
  role: RoleType;
  formType: number;
}

const AuthPage: React.FC<AuthPageProp> = ({ role, formType }) => {

  useAuthCheckInLogin();

  const beamRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<"beam" | "map">("beam");
  const lightTheme: boolean = useSelector((state: RootState) => state.app.lightTheme);

  console.log("lightTheme : ",lightTheme);

  useEffect(() => {
    const fadeInOut = (el: HTMLDivElement, onComplete: () => void) => {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.fromTo(
        el,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
        .to({}, { duration: 3 })
        .to(el, {
          opacity: 0,
          y: -80,
          duration: 1.2,
          ease: "power3.in",
        });

      return tl;
    };

    let loop = true;

    const cycle = () => {
      if (!loop) return;

      if (active === "beam" && beamRef.current) {
        fadeInOut(beamRef.current, () => {
          setActive("map");
          setTimeout(cycle, 50);
        });
      } else if (active === "map" && mapRef.current) {
        fadeInOut(mapRef.current, () => {
          setActive("beam");
          setTimeout(cycle, 50);
        });
      }
    };

    cycle();
    return () => {
      loop = false;
      gsap.killTweensOf("*");
    };
  }, [active]);

  const formMap: Record<number, React.ReactNode> = {
    0: <LoginForm role={role} />,
    1: <SignUpForm role={role} />,
    2: <EmailVerificationForm role={role} />,
    3: <ResetPasswordForm role={role} />,
    4: <OtpVerificatioForm role={role} />,
  };

  return (
    <div className="h-[100vh] flex">

      <div className={`w-full md:w-6/12 lg:w-4/12 flex justify-center items-center ${lightTheme ? "bg-[#f5f5f5]" : "bg-[#171717]"}`}>
        {role === "ADMIN" ? formMap[0] : formMap[formType]}
      </div>

      <div className="w-0 md:w-6/12 lg:w-8/12 relative flex h-full items-center justify-center overflow-hidden bg-[var(--background)]">
        <Meteors number={30} />

        <div
          ref={beamRef}
          className={`absolute w-full flex h-full ${
            active === "beam" ? "block" : "hidden"
          }`}
        >
          <AnimatedBeamIntegrations />
        </div>

        <div
          ref={mapRef}
          className={`absolute w-full flex h-full ${
            active === "map" ? "block" : "hidden"
          }`}
        >
          <WorldMapWrapper />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
