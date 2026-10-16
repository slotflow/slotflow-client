import { motion } from 'framer-motion';
import { FloatingProps } from '@/shared/types/component';

const Floating = ({ children, className }: FloatingProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Floating;
