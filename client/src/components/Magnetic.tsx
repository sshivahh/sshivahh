import React, {
  HTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
  cloneElement,
} from "react";
import gsap from "gsap";

interface MagneticProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >;
}

export default function Magnetic({ children, ...props }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magnetic.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = clientX - centerX;
      const y = clientY - centerY;

      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mouseenter", handleMouseMove);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseMove);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return cloneElement(children, {
    ...props,
    ref: magnetic,
  });
}
