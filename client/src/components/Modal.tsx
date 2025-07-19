import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Easing } from "framer-motion";

type ModalProps = {
  modal: {
    active: boolean;
    index: number;
  };
  projects: {
    title: string;
    src: string;
    color: string;
  }[];
};

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  open: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as Easing,
    },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as Easing,
    },
  },
};

export default function Modal({ modal, projects }: ModalProps) {
  const { active, index } = modal;
  const containerRef = useRef<HTMLDivElement>(null);
  const cursor1 = useRef<HTMLDivElement>(null);
  const cursor2 = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveContainerX = gsap.quickTo(containerRef.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const moveContainerY = gsap.quickTo(containerRef.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const moveCursor1X = gsap.quickTo(cursor1.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const moveCursor1Y = gsap.quickTo(cursor1.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const moveCursor2X = gsap.quickTo(cursor2.current, "left", {
      duration: 0.4,
      ease: "power3",
    });
    const moveCursor2Y = gsap.quickTo(cursor2.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
    const moveCursorLabelX = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.3,
      ease: "power3",
    });
    const moveCursorLabelY = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.3,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      moveContainerX(clientX);
      moveContainerY(clientY);
      moveCursor1X(clientX);
      moveCursor1Y(clientY);
      moveCursor2X(clientX);
      moveCursor2Y(clientY);
      moveCursorLabelX(clientX);
      moveCursorLabelY(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={containerRef}
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        className="fixed w-[600px] h-[500px] overflow-hidden flex items-center justify-center pointer-events-none"
      >
        <div
          className={`h-full w-full absolute transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]`}
          style={{
            transform: `translateY(${index * -100}%)`,
          }}
        >
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div
                key={`modal_${index}`}
                style={{ backgroundColor: color }}
                className="relative flex flex-col items-center justify-center h-full"
              >
                <p className="text-white text-4xl mb-5 font-extralight">{project.title}</p>
                <Image
                  src={`/images/${src}`}
                  width={30000}
                  height={0}
                  alt="Image"
                  className="w-[90%]"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
  ref={cursor2}
  variants={scaleAnimation}
  initial={"initial"}
  animate={active ? "open" : "closed"}
  className="w-28 h-28 rounded-full fixed justify-center items-center z-20 pointer-events-none overflow-hidden"
>
  <div
    className="w-full h-full absolute transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"
    style={{
      transform: `translateY(${index * -100}%)`,
    }}
  >
    {projects.map((project, i) => {
      const { title, color } = project;
      return (
        <div
          key={`cursor_${i}`}
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: color }}
        >

        </div>
      );
    })}
  </div>
</motion.div>
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        className="text-white z-20 flex justify-center items-center text-2xl fixed font-extrabold pointer-events-none"
        style={{ pointerEvents: 'none' }}
      >
        VIEW
      </motion.div>
    </>
  );
}