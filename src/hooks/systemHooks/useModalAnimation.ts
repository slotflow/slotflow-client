import gsap from "gsap";
import { useEffect, useRef } from "react";

export const useModalAnimation = (onClose: (e: React.MouseEvent<HTMLButtonElement>) => void) => {
  
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
