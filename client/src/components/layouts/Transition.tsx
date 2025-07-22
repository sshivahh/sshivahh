"use client";
import { Easing, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const anim = <T extends object>(variants: T) => ({
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants,
});

export default function Transition({
  children,
  isFirstVisit = false,
}: {
  children: React.ReactNode;
  isFirstVisit?: boolean;
}) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const text = {
    initial: {
      top: "50%",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1] as Easing,
        delay: 0.3,
      },
    },
    enter: {
      top: "-100vh",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1] as Easing,
        delay: 0.3,
      },
      transitionEnd: {
        top: "200vh",
      },
    },
    exit: {
      top: "50%",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1] as Easing,
      },
    },
  };

  const routes: Record<string, string> = {
    "/": "Home",
    "/about": "about",
    "/idk": "idk",
    "/projects": "projects",
    "/contact": "contact",
  };

  return (
    <>
      {/* Animated overlay */}
      <div className={`fixed top-0 left-0 w-screen h-screen z-[9999] pointer-events-none ${isFirstVisit? "hidden" : "block"}`}>
        <motion.p
          {...anim(text)}
          className="left-1/2 translate-x-[-50%] text-8xl text-white absolute top-1/2 -translate-y-1/2 z-[200] font-extralight"
        >
          [{routes[router.route as keyof typeof routes]}]
        </motion.p>

        {dimensions.width > 0 && <SVG {...dimensions} />}
      </div>

      {/* Main children */}
      <div className="relative z-0">{children}</div>
    </>
  );
}

type SVGProps = {
  width: number;
  height: number;
};

const SVG = ({ width, height }: SVGProps) => {
  const initialPath = `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${
    height + 300
  } Q${width / 2} ${height + 600} 0 ${height + 300} L0 300`;

  const targetPath = `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height} Q${
    width / 2
  } ${height} 0 ${height} L0 300`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1] as Easing,
      },
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1] as Easing,
      },
    },
  };

  const slide = {
    initial: {
      top: "-300px",
    },
    enter: {
      top: "-100vh",
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1] as Easing,
      },
      transitionEnd: {
        top: "100vh",
      },
    },
    exit: {
      top: "-300px",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1] as Easing,
      },
    },
  };

  return (
    <motion.div
      {...anim(slide)}
      className="w-[100vw] h-[calc(100vh+600px)] -top-[300px] left-0 fixed pointer-events-none z-[199]"
    >
      <motion.svg
        width={width}
        height={height + 600}
        viewBox={`0 0 ${width} ${height + 600}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <motion.path {...anim(curve)} className="fill-[#171717]" />
      </motion.svg>
    </motion.div>
  );
};
