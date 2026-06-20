"use client";

import "./LogoLoop.css";
import LogoLoop from "./LogoLoop";
import {
  SiPython,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiMysql,
} from "react-icons/si";

const logos = [
  { node: <SiPython />, title: "Python" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiGithub />, title: "GitHub" },
];

export default function LogoSection() {
  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold mb-8">
        Technologies I Work With
      </h2>

      <LogoLoop logos={logos} />
    </section>
  );
}