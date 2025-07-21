"use client";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

import Preloader from "@/components/Preloader";
import Header from "@/components/layouts/Header";
import HeroSection from "@/sections/hero-section";
import DescriptionSection from "@/sections/description-section";
import ProjectSection from "@/sections/projects-section";
import IdkSection from "@/sections/idk-section";
import Footer from "@/components/layouts/Footer";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Transition from "@/components/layouts/Transition";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // ✅ Call it properly
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3500);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>sshivahh | Home</title>
        <meta
          name="description"
          content="Your portfolio site or description here"
        />
        <link rel="icon" href="/images/h3.png" />
      </Head>
      {/* <Transition> */}

      <main className="">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <HeroSection />
        <DescriptionSection />
        <ProjectSection />
        <IdkSection />
      </main>
      {/* </Transition> */}
    </>
  );
}
