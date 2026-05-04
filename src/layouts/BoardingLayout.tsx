import { ReactNode } from "react";
import SideBox from "@/components/onboarding/SideBox";
import { AnimatePresence, motion } from "framer-motion";

interface BoardingLayoutProps {
    children: ReactNode;
    pageNumber: number;
    heading: string;
    description: string;
}

const BoardingLayout: React.FC<BoardingLayoutProps> = ({
    children,
    pageNumber,
    heading,
    description
}) => {
    return (
        <div className="md:min-h-screen md:flex justify-center w-full bg-[var(--background)]">
            <SideBox pageNumber={pageNumber} />
            <AnimatePresence mode="wait">
                <div className="w-full md:w-8/12 p-6 md:p-10">
                    <motion.div
                        key={pageNumber}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold">{heading}</h1>
                            <p className="text-muted-foreground text-sm">
                                {description}
                            </p>
                        </div>
                        {children}
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    )
}

export default BoardingLayout