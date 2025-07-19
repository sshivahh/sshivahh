import {motion, Easing} from "framer-motion";

export default function Curve() {

    const initialPath = `M100 0 L100 ${window.innerHeight} Q-110 ${window.innerHeight/2} 100 0`;
    const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight/2} 100 0`;

    const pathAnimation = {
        initial: {
            d: initialPath,
        },
        enter: {
            d: targetPath,
            transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as Easing},
        },
        exit: {
            d: initialPath,
            transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as Easing},
        },
    }

    return <>
        <svg className="absolute top-0 left-[-99px] w-[100px] h-screen fill-[rgb(41,41,41)] stroke-none z-50">
            <motion.path
                variants={pathAnimation}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
                d={initialPath}
            ></motion.path>
        </svg>
    </>
}