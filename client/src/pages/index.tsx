"use client";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

import Preloader from "@/components/Preloader";
import HeroSection from "@/sections/home/hero-section";
import DescriptionSection from "@/sections/home/description-section";
import ProjectSection from "@/sections/home/projects-section";
import IdkSection from "@/sections/home/idk-section";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Footer from "@/components/layouts/Footer";
import { useVisit } from "@/context/VisitContext";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const { isFirstVisit: isFirstVisitContext } = useVisit();

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
    if(isFirstVisitContext){
      setIsLoading(true)
    } else{
      setIsLoading(false);
    }

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

      <main className="overflow-x-hidden overflow-y-visible">
        <AnimatePresence mode="wait">
          {isLoading && isFirstVisitContext && <Preloader/>}
        </AnimatePresence>
        <HeroSection />
        <DescriptionSection />
        <ProjectSection />
        <IdkSection />
        <Footer />
      </main>
      {/* </Transition> */}
    </>
  );
}
