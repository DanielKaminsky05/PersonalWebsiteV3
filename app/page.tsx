import Hero from "@/components/home/Hero";
import AboutMe from "@/components/home/AboutMe";
import WorkExperience from "@/components/home/WorkExperience";
import TechStack from "@/components/home/TechStack";
import Projects from "@/components/home/Projects";
import Stats from "@/components/home/Stats";
import Extracurriculars from "@/components/home/Extracurriculars";
import Writings from "@/components/home/Writings";
import Footer from "@/components/layout/Footer";
import PixelSnow from "@/components/ui/PixelSnow";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const posts = getAllPosts();

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
        <Writings posts={posts} />
        <Footer />
      </main>
    </>
  );
}
