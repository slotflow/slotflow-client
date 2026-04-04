import { gsap } from "gsap";
import Heading from './Heading';
import { motion } from "framer-motion";
import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featureContent } from "@/utils/constants";

gsap.registerPlugin(ScrollTrigger);


const SectionFeatures: React.FC = () => {

  const racesWrapperRef = useRef<HTMLDivElement>(null);
  const racesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const races = racesRef.current;
    if (!races) return;

    function getScrollAmount() {
      const racesWidth = races?.scrollWidth;
      return -(racesWidth! - window.innerWidth);
    }

    const tween = gsap.to(races, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: racesWrapperRef.current,
      start: "top 25%",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tween.kill();
    };
  }, []);

  return (
    <section id="features" className="w-full bg-[var(--background)] space-x-2 transition-colors duration-300 ease-in-out">
      <div className='mx-auto'>
        <Heading heading='Features' headingDescription='Walk through our features' />
        <div
          ref={racesWrapperRef}
          className="overflow-hidden w-full relative mt-16"
        >
          <div
            ref={racesRef}
            className="flex flex-nowrap w-max space-x-3"
          >
            {featureContent.map((item, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 flex flex-col lg:flex-row items-center py-10 px-16"
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex-1 text-center lg:text-left mb-4 lg:mb-0">
                  {item.icon && React.createElement(item.icon, { className: "w-8 h-8 md:w-20 md:h-20 mx-auto lg:mx-0 mb-4" })}
                  {item.islogo && item.logo && (
                    <img
                      src={item.logo}
                      className="w-8 h-8 md:w-20 md:h-20 mx-auto lg:mx-0 mb-4"
                    />
                  )}

                  <h2 className="text-3xl lg:text-4xl font-bold mb-2">{item.title}</h2>
                  <p className="text-base lg:text-lg mt-2 max-w-md">{item.description}</p>
                </div>

                <div className="flex-1 flex justify-center lg:justify-end">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-auto h-80 object-cover rounded-md"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionFeatures;




