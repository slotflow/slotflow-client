import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { boardingData } from '@/shared/utils/constants/boardingConstants';

const SideBoxSteps = ({ pageNumber }: { pageNumber: number }) => {
  const boardingSteps = useSelector((state: RootState) => state.app.boardingSteps);
  const percentage = ((pageNumber + 1) / boardingSteps) * 100;

  return (
    <div className="space-y-5">
      <div>
        <div className="text-muted-foreground flex items-center justify-between">
          <div>
            <h3 className="font-bold">
              {pageNumber === boardingData.length - 1
                ? 'Ready for Review'
                : boardingData[pageNumber].title}
            </h3>
          </div>

          <span className="text-sm font-medium">
            {pageNumber + 1}/{boardingSteps}
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-[var(--mainColor)]"
            initial={false}
            animate={{
              width: `${percentage}%`,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBoxSteps;
