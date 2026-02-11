"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
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
      {/* Toggle Switch - Fixed Position */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-3">
        <Switch 
          checked={isPersonalMode} 
          onCheckedChange={handleModeToggle}
          className="scale-[1.5] data-[state=checked]:bg-blue-500 shadow-xl border-2 border-white/20"
        />
        <span className="text-sm font-medium text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
          Toggle Mode
        </span>
      </div>

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
          <PersonalLayout />
        ) : (
          <ProfessionalLayout posts={posts} />
        )}
      </div>
    </div>
  );
}
