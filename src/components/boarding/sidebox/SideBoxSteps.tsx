import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/appStore';
import { boardingData } from '@/shared/utils/constants';

const SideBoxSteps = ({ pageNumber }: { pageNumber: number }) => {
  const boardingSteps = useSelector((state: RootState) => state.app.boardingSteps);

  const percentage = ((pageNumber + 1) / boardingSteps) * 100;

  if (pageNumber === 6) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="space-y-2 text-gray-700"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--mainColor)]/10">
            <svg
              className="h-4 w-4 text-[var(--mainColor)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="font-bold">Ready for Review</h3>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="text-gray-700 flex items-center justify-between">
          <div>
            <h3 className="font-bold">{boardingData[pageNumber].title}</h3>
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
