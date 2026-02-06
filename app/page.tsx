import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import WorkExperience from "@/components/WorkExperience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Extracurriculars from "@/components/Extracurriculars";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <WorkExperience />
      <Projects />
      <TechStack />
      <Stats />
      <Extracurriculars />
      <Footer />
    </main>
  );
}
