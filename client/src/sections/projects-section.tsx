"use client";

import { useState } from "react";
import Project from "@/components/Project";
import Modal from "@/components/Modal";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Edutopia",
      desc: "Education landing page",
      src: "project-a.png",
      // color: "#a7a7a8",
      color: "#98dcf4",
      href: "https://edutopia.vercel.app/",
    },
    {
      title: "Raja Energi Dunia",
      desc: "Clean energy company site",
      src: "project-b.png",
      // color: "#666b73",
      color: "#1e73b0",
      href: "https://raja-energi-dunia-brown.vercel.app/",
    },
    {
      title: "AI.DECE",
      desc: "AI business profile",
      src: "project-c.png",
      // color: "#303338",
      color: "#5342c5",
      href: "https://aidece.com/",
    },
    {
      title: "My Oliv",
      desc: "Valentine's gift website",
      src: "project-d.png",
      // color: "#000000",
      color: "#f494c4",
      href: "https://my-oliv.vercel.app/",
    },
  ];

  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="w-[75vw] h-[80%] py-auto flex flex-col items-center justify-center">
      <p className="text-md font-extralight text-neutral-500 mb-2 w-full">RECENT WORKS</p>
        {projects.map((project, index) => {
          return (
            <Project
              key={index}
              index={index}
              title={project.title}
              desc={project.desc}
              setModal={setModal}
            />
          );
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </section>
  );
}
