import AOS from "aos";
import 'aos/dist/aos.css';
import React, { useEffect } from "react";
import { AosAnimationProps } from "@/shared/interface/componentInterface";

const AosAnimation: React.FC<AosAnimationProps> = ({ 
    children 
}) => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
        })
    }, [])
    return (
        <div>
            {children}
        </div>
    )
}

export default AosAnimation