import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import WorkExperience from "@/components/WorkExperience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Extracurriculars from "@/components/Extracurriculars";
import Footer from "@/components/Footer";
import PixelSnow from "@/components/PixelSnow";

export default function Home() {
  return (
    <>
      <PixelSnow 
          color="#ffffff"
          flakeSize={0.02}
          minFlakeSize={1.25}
          pixelResolution={1000}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="snowflake"
      />
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
    </>
  );
}
