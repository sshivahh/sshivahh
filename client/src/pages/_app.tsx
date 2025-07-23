import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "@/components/layouts/Header";
import Transition from "@/components/layouts/Transition";
import { VisitProvider } from "@/context/VisitContext";
import { Be_Vietnam_Pro } from "next/font/google";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Be_Vietnam_Pro({
  variable: "--font-rubik",
  weight: "300",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (isFirstVisit) {
        setIsFirstVisit(false);
      }
    }, 4000);
  }, [isFirstVisit]);

  return (
    <main className={`${geistSans.variable} ${geistMono.variable} ${rubik.className} antialiased`}>
    <VisitProvider>
      <Header />
      <AnimatePresence mode="wait">
        <Transition key={router.pathname} isFirstVisit={isFirstVisit}>
          <Component {...pageProps}/>
        </Transition>
      </AnimatePresence>
    </VisitProvider>
    </main>
  );
}
