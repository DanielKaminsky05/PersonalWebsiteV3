import Hero from "@/components/Hero";
import WorkExperience from "@/components/WorkExperience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkExperience />
      <Projects />
      <TechStack />
      <Stats />
    </main>
  );
}
