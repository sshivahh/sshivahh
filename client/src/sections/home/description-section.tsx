"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import { slideUp, container as containerVariant } from "../../animation/animDesc";
import Button from "@/components/Button";
import Magnetic from "@/components/Magnetic";

export default function DescriptionSection() {
  const container = useRef<HTMLDivElement>(null);
  const floatingCircle = useRef<HTMLDivElement>(null);
  const isInView = useInView(container, {
    once: true,
    amount: 0.4, // Only trigger when 40% of the section is in view
  });
  

  useLayoutEffect(() => {
    if (!container.current || !floatingCircle.current) return;

    const ctx = gsap.context(() => {
      gsap.to(floatingCircle.current, {
        y: "-150%",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const phrase =
    "A passionate developer with a keen eye for detail, dedicated to crafting exceptional user experiences through innovative web solutions.";

  return (
    <section className="px-64 pt-52 relative" ref={container}>
      <div className="flex justify-between items-start gap-48">
        <motion.div
          className="w-1/2 text-5xl font-light flex flex-wrap"
          variants={containerVariant}
          initial="closed"
          animate={isInView ? "open" : "closed"}
        >
          {phrase.split(" ").map((word, index) => (
            <motion.span key={index} className="mr-2" variants={slideUp}>
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="h-full text-lg w-1/5 font-extralight text-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          All projects are built with a focus on performance, accessibility, and
          user-centric design, ensuring that every interaction is smooth and
          intuitive.
        </motion.p>
      </div>

      <div ref={floatingCircle}>
        {" "}
        {/* Parallax wrapper */}
        <Magnetic>
          <Button
            className="w-48 h-48 absolute -bottom-32 left-2/3 flex justify-center items-center rounded-full z-30"
            backgroundColor="rgb(82, 82, 82)"
          >
            About Me
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
