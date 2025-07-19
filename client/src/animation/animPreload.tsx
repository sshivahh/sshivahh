import { delay, Easing } from "framer-motion";
import { del } from "framer-motion/client";

export const slideUp = {
  initial: {
    y: 0,
  },
  exit: {
    y: "-100vh",
    transition: {duration: 0.8, ease : [0.76, 0, 0.24, 1] as Easing, delay: 0.2},
  },
};

export const opacity = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as Easing,
      },
    },
  };
  

  export const opacityDelay = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as Easing,
        delay: 0.7,
      },
    },
  };

  export const loadingProgress = {
    initial: {
      width: "0%",
    },
    animate: {
        width: "100%",
        transition: {
          duration: 2,
          ease: [0.65, 0, 0.35, 1] as Easing,
          delay: 0.5,
        },
      },
      
    exit: {
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as Easing,
        delay: 0.2,
      },
    },
  };