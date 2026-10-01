import SideBoxSteps from './SideBoxSteps';
import SideBoxHeader from './SideBoxHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { SideBoxProps } from '@/shared/types/component';
import { boardingData } from '@/shared/utils/constants/boardingConstants';

const SideBox = ({ pageNumber }: SideBoxProps) => {
  const description = boardingData[pageNumber].description || '';

  return (
    <aside className="flex md:h-screen w-full md:w-4/12 p-6 md:p-10 rounded-r-lg shadow-lg flex-col h-full md:sticky md:top-0">
      <div className="flex h-full w-full flex-col gap-6">
        <SideBoxHeader />
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${pageNumber}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-muted-foreground text-sm md:text-base leading-relaxed min-h-[60px]"
          >
            {description}
          </motion.p>
        </AnimatePresence>
        <SideBoxSteps pageNumber={pageNumber} />
        <div className="flex justify-center flex-1 items-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${pageNumber}`}
              src={boardingData[pageNumber].image}
              alt={'Illustration'}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="h-40 md:h-72 w-full object-contain"
            />
          </AnimatePresence>
        </div>
        <div className="text-muted-foreground border-t pt-6">
          <p className="text-sm">We Offer</p>
          <blockquote className="italic text-sm leading-relaxed mt-2">
            "At Slotflow, we're dedicated to simplifying service bookings. Our platform empowers
            providers to manage their schedules efficiently."
          </blockquote>
        </div>
      </div>
    </aside>
  );
};

export default SideBox;
