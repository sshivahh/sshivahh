import { Easing } from "framer-motion";

export const menuSlide = {
  initial: {
    x: "calc(100% + 100px)",
  },
  enter: {
    x: 0,
    transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as Easing},
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as Easing},
  },
};

export const slide = {
  initial: {
    x: "80px",
  },
  enter: (i : number)    => ({
    x: "0px",
    transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as Easing, delay: i * 0.05},
  }),
  exit: (i : number) => ({
    x: "80px",
    transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as Easing, delay: i * 0.05},
  }),
};
