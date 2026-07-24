import { motion, Variants } from "framer-motion";
import React from "react";

type Direction = "left" | "right" | "top" | "bottom";

interface MoveAnythingProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
}

const variants: Variants = {
  hidden: (direction: Direction) => ({
    opacity: 0,
    scale: 0.9,
    x:
      direction === "left"
        ? -80
        : direction === "right"
        ? 80
        : 0,
    y:
      direction === "top"
        ? -80
        : direction === "bottom"
        ? 80
        : 0,
  }),

  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
};

const MoveAnything = ({
  children,
  delay = 0,
  duration = 7,
  direction = "bottom",
  className,
}: MoveAnythingProps) => {
  return (
    <motion.div
      className={className}
      custom={direction}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 0.8,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default MoveAnything;