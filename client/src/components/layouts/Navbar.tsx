import { menuSlide, slide } from "@/animation/animNav";
import { motion } from "framer-motion";
import Curve from "../Curve";
import Link from "next/link";

type ChildProps = {
  handleMenuClick: () => void;
};

export default function Navbar({ handleMenuClick }: ChildProps) {
  const menu = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];

  return (<>
    <motion.nav
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="bg-[rgb(41,41,41)] text-white p-4 flex justify-between items-center fixed right-0 h-screen w-[500px] z-[60]"
    >
      <div className="flex flex-col items-center justify-start h-3/5 gap-10 px-12 w-full">
        <div className="w-full border-b-2 border-white pb-2">
          <p className="font-extralight">Navigation</p>
        </div>

        {menu.map((item, index) => (
          <motion.div
            custom={index}
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
            key={index}
            className="text-5xl hover:text-neutral-400 transition-colors duration-300 mb-4 w-full font-light"
          >
            <Link scroll={false} href={item.link} onClick={handleMenuClick} > 
            {item.name}
            </Link>
          </motion.div>
        ))}
        <div className="w-full flex justify-between mt-56">
          <a
            href=""
            className="hover:font-extrabold transition-all duration-300"
          >
            Instagram
          </a>
          <a
            href=""
            className="hover:font-extrabold transition-all duration-300"
          >
            Twitter
          </a>
          <a
            href=""
            className="hover:font-extrabold transition-all duration-300"
          >
            Github
          </a>
          <a
            href=""
            className="hover:font-extrabold transition-all duration-300"
          >
            LinkedIn
          </a>
        </div>
        <Curve />
      </div>
    </motion.nav> </>
  );
}
