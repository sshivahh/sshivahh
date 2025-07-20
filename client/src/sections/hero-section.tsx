import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";

const textOne = "WEB DEVELOPER";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelines = useRef<(gsap.core.Timeline | null)[]>([]);

  let xPercent = 0;
  let direction = 1;
  let animationFrameId: number;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!container.current || !imageWrapper.current) return;

    gsap.to(imageWrapper.current, {
      y: "40%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: 0.25,
      onUpdate: (self) => {
        direction = self.direction * -1;
      },
    });

    animationFrameId = requestAnimationFrame(tickerAnimation);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const tickerAnimation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += direction * 0.2;
    requestAnimationFrame(tickerAnimation);
  };

  useEffect(() => {
    letterRefs.current.forEach((letterRef, index) => {
      if (letterRef) {
        const timeline = gsap.timeline({ paused: true });
        timeline.to(
          letterRef,
          {
            y: "0",
            duration: 0.2,
            ease: "power2.inOut",
          },
          "enter"
        );
        timeline.to(
          letterRef,
          {
            y: "-100%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "leave"
        );
        timelines.current[index] = timeline;
      }
    });
  }, []);

  return (
    <section
      className={`relative w-screen h-screen overflow-hidden`}
      ref={container}
    >
      <div ref={imageWrapper} className="w-full h-full">
        <Image fill={true} src="/images/h3.png" alt="Hero Image" />
      </div>
      <div className="bg-gradient-to-t from-black/60 via-transparent to-black/60 absolute inset-0"></div>
      <div className="absolute bottom-[3vh]">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 4 }}
          className={` z-50 absolute top-0 left-0 rounded-br-full rounded-tr-full pl-20 py-2 pr-8  tracking-tighter text-white font-light bg-neutrl-800/80`}
        >
          <div className="text-white/70 text-6xl w-full font-medium border-2 px-5 py-1 rounded-full flex overflow-hidden">
            {textOne.split("").map((char, index) => (
              <div
                key={index}
                className="relative inline-block overflow-hidden h-[1em]"
                onMouseEnter={() => {
                  const el = letterRefs.current[index];
                  if (!el) return;
                  gsap.killTweensOf(el);
                  gsap.to(el, {
                    y: "-100%",
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={() => {
                  const el = letterRefs.current[index];
                  if (!el) return;

                  setTimeout(() => {
                    gsap.set(el, { y: "0%" });
                  }, 300);
                }}
              >
                <div
                  ref={(el) => {
                    letterRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  <span className="block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                  <span className="absolute top-full left-0 block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <div
          ref={slider}
          className="text-[240px] text-white font-light tracking-tight flex"
        >
          <p ref={firstText} className="text-nowrap">
            Russel Shivah Budiarto -&nbsp;
          </p>
          <p ref={secondText} className="absolute left-[100%] text-nowrap">
            Russel Shivah Budiarto -&nbsp;
          </p>
        </div>
      </div>
    </section>
  );
}
