import React from "react";
import { motion } from "framer-motion";

interface MoveUpwardProps {
    children: React.ReactNode;
}

const MoveUpward: React.FC<MoveUpwardProps> = ({
    children
}) => {
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