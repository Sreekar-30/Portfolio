import Hero from "@/components/Hero";
import LogoSection from "@/components/LogoSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Dock from "@/components/Dock";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      
      <Hero />
      <LogoSection />
      <About />
      <Skills />
      <Timeline />
      <Education />
      <Projects />
      <Contact />
      <Dock />
    </main>
  );
}

