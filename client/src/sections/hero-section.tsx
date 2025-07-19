import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  let xPercent = 0;
  let direction = 1;
  let animationFrameId: number;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!container.current || !imageWrapper.current) return;

    // Image parallax
    gsap.to(imageWrapper.current, {
      y: "40%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Scroll direction for ticker
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: 0.25,
      onUpdate: (self) => {
        direction = self.direction * -1;
      },
    });

    // Start ticker
    animationFrameId = requestAnimationFrame(tickerAnimation);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const tickerAnimation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += direction * 0.2;
    requestAnimationFrame(tickerAnimation);
  };

  return (
    <section
      className="relative w-screen h-screen overflow-hidden"
      ref={container}
    >
      <div ref={imageWrapper} className="w-full h-full">
        <Image fill={true} src="/images/h3.png" alt="Hero Image" />
      </div>
      <div className="bg-gradient-to-t from-black/60 via-transparent to-black/60 absolute inset-0"></div>
      <div className="absolute bottom-[3vh]">
        <div
          ref={slider}
          className="text-[240px] text-white font-light tracking-tight flex"
        >
          <p ref={firstText} className="text-nowrap">
            Russel Shivah Budiarto -&nbsp;
          </p>
          <p ref={secondText} className="absolute left-[100%] text-nowrap">
            Russel Shivah Budiarto -&nbsp;
          </p>
        </div>
      </div>
    </section>
  );
}
