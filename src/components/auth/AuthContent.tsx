import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AuthContent = ({
    children
}:{
    children: ReactNode
}) => {

  const location = useLocation();

  return (
    <section className="relative flex flex-1 items-center justify-center">
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AuthContent;