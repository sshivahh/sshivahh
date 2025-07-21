import { Easing } from "framer-motion";

export const slideLeft = {
  initial: {
    x: 0,
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1] as Easing,
    },
  },
};


export const opacity = {
  hidden: {
    opacity: 0,
    x: 40,
    clipPath: "inset(100% 0% 0% 0%)",
  },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0% 0% 0% 0%)",
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
      duration: 2.5,
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

export const wordContainer = {
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const wordAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as Easing,
    },
  },
};

