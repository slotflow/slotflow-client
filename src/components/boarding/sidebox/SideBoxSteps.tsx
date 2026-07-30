import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/appStore';
import { boardingData } from "@/shared/utils/constants";

const SideBoxSteps = ({
    pageNumber
}: {
    pageNumber: number
}) => {

    const boardingSteps = useSelector((state: RootState) => state.app.boardingSteps);
    const percentage = ((pageNumber - 1) / (boardingSteps)) * 100;

    return (
        <div className="space-y-5">
            <div>
                <div className="text-gray-700 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">
                            {boardingData[pageNumber - 1].title}
                        </h3>
                    </div>
                    <span className="text-sm font-medium">
                        {pageNumber}/{boardingSteps}
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
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SideBoxSteps;