import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import DsaJourney from "@/components/sections/DsaJourney";
import Certificates from "@/components/sections/Certificates";
import Volunteering from "@/components/sections/Volunteering";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <DsaJourney />
      <Certificates />
      <Volunteering />
      <Contact />
    </main>
  );
}
