import gsap from "gsap";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    separator?: boolean;
    className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    from = 0,
    to,
    duration = 2,
    prefix = "",
    suffix = "",
    decimals = 0,
    separator = true,
    className = "",
}) => {
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
    if (!counterRef.current) return;

    const value = { count: from };

    const tween = gsap.to(value, {
        count: to,
        duration,
        ease: "power3.out",
        onUpdate: () => {
            let formatted = value.count.toFixed(decimals);

            if (separator) {
                formatted = Number(formatted).toLocaleString(undefined, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                });
            }

            counterRef.current!.textContent =
                `${prefix}${formatted}${suffix}`;
        },
    });

    return () => {
        tween.kill();
    };
}, [from, to, duration, prefix, suffix, decimals, separator]);

    return (
        <span
            ref={counterRef}
            className={className}
        />
    );
};

export default AnimatedCounter;