import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { SplitTextRevealProps } from "@/shared/interface/componentInterface";

gsap.registerPlugin(SplitText);

const SplitTextReveal = ({
    children,
    as: Component = "div",
    className = "",
    split = "lines",
    duration = 0.8,
    stagger = 0.2,
    delay = 0,
    rotationX = -100,
    y = 0,
    once = true,
}: SplitTextRevealProps) => {

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {

        if (!ref.current) return;

        let splitInstance = SplitText.create(ref.current, {
            type: split,
        });

        const targets =
            split.includes("chars")
                ? splitInstance.chars
                : split.includes("words")
                    ? splitInstance.words
                    : splitInstance.lines;

        const animation = gsap.from(targets, {
            opacity: 0,
            rotationX,
            y,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            transformOrigin: "50% 50% -50px",
            scrollTrigger: once
                ? undefined
                : {
                    trigger: ref.current,
                    start: "top 80%",
                },
        });

        const handleResize = () => {
            animation.kill();
            splitInstance.revert();

            splitInstance = SplitText.create(ref.current!, {
                type: split,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            animation.kill();
            splitInstance.revert();
        };

    }, [
        split,
        duration,
        stagger,
        delay,
        rotationX,
        y,
        once,
    ]);

    return (
        <Component
            ref={ref}
            className={className}
        >
            {children}
        </Component>
    );
};

export default SplitTextReveal;