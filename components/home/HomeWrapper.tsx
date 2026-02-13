"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ProfessionalLayout from "@/components/home/ProfessionalLayout";
import PersonalLayout from "@/components/home/PersonalLayout";
import { BlogPostMetadata } from "@/lib/blog";

interface HomeWrapperProps {
  posts: BlogPostMetadata[];
}

export default function HomeWrapper({ posts }: HomeWrapperProps) {
  const [isPersonalMode, setIsPersonalMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPositions, setScrollPositions] = useState({ professional: 0, personal: 0 });

  const handleModeToggle = async (checked: boolean) => {
    // Save current scroll position
    const currentMode = isPersonalMode ? 'personal' : 'professional';
    const currentScroll = window.scrollY;
    
    setScrollPositions(prev => ({
      ...prev,
      [currentMode]: currentScroll
    }));

    setIsLoading(true);
    // Wait for overlay to fade in
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsPersonalMode(checked);
    
    // Slight delay to ensure content is ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Restore scroll position for the new mode
    const newMode = checked ? 'personal' : 'professional';
    window.scrollTo({
      top: scrollPositions[newMode],
      behavior: 'instant'
    });

    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className={isPersonalMode ? "bg-white min-h-screen" : "bg-transparent min-h-screen"}>
        {isPersonalMode ? (
          <>
            <PersonalLayout />
            {/* Toggle Button - Fixed Position (Only for Personal Mode) */}
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={() => handleModeToggle(false)}
                className="flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-white font-medium hover:bg-black/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
              >
                <span>Go back home</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </>
        ) : (
          <ProfessionalLayout 
            posts={posts} 
            onToggleMode={() => handleModeToggle(true)}
          />
        )}
      </div>
    </div>
  );
}
