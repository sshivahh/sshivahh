import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Magnetic from "../Magnetic";
import { motion } from "framer-motion";
import Link from "next/link";
import {Rubik} from "next/font/google";

const rubik = Rubik({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-rubik",
});


export default function Header() {
  const [isActive, setActive] = useState(false);
  const burger = useRef<HTMLDivElement>(null);

  const handleBurgerClick = () => {
    setActive(!isActive);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(burger.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(burger.current, {
            scale: 1,
            duration: 0.25,
            ease: "power2.inOut",
          });
        },
        onEnterBack: () => {
          gsap.to(burger.current, {
            scale: 0,
            duration: 0.25,
            ease: "power2.inOut",
          });
        },
      },
    });
  });

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isActive]);

  
  return (
    <>
      <header className={`${rubik.className}`}>
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          // transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] , delay: 3.5 }}
          transition={{ duration: 0.1, ease: [0.76, 0, 0.24, 1] , delay: 0.5 }}
        className="h-30 w-full absolute z-30 flex justify-between items-center px-32 text-white">
          <Magnetic>
            <Link href={"/"} className="overflow-hidden h-12 group">
              <div className="h-fit flex flex-col group-hover:translate-y-[-50%] transition-all duration-300"
              >
                <p className="text-3xl font-extralight cursor-pointer px-5 py-2">
                  sshivahh
                </p>
                <p className="text-3xl font-extralight cursor-pointer px-5 py-2 mt-auto">
                  by Russel Shivah
                </p>
              </div>
            </Link>
          </Magnetic>
          <div className="flex gap-12 text-2xl font-extralight">
            <Magnetic>
              <Link href={"/"} className="cursor-pointer px-5 py-2">.home</Link>
            </Magnetic>
            <Magnetic>
              <Link href={"/about"} className="cursor-pointer px-5 py-2">.about</Link>
            </Magnetic>
            <Magnetic>
              <Link href={"/projects"} className="cursor-pointer px-5 py-2">.projects</Link>
            </Magnetic>
            <Magnetic>
              <Link href={"/idk"} className="cursor-pointer px-5 py-2">.idk</Link>
            </Magnetic>
            <Magnetic>
              <Link href={"/contact"} className="cursor-pointer px-5 py-2">.contact</Link>
            </Magnetic>
          </div>
        </motion.div>
        <div
          ref={burger}
          className="fixed top-10 right-10 w-28 h-28 bg-neutral-700 rounded-full z-[70] flex justify-center items-center hover:cursor-pointer active:bg-neutral-800 hover:bg-neutral-600 active:!scale-90 transition-all duration-300 scale-0"
          onClick={() => handleBurgerClick()}
        >
          <div
            className={`w-14 border-t-[4px] border-white transform-all transition-all duration-300 absolute  ${
              isActive ? "rotate-45 translate-y-0" : "rotate-0 translate-y-2"
            }`}
          ></div>
          <div
            className={`w-14 border-t-[4px] border-white transform-all transition-all duration-300 absolute ${
              isActive ? "-rotate-45 translate-y-0" : "rotate-0 -translate-y-2 "
            }`}
          ></div>
        </div>
        <AnimatePresence mode="wait">
          {isActive && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inset-0 z-[60] fixed bg-black/40"
                onClick={() => setActive(false)}
              ></motion.div>
              <Navbar />
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
