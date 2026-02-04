import { 
  SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, 
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiFlask, SiTrpc, SiSpringboot, SiFastapi,
  SiTensorflow, SiNumpy, SiPandas, SiScikitlearn,
  SiGit, SiGithubactions, SiAmazonwebservices, SiDocker, SiPostgresql, SiMongodb, SiFigma, SiLinux,
  SiPolars, SiHtml5, SiCss3, SiTailwindcss, SiShadcnui
} from "react-icons/si";
import { FaJava, FaDatabase, FaGlobe, FaMicrosoft } from "react-icons/fa";
import { TbTestPipe } from "react-icons/tb";
import { BsBootstrapFill } from "react-icons/bs";

export const techStack = {
  languages: {
    name: "Languages",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    text: "text-blue-200",
    items: [
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "Java", icon: <FaJava className="text-[#007396]" /> },
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "C", icon: <SiC className="text-[#A8B9CC]" /> },
      { name: "SQL", icon: <FaDatabase className="text-gray-400" /> },
      { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "CSS", icon: <SiCss3 className="text-[#1572B6]" /> },
    ]
  },
  tools: {
    name: "Tools & Platforms",
    color: "from-gray-500/20 to-slate-500/20",
    border: "border-gray-500/20",
    text: "text-gray-200",
    items: [
      { name: "AWS", icon: <SiAmazonwebservices className="text-[#FF9900]" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "Linux", icon: <SiLinux className="text-[#FCC624]" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
      { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
      { name: "Gtest", icon: <TbTestPipe className="text-gray-400" /> },
      { name: "Microsoft Office", icon: <FaMicrosoft className="text-gray-400" /> },
    ]
  },
  
  frontend: {
    name: "Frontend",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/20",
    text: "text-purple-200",
    items: [
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Shadcn UI", icon: <SiShadcnui className="text-white" /> },
      { name: "Bootstrap", icon: <BsBootstrapFill className="text-[#7952B3]" /> },
    ]
  },
  backend: {
    name: "Backend",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    text: "text-emerald-200",
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
      { name: "Express.js", icon: <SiExpress className="text-white" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
      { name: "Spring Boot", icon: <SiSpringboot className="text-[#6DB33F]" /> },
      { name: "Flask", icon: <SiFlask className="text-white" /> },
      { name: "tRPC", icon: <SiTrpc className="text-[#2596BE]" /> },
    ]
  },
  mlds: {
    name: "ML / DS",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/20",
    text: "text-orange-200",
    items: [
      { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
      { name: "Scikit-learn", icon: <SiScikitlearn className="text-[#F7931E]" /> },
      { name: "Pandas", icon: <SiPandas className="text-[#150458]" /> },
      { name: "NumPy", icon: <SiNumpy className="text-[#013243]" /> },
      { name: "Polars", icon: <SiPolars className="text-[#CD792C]" /> },
      { name: "LangGraph", icon: <FaGlobe className="text-gray-400" /> }, 
    ]
  }
};
