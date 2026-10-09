import { Variants } from 'framer-motion';

// User dashboard providers list card gradients
export const cardGradients: string[] = [
  'bg-gradient-to-r from-violet-200 to-violet-400',
  'bg-gradient-to-r from-lime-100 to-green-300',
  'bg-gradient-to-r from-red-100 to-orange-200',
  'bg-gradient-to-r from-amber-100 to-yellow-200',
  'bg-gradient-to-r from-sky-100 to-blue-300',
];

// motion constant
export const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};
