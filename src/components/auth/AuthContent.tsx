import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AuthContent = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden w-full">
     <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default AuthContent;
