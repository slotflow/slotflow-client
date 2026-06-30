import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import MeteorsCard from "../cards/MeteorsCard";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 288;
const VIDEO_SCROLL_DISTANCE = 5000;

const WorkflowSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(window.innerHeight + VIDEO_SCROLL_DISTANCE);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const frameImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();

      img.src = `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

      frameImages.push(img);
    }

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
      onUpdate: render,
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
    <div
      className="relative w-full overflow-hidden bg-[var(--background)]"
      style={{ height: containerHeight ? `${containerHeight}px` : "100vh" }}
    >
      <section
        ref={sectionRef}
        className="max-w-7xl mx-auto relative z-10 flex h-screen w-full items-center justify-between overflow-hidden text-white"
      >
        <div className="w-1/2 h-screen overflow-hidden flex items-start p-4">
          <div
            ref={textRef}
            className="pt-[15vh] pb-[20vh] space-y-20"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <MeteorsCard
                key={i}
                title="Find your Service Provider"
                content={`Paragraph ${i}: Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/ LOR-əm IP-səm) is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by .`}
              />
            ))}
          </div>
        </div>
        <div className="flex w-1/2 items-center p-4">
          <canvas ref={canvasRef} className="z-[1] h-auto w-full rounded-md" />
        </div>
      </section>
    </div>
  );
};

export default WorkflowSection;