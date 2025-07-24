"use client";

import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useVisit } from "@/context/VisitContext";
import { Bungee } from "next/font/google";
import dynamic from "next/dynamic";

const WireCubeCanvas = dynamic(() => import("@/components/three/WireCube"), {
  ssr: false,
});

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

  const scrollVelocityRef = useRef(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelines = useRef<(gsap.core.Timeline | null)[]>([]);

  const { isFirstVisit } = useVisit();
  const controls = useAnimation();

  let xPercent = 0;
  let direction = 0.5;
  let tickerFrameId: number;

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate background scroll
    if (container.current && imageWrapper.current) {
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
    }

    // Track scroll velocity
    const velocityTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: 0.25,
      onUpdate: (self) => {
        scrollVelocityRef.current = self.getVelocity();
        direction = self.direction * -0.7;
      },
    });

    // Velocity sync loop
    let velocityFrameId = requestAnimationFrame(function updateVelocity() {
      setScrollVelocity(scrollVelocityRef.current);
      velocityFrameId = requestAnimationFrame(updateVelocity);
    });

    // Marquee ticker loop
    tickerFrameId = requestAnimationFrame(function ticker() {
      if (xPercent <= -100) xPercent = 0;
      if (xPercent > 0) xPercent = -100;
      gsap.set(firstText.current, { xPercent });
      gsap.set(secondText.current, { xPercent });
      xPercent += direction * 0.2;
      tickerFrameId = requestAnimationFrame(ticker);
    });

    return () => {
      velocityTrigger.kill();
      cancelAnimationFrame(tickerFrameId);
      cancelAnimationFrame(velocityFrameId);
    };
  }, []);

  useEffect(() => {
    // Animate hero text up
    controls.start({
      y: "-35%",
      transition: {
        duration: 2,
        ease: [0.65, 0, 0.35, 1],
        delay: isFirstVisit ? 3.3 : 0.1,
      },
    });
  }, [isFirstVisit, controls]);

  // Hover effect on each letter
  useEffect(() => {
    letterRefs.current.forEach((letterRef, index) => {
      if (letterRef) {
        const timeline = gsap.timeline({ paused: true });
        timeline.to(
          letterRef,
          { y: "0", duration: 0.2, ease: "power2.inOut" },
          "enter"
        );
        timeline.to(
          letterRef,
          { y: "-100%", duration: 0.4, ease: "power2.inOut" },
          "leave"
        );
        timelines.current[index] = timeline;
      }
    });
  }, []);

  return (
    <section
      className="relative w-screen h-screen overflow-hidden"
      ref={container}
    >
      {/* <div className="fixed top-24 bg-red-400 md:bg-blue-400 lg:bg-green-500 xl:bg-purple-600 2xl:bg-white border-4 border-black z-[4994392932939]">
        breakpoint saat ini
        <p className="md:hidden">sm (640px) - xs (480px)</p>
        <p className="hidden md:block lg:hidden">md (768px) - sm (640px)</p>
        <p className="hidden lg:block xl:hidden">lg (1024px) - md (768px)</p>
        <p className="hidden xl:block 2xl:hidden">xl (1280px) - lg (1024px)</p>
        <p className="hidden 2xl:block">2xl (1536px) - xl (1280px)</p>
      </div> */}
      <div
        ref={imageWrapper}
        className="w-full h-full relative overflow-hidden"
      >
        <motion.div
          initial={{ y: "-20%" }}
          animate={controls}
          className="absolute inset-0 w-full overflow-visible bg-[#71897a]"
          style={{ height: "200%" }}
        >
          <Image
            src="/images/bg.png"
            alt="Hero Image"
            fill
            className="object-cover z-100  lg:translate-x-42 translate-y-40 md:translate-y-20"
          />
          <img
            src="/texture/texture-3.png"
            alt="Hero Image"
            className="object-cover w-full h-full z-[90] opacity-[30%]"
          />

          <div className="z-[99] absolute inset-0 flex items-center justify-center md:hidden px-12">
            <div className="text-[17vw] md:text-[150px] lg:text-[240px] text-white font-light flex scale-[100%] -translate-y-[8vh] md:-translate-y-20 lg:translate-y-40">
              <p
                ref={firstText}
                className={`text-wrap font-[900] ${bungee.className} tracking-tighter leading-[15vw] w-3/4`}
              >
                Russel Shivah Budiarto
              </p>
            </div>
          </div>
          {/* Marquee Title */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            className="z-[99] absolute inset-0  items-center justify-center hidden md:flex"
            transition={{
              duration: 1.5,
              ease: [0.76, 0, 0.24, 1],
              delay: isFirstVisit ? 3.5 : 0.1,
            }}
          >
            <div
              ref={slider}
              className="text-[100px] md:text-[150px] lg:text-[17vw] text-white font-light flex scale-[100%] -translate-y-28 md:-translate-y-20 lg:translate-y-[10vh]"
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

      {/* Bottom Title and Location */}
      <div className="absolute bottom-[0vh] w-full h-56 px-10 md:px-24">
        <motion.div
          initial={{ y: "150%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: isFirstVisit ? 3.5 : 0.1,
          }}
          className="z-50 rounded-br-full rounded-tr-full py-2 tracking-tighter text-white font-light bg-neutrl-800/80"
        >
          <p className="md:hidden text-5xl font-extralight">
            Web Developer
          </p>
          <div className="text-white/90 text-7xl w-full font-light px-1 md:flex overflow-hidden hidden">
            {textOne.split("").map((char, index) => (
              <div
                key={index}
                className="relative inline-block overflow-hidden  lg:h-[1em] cursor-default"
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
                  className="relative text-4xl md:text-5xl lg:text-7xl"
                >
                  <span className="block font-extralight text-center">
                    {char === " " ? "\u00A0" : char}
                  </span>
                  <span className="absolute top-[110%] left-0 block font-extralight text-center">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col px-2 md:mt-2">
          <p className="text-white font-extralight text-2xl  lg:text-3xl">
            Based in Jakarta
          </p>
        </div>
      </div>

      {/* Wireframe Cube */}
      <WireCubeCanvas scrollVelocity={scrollVelocity}/>
    </section>
  );
}
