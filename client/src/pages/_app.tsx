import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "@/components/layouts/Header";
import Transition from "@/components/layouts/Transition";
import { VisitProvider } from "@/context/VisitContext";
import Lenis from "@studio-freight/lenis";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

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
  
    return () => {
      lenis.destroy();
    };
  }, []);

  let timeoutTime;
  useEffect(() => {
    if (router.pathname !== "/") {
      timeoutTime = 0;
    }else{
      timeoutTime = 4000;
    }
    setTimeout(() => {
      if (isFirstVisit) {
        setIsFirstVisit(false);
      }
    }, timeoutTime);
  }, [isFirstVisit]);

  return (
    <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <VisitProvider>
      <Header isFirstVisit={isFirstVisit} path={router.pathname}/>
      <AnimatePresence mode="wait">
        <Transition key={router.pathname} isFirstVisit={isFirstVisit}>
          <Component {...pageProps}/>
        </Transition>
      </AnimatePresence>
    </VisitProvider>
    </main>
  );
}
