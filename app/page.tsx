import About from "@/components/About";
import Architecture from "@/components/Architecture";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Architecture />
      <Skills />
      <Impact />
      <Education />
      <BlogPreview />
      <Contact />
    </>
  );
}
