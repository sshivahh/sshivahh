import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useVisit } from "@/context/VisitContext";
import { Bungee } from "next/font/google";

const textOne = "Web Developer";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
});

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelines = useRef<(gsap.core.Timeline | null)[]>([]);

  const { isFirstVisit } = useVisit();

  let xPercent = 0;
  let direction = 0.5;
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
        direction = self.direction * -0.7;
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

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: "-35%",
      transition: {
        duration: 2,
        ease: [0.65, 0, 0.35, 1],
        // delay: 3.5,
        delay: isFirstVisit ? 3.3 : 0.1, // Delay only on first visit
      },
    });
  }, []);

  return (
    <section
      className={`relative w-screen h-screen overflow-hidden`}
      ref={container}
    >
      <div
        ref={imageWrapper}
        className="w-full h-full relative overflow-hidden"
      >
        <motion.div
          initial={{ y: "-20%" }}
          animate={controls}
          className="absolute inset-0 w-full overflow-visible bg-[#71897a]"
          style={{ height: "200%" }} // <-- allow extra height for sliding
        >
          <Image
            src="/images/bg.png"
            alt="Hero Image"
            fill
            className="object-cover  z-100 translate-x-42 translate-y-20"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            className="z-[99] absolute inset-0 flex items-center justify-center"
            transition={{
              duration: 1.5,
              ease: [0.76, 0, 0.24, 1],
              delay: isFirstVisit ? 3.5 : 0.1,
            }}
            // transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 3.5 }}
          >
            <div
              ref={slider}
              className="text-[240px] text-white font-light  flex scale-[100%] translate-y-40"
            >
              <p
                ref={firstText}
                className={`text-nowrap font-[900] ${bungee.className} tracking-tighter`}
              >
                Russel Shivah Budiarto -&nbsp;
              </p>
              <p
                ref={secondText}
                className={`absolute left-[100%] text-nowrap font-[900] ${bungee.className} tracking-tighter`}
              >
                Russel Shivah Budiarto -&nbsp;
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className=" absolute bottom-20 w-full h-56 px-24">
        <motion.div
          initial={{ y: "150%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: isFirstVisit ? 3.5 : 0.1,
          }}
          // transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 3.5 }}
          className={` z-50 rounded-br-full rounded-tr-full  py-2 tracking-tighter text-white font-light bg-neutrl-800/80`}
        >
          <div className="text-white/90 text-7xl w-full font-light px-1  rounded-full flex overflow-hidden text-shadow-amber-800 text-shadow-2xl">
            {textOne.split("").map((char, index) => (
              <div
                key={index}
                className="relative inline-block overflow-hidden h-[1em] cursor-default"
                onMouseEnter={() => {
                  const el = letterRefs.current[index];
                  if (!el) return;
                  gsap.killTweensOf(el);
                  gsap.to(el, {
                    y: "-110%",
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
                  <span className="block font-extralight">
                    {char === " " ? "\u00A0" : char}
                  </span>
                  <span className="absolute top-[110%] left-0 block font-extralight">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="flex flex-col px-2 mt-5">
        <p className="text-white font-extralight text-3xl">Based in Jakarta</p>
        </div>
      </div>
    </section>
  );
}

{
  /* <motion.div
          initial={{ y: "150%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: isFirstVisit ? 3.5 : 0.1,
          }}
          // transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 3.5 }}
          className={` z-50 absolute -top-0 right-50 rounded-br-full rounded-tr-full pr-20 py-2 tracking-tighter text-white font-light bg-neutrl-800/80`}
        >
          <div className="text-white/90 text-6xl w-full font-light border2 px-5 py-1 rounded-full flex overflow-hidden text-shadow-amber-800 text-shadow-2xl">
            {textOne.split("").map((char, index) => (
              <div
                key={index}
                className="relative inline-block overflow-hidden h-[1em] cursor-default"
                onMouseEnter={() => {
                  const el = letterRefs.current[index];
                  if (!el) return;
                  gsap.killTweensOf(el);
                  gsap.to(el, {
                    y: "-110%",
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
                  <span className="absolute top-[110%] left-0 block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div> */
}
