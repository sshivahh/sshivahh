import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Transition from "@/components/layouts/Transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
<main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <Header />
  <AnimatePresence mode="wait">
    <Transition key={router.pathname}>
      <Component {...pageProps} />
    </Transition>
  </AnimatePresence>
  <Footer />
</main>
  );
}
