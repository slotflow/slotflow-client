import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect, type ReactElement, type ReactNode } from "react";

interface AosAnimationProps {
    children: ReactNode | ReactElement;
}

const AosAnimation = ({ children }: AosAnimationProps) => {
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