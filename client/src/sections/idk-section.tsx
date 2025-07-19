import { useRef} from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export default function IdkSection() {

    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const height = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (<>
            <section
        ref={container}
            className="px-64 py-52 relative">
        <div className="flex justify-between items-start gap-48">
            <p className="w-1/2 text-5xl font-light flex flex-wrap">
            This section is intentionally left blank. Sometimes, less is more.
            </p>
            <p className="h-full text-lg w-1/5 font-extralight text-end">
            Embrace the simplicity and focus on what truly matters.
            </p>
        </div>
        </section>
        <motion.div className="relative mt-[100px] h-[50px] z-30"
        style={{ height: height }}
        >
        <div className="absolute h-[1550%] w-[120%] left-[-10%] bg-white rounded-bl-[50%] rounded-br-[50%] shadow-[0_60px_50px_rgba(0,0,0,0.748)]">


            </div>
        </motion.div>
    </>
    );
    }