import gsap from "gsap";
import MoveUpward from "../animation/MoveUpward";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import WorkflowHeader from "./workflow/WorkflowHeader";
import { bookingSteps } from "@/shared/utils/constants";
import WorkflowTimeline from "./workflow/WorkflowTimeline";
import WorkflowBackground from "./workflow/WorkflowBackground";

gsap.registerPlugin(ScrollTrigger);

const EXTRA_HEIGHT = 100;
const TOTAL_FRAMES = 288;
const VIDEO_SCROLL_DISTANCE = 5000;

const WorkflowSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(window.innerHeight + VIDEO_SCROLL_DISTANCE + EXTRA_HEIGHT);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const frameModules = import.meta.glob(
      "@/assets/landing/workflow/frames/*.jpg",
      {
        eager: true,
        import: "default",
        query: "?url",
      }
    );

    const frameImages: HTMLImageElement[] = [];

    const frameUrls = Object.entries(frameModules)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([, url]) => url as string);

    frameUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      frameImages.push(img);
    });

    setImages(frameImages);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const scale = window.devicePixelRatio || 1;

    canvas.width = 1920 * scale;
    canvas.height = 1080 * scale;

    context.scale(scale, scale);

    const frameState = {
      frame: 0,
    };

    const render = () => {
      const img = images[frameState.frame];

      if (!img || !img.complete) return;

      context.clearRect(
        0,
        0,
        canvas.width / scale,
        canvas.height / scale
      );

      context.drawImage(
        img,
        0,
        0,
        canvas.width / scale,
        canvas.height / scale
      );
    };

    if (textRef.current) {
      gsap.to(textRef.current, {
        y: () => {
          const text = textRef.current!;
          const container = text.parentElement!;

          return -(text.scrollHeight - container.clientHeight);
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${VIDEO_SCROLL_DISTANCE}`,
          scrub: true,
        },
      });
    }

    const tween = gsap.to(frameState, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${VIDEO_SCROLL_DISTANCE}`,
        scrub: true,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      },
      // onUpdate: render,
      onUpdate: () => {
        render();

        const progress =
          frameState.frame / (TOTAL_FRAMES - 1);

        const step = Math.min(
          bookingSteps.length - 1,
          Math.floor(progress * bookingSteps.length)
        );

        setActiveStep(step);
      },
    });

    ScrollTrigger.refresh();

    images[0].onload = render;

    if (images[0].complete) {
      render();
    }

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, [images]);

  return (
    <section id="workflow" className="relative hidden lg:block">
      <WorkflowBackground />
      <MoveUpward>
        <WorkflowHeader />
      </MoveUpward>
      <div
        className="w-full"
        style={{ height: containerHeight ? `${containerHeight}px` : "120vh" }}
      >
        <section
          ref={sectionRef}
          className="gap-12 max-w-7xl mx-auto relative z-10 flex min-h-screen w-full items-center justify-between"
        >
          <div className="flex w-full lg:w-[62%] items-center px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-[32px] border border-border/50 bg-background/70 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-[120px]" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary/10 blur-[100px]" />
              <canvas
                ref={canvasRef}
                className="relative z-10 h-auto w-full shadow-[0_60px_120px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
          <div className="hidden lg:flex w-[38%] h-screen px-6">
            <div
              ref={textRef}
              className="pt-[20vh] pb-[30vh] w-full">
              <WorkflowTimeline activeStep={activeStep} />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default WorkflowSection;