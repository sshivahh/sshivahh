"use client";
import { Easing, motion } from "framer-motion";
import {
  opacity,
  slideUp,
  opacityDelay,
  loadingProgress,
  wordContainer,
  wordAnimation,
} from "../animation/animPreload";
import { useEffect, useState } from "react";
import { getRandomBibleVerse } from "@/data/bibleVerses";

export default function Preloader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const bibleVerse = getRandomBibleVerse();

  useEffect(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as Easing,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-neutral-900 z-[3000] flex justify-center items-center"
    >
      <div className="absolute w-1/5 h-full left-1/2 translate-x-[-50%] z-50">
        <motion.div
          variants={loadingProgress}
          initial="initial"
          animate="animate"
          exit="exit"
          className="h-1 bg-white w-5 border-t-2 border-neutral-400 z-50 absolute bottom-1/5 left-0 rounded-3xl"
        />
      </div>

      {dimension.height > 0 && (
        <>
          <div className="z-50 text-center">
            <motion.p
              variants={wordContainer}
              initial="hidden"
              animate="visible"
              className="font-light text-white text-xl md:text-3xl mb-12 px-4 max-w-xl mx-auto flex flex-wrap justify-center"
            >
              {bibleVerse.text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  className="inline-block mr-1 whitespace-nowrap"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.p
              variants={opacityDelay}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-md text-neutral-400 italic"
            >
              {bibleVerse.reference}
            </motion.p>
          </div>

          <svg className="absolute top-0 left-0 w-full h-[120%]">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill={"rgb(23, 23, 23)"}
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
