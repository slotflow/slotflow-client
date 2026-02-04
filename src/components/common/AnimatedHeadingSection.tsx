import { motion } from "motion/react";

interface AnimatedHeadingSectionProps {
  title: string;
  animatedWord: string;
  description: string;
}

const AnimatedHeadingSection = ({
  title,
  animatedWord,
  description
}: AnimatedHeadingSectionProps) => {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
        {title}{" "}
        <span className="text-neutral-400">
          {animatedWord.split("").map((char, idx) => (
            <motion.span
              key={idx}
              className="inline-block"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </p>

      <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
        {description}
      </p>
    </div>
  );
};

export default AnimatedHeadingSection;
