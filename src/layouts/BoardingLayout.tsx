import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SideBox from '@/components/boarding/sidebox/SideBox';
import { BoardingLayoutProps } from '@/shared/types/component';

const BoardingLayout = ({ children, pageNumber, heading, description }: BoardingLayoutProps) => {
  const location = useLocation();

  return (
    <div className="md:min-h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox pageNumber={pageNumber} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="w-full md:w-8/12 p-6 md:p-10 min-h-full flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {heading && description && (
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-semibold">{heading}</h1>
              <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
            </div>
          )}
          <div className="flex-1">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BoardingLayout;
