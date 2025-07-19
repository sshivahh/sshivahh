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
    link: string;
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

export default function View({ modal }: ModalProps) {
  const { active} = modal;
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const moveContainerX = gsap.quickTo(containerRef.current, "left", {
      duration: 0.3,
      ease: "power3",
    });
    const moveContainerY = gsap.quickTo(containerRef.current, "top", {
      duration: 0.3,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      moveContainerX(clientX);
      moveContainerY(clientY);
    });
  }, []);

  return (
    <motion.button
      ref={containerRef}
      variants={scaleAnimation}
      initial={"initial"}
      animate={active ? "open" : "closed"}
      // style={{
      //   backgroundColor: projects[index].color,
      // }}
      className="fixed w-[100px] h-[100px] overflow-hidden flex items-center justify-center pointer-events-none bg-teal-800 rounded-full transition-all duration-[3000]"
    >
        <motion.p className="text-white font-extrabold text-2xl">VIEW</motion.p>
    </motion.button>
  );
}
