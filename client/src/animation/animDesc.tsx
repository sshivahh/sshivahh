import { Easing } from "framer-motion";

export const slideUp = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as Easing,
    },
  },
  closed: {
    y: 20,
    opacity: 0,
  },
};

export const container = {
  open: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  closed: {},
};
