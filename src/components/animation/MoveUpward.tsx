import { motion } from "framer-motion";
import { MoveUpwardProps } from "@/shared/interface/componentInterface";

const MoveUpward = ({
    children
}: MoveUpwardProps) => {
    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: false,
                amount: 0.2,
            }}
            transition={{
                duration: 1,
                delay: 0,
                ease: "easeOut",
            }}
        >{children}</motion.section>
    )
}

export default MoveUpward;