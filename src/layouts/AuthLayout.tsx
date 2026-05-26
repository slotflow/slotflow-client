import gsap from "gsap";
import { useSelector } from "react-redux";
import { Role } from "@/shared/interface/enums";
import { Meteors } from "@/components/ui/meteors";
import { RootState } from "@/shared/redux/appStore";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import WorldMapWrapper from "@/components/map/WorldMapWrapper";
import AnimatedBeamIntegrations from "@/components/animation/AnimatedCircleWithBeam";

const AuthLayout: React.FC = () => {

  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const beamRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<"beam" | "map">("beam");
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

  return (
    <div className="h-[100vh] flex">
      <div className={`w-full md:w-6/12 lg:w-4/12 flex justify-center items-center ${lightTheme ? "bg-[#f5f5f5]" : "bg-[#171717]"}`}>
        <Outlet />
      </div>

      <div className="w-0 md:w-6/12 lg:w-8/12 relative flex h-full items-center justify-center overflow-hidden bg-[var(--background)]">
        <Meteors number={30} />

        <div
          ref={beamRef}
          className={`absolute w-full flex h-full ${active === "beam" ? "block" : "hidden"
            }`}
        >
          <AnimatedBeamIntegrations />
        </div>
        <div
          ref={mapRef}
          className={`absolute w-full flex h-full ${active === "map" ? "block" : "hidden"
            }`}
        >
          <WorldMapWrapper />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
