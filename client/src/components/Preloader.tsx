"use client";
import { motion, Easing } from "framer-motion";
import { opacity, slideUp, opacityDelay, loadingProgress } from "../animation/animPreload";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [loadingVerse, setLoadingVerse] = useState<{
    text: string;
    verse: string;
  }>({
    text: "",
    verse: "",
  });

  const bibleVerses = [
    {
      text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      verse: "Hebrews 11:1",
    },
    {
      text: "I can do all things through Christ who strengthens me.",
      verse: "Philippians 4:13",
    },
    {
      text: "The Lord is my shepherd; I shall not want.",
      verse: "Psalm 23:1",
    },
    {
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
      verse: "Proverbs 3:5",
    },
    {
      text: "Be still, and know that I am God.",
      verse: "Psalm 46:10",
    },
    {
      text: "For I know the plans I have for you, declares the Lord.",
      verse: "Jeremiah 29:11",
    },
  ];

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const index = Math.floor(Math.random() * bibleVerses.length);
    setLoadingVerse(bibleVerses[index]);
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
        
        className="h-1 bg-white w-5 border-t-2 border-neutral-400 z-50 absolute bottom-1/5 left-0 rounded-3xl">
        </motion.div>
      </div>

      {dimension.height > 0 && (
        <>
          <div className="z-50 text-center">
            <motion.p
              variants={opacity}
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-light text-white text-xl md:text-3xl mb-12 px-4 max-w-xl mx-auto"
            >
              {loadingVerse.text}
            </motion.p>
            <motion.p
              variants={opacityDelay}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 0.3 }}
              className="text-md text-neutral-400 italic"
            >
              {loadingVerse.verse}
            </motion.p>
          </div>
          <svg className="absolute top-0 left-0 w-full h-[120%]">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill={"rgb(23, 23, 23)"}
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
