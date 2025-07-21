"use client";

import Image from "next/image";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "../Button";
import Magnetic from "../Magnetic";

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (container.current && ball.current) {
        gsap.fromTo(
          ball.current,
          { x: "-30vw", scale: 0.4 }, // 👈 initial state
          {
            x: "0vw",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      if (content.current) {
        gsap.fromTo(
          content.current,
          { y: "-100%" }, // 👈 parallax scroll down
          {
            y: "0", // 👈 parallax scroll up
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      if (image.current) {
        gsap.fromTo(
          image.current,
          { y: "-100%" }, // 👈 initial state
          {
            y: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const jakartaTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setLocalTime(jakartaTime);
    };

    updateTime(); // initialize immediately
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <footer
      className="bg-neutral-800 text-white pt-48 py-70 px-80 flex justify-center items-center relative overflow-hidden"
      ref={container}
    >
      <div ref={content} className="w-full flex flex-col gap-5 relative">
        <div className="flex gap-5 items-center">
          <Image
            ref={image}
            src="/images/h3.png"
            alt="Logo"
            width={2000}
            height={2000}
            className="h-48 w-48 mr-4 object-cover rounded-full z-0"
          />
          <p className="text-[8rem] w-3/4 leading-none">Let&apos;s Work</p>
        </div>
        <div>
          <p className="text-[8rem] w-3/4 leading-none z-30">Together</p>
        </div>
        <span className="w-full h-1 border-t-[1px] border-white my-24 relative">
          <div ref={ball}>
            <Magnetic>
              <div className="w-60 h-60 absolute -bottom-30 right-30 bg-indigo-500 rounded-full flex items-center justify-center">
                <p className="text-white text-2xl font-extralight">
                  Get in Touch
                </p>
              </div>
            </Magnetic>
          </div>
        </span>
        <div className="flex gap-8">
          <Magnetic>
            <Button className="px-8 py-6 border-white border-2 rounded-full">
              dev.russelshivah@gmail.com
            </Button>
          </Magnetic>
          <Magnetic>
            <Button className="px-8 py-6 border-white border-2 rounded-full">
              +6281211001605
            </Button>
          </Magnetic>
        </div>
      </div>
      <div className="px-32 pb-10 w-full absolute bottom-0 flex items-center justify-between">
        <div className="flex justify-center items-center gap-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-neutral-300 text-sm font-extralight">
              VERSION
            </h1>
            <p className="font-medium">2025 edition</p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-neutral-300 text-sm font-extralight">
              LOCAL TIME
            </h1>
            <p className="font-medium">{localTime}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-neutral-300 text-sm font-extralight">SOCIALS</h1>
          <div className="flex gap-10 font-medium">
            <a href="">Facebook</a>
            <a href="">Instagram</a>
            <a href="">LinkedIn</a>
            <a href="">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
