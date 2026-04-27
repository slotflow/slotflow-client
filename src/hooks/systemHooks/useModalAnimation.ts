import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useModalAnimationParams, useModalAnimationReturn } from "@/shared/interface/hooksInterface";

export const useModalAnimation = ({
  onClose
}: useModalAnimationParams): useModalAnimationReturn => {
  
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: onClose,
      });
    }
  };

  return { modalRef, closeModal };
};
