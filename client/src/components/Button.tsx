import React, {
    ReactNode,
    useEffect,
    useRef,
    forwardRef,
    HTMLAttributes,
  } from "react";
  import gsap from "gsap";
  
  interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    backgroundColor?: string;
  }
  
  const Button = forwardRef<HTMLDivElement, ButtonProps>(
    ({ children, backgroundColor = "bg-blue-500", ...attributes }, ref) => {
      const circle = useRef<HTMLDivElement>(null);
      const timeline = useRef<gsap.core.Timeline | null>(null);
      let timeoutID: string | number | NodeJS.Timeout | null | undefined = null;
  
      useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });
        timeline.current.to(
          circle.current,
          {
            top: "-25%",
            width: "125%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "enter"
        );
        timeline.current.to(
          circle.current,
          {
            top: "-150%",
            width: "150%",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "leave"
        );
      }, []);
  
      const manageMouseEnter = () => {
        if (timeoutID) {
          clearTimeout(timeoutID);
          timeoutID = null;
        }
        timeline.current?.tweenFromTo("enter", "leave");
      };
  
      const manageMouseLeave = () => {
        timeoutID = setTimeout(() => {
          timeline.current?.play();
        }, 300);
      };
  
      return (

        <div
          {...attributes}
          ref={ref}
          onMouseEnter={manageMouseEnter}
          onMouseLeave={manageMouseLeave}
          className={`rounded-2xl cursor-pointer relative flex items-center justify-center overflow-hidden text-white ${attributes.className ?? ""}`}
          style={{
            backgroundColor,
            ...attributes.style,
          }}
        >
            <p className="z-50 text-2xl font-extralight">
          {children}
            </p>
          <div
            ref={circle}
            className="w-full h-[150%] absolute rounded-full top-full bg-indigo-600"
          ></div>
        </div>
      );
    }
  );
  
  Button.displayName = "Button";
  
  export default Button;
  