import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Magnetic from "./Magnetic";

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
      <header className="">
        <div className="h-24 w-full absolute z-40 flex justify-between items-center px-32 text-white">
          <Magnetic>
            <button className="overflow-hidden h-12 group">
              <div className="h-fit flex flex-col group-hover:translate-y-[-50%] transition-all duration-300"
              >
                <a className="text-xl font-extralight cursor-pointer px-5 py-2">
                  sshivahh
                </a>
                <a className="text-xl font-extralight cursor-pointer px-5 py-2 mt-auto">
                  by Russel Shivah
                </a>
              </div>
            </button>
          </Magnetic>
          <div className="flex gap-12 text-xl font-extralight">
            <Magnetic>
              <a className="cursor-pointer px-5 py-2">.home</a>
            </Magnetic>
            <Magnetic>
              <a className="cursor-pointer px-5 py-2">.about</a>
            </Magnetic>
            <Magnetic>
              <a className="cursor-pointer px-5 py-2">.projects</a>
            </Magnetic>
            <Magnetic>
              <a className="cursor-pointer px-5 py-2">.idk</a>
            </Magnetic>
            <Magnetic>
              <a className="cursor-pointer px-5 py-2">.contact</a>
            </Magnetic>
          </div>
        </div>
        <div
          ref={burger}
          className="fixed top-10 right-10 w-28 h-28 bg-neutral-700 rounded-full z-[70] flex justify-center items-center hover:cursor-pointer active:bg-neutral-800 active:!scale-90 transition-all duration-300 scale-0"
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
              <div
                className="inset-0 z-[60] fixed "
                onClick={() => setActive(false)}
              ></div>
              <Navbar />
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
