import gsap from "gsap";
import { useEffect, useRef } from "react";
import { AnimatedCounterProps } from "@/shared/interface/componentInterface";

const AnimatedCounter = ({
    from = 0,
    to,
    duration = 2,
    prefix = "",
    suffix = "",
    decimals = 0,
    separator = true,
    className = "",
    text = "",
}: AnimatedCounterProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current || !counterRef.current) return;

        const observer = new IntersectionObserver(
            ([entry], observer) => {
                if (!entry.isIntersecting) return;

                const value = { count: from };

                gsap.to(value, {
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
                observer.disconnect();
            },
            {
                threshold: 0.3,
            }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [from, to, duration, prefix, suffix, decimals, separator]);

    return (
        <div ref={containerRef}>
            <span ref={counterRef} className={className} />
            <p className="mt-2 text-sm text-muted-foreground">
                {text}
            </p>
        </div>
    );
};

export default AnimatedCounter;