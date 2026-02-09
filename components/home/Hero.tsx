"use client";

import Image from "next/image";
import { Github, Linkedin, ArrowRight, ChevronDown } from "lucide-react";
import TextType from "@/components/ui/TextType";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-2 md:gap-10 px-4 max-w-6xl mx-auto z-10 relative py-12 md:py-0">
      <div className="w-full md:flex-1 text-center md:text-left space-y-2 md:pt-0">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Hi, I'm Daniel
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide">
          CS @ Western
        </p>
        <div className="text-2xl md:text-4xl font-light text-gray-200 h-[60px]">
          {/* @ts-expect-error - TextType inferred props are too strict */}
          <TextType
            text={[
              "Welcome to my personal website",
              "I love doing Hackathons",
              "inspirational quote"
            ]}
            typingSpeed={100}
            deletingSpeed={50}
            loop={true}
          />
        </div>
        
        <div className="flex items-center justify-center md:justify-start gap-4">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white transition-all duration-200 border border-white/20 rounded-full hover:bg-white/10 hover:scale-105 hover:border-white/40 backdrop-blur-sm group"
          >
            View Resume
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DanielKaminsky05"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-300 transition-all duration-200 border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:scale-110 hover:border-white/30 backdrop-blur-sm"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/danielkaminsky-/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-300 transition-all duration-200 border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:scale-110 hover:border-white/30 backdrop-blur-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="w-full md:flex-1 relative flex justify-center items-center">
        <div className="relative w-48 h-48 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl ">
          <Image
            src="/Headshot.png"
            alt="Daniel - CS @ Western"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 20%' }}
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
        <ChevronDown className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
      </div>
    </section>
  );
}
