"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Play, Pause, ArrowRight } from "lucide-react";
import aboutMeData from "@/data/aboutMe.json";

interface AboutMeProps {
  onToggleMode: () => void;
}

export default function AboutMe({ onToggleMode }: AboutMeProps) {
  // Use a shorter interval for faster pacing: 5 seconds per slide
  const INTERVAL_TIME = 5000;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  
  // Create a binary string for background decoration
  const binaryString = "10".repeat(20);

  // Start playing when in view
  useEffect(() => {
    if (isInView && !isPlaying) {
      setIsPlaying(true);
    }
  }, [isInView]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % aboutMeData.length);
      }, INTERVAL_TIME);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const currentItem = aboutMeData[currentIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50 

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe || isRightSwipe) {
        setIsPlaying(false);
        if (isLeftSwipe) {
          // Next slide
          setCurrentIndex((prev) => (prev + 1) % aboutMeData.length);
        } else {
          // Previous slide
          setCurrentIndex((prev) => (prev - 1 + aboutMeData.length) % aboutMeData.length);
        }
    }
  }

  return (
    <section 
        id="about"
        ref={containerRef} 
        className="relative w-full py-12 overflow-hidden min-h-[500px] flex flex-col items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
    >
      {/* Background subtle binary decoration - changed to gray/white */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-col items-center justify-center overflow-hidden select-none">
        <div className="text-xs text-white font-mono break-all w-full max-w-6xl text-center leading-loose">
          {Array.from({ length: 25 }).map((_, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0.2 }}
               animate={{ opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 4 + i % 5, repeat: Infinity, ease: "linear" }}
             >
               {binaryString}
             </motion.div>
          ))}
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-6 z-10 flex flex-col items-center">
        
        {/* Content Container with slight glass effect */}
        <div className="w-full min-h-[300px] flex items-center justify-center text-center p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-2xl shadow-black/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)", scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-3xl"
            >
              {currentItem.isQuote ? (
                <div className="space-y-6">
                   <p className="text-2xl md:text-4xl font-light italic leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    {currentItem.text}
                  </p>
                </div>
              ) : (
                <div className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed tracking-wide">
                  {currentItem.text.split("").map((char, index) => {
                    // Highlight "1s and 0s" or other key terms if needed
                    const isBinaryPhrase = currentItem.text.includes("1s and 0s") && 
                                           index >= currentItem.text.indexOf("1s and 0s") && 
                                           index < currentItem.text.indexOf("1s and 0s") + 9;
                    
                    return (
                      <span key={index} className={isBinaryPhrase ? "text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""}>
                        {char}
                      </span>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls - Updated style to match Hero buttons */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {aboutMeData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                    ? "bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                    : "bg-white/20 w-2 hover:bg-white/40 hover:w-4"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={togglePlay}
            className="p-3 rounded-full text-gray-300 transition-all duration-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 backdrop-blur-sm group"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} className="fill-current" />
            ) : (
              <Play size={20} className="fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Adventure Toggle Button */}
        <div className="mt-16">
          <motion.button
            onClick={onToggleMode}
            animate={{ 
              y: [0, -2, 2, -2, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-blue-500/80 backdrop-blur-sm rounded-xl text-white font-semibold text-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 group"
          >
            <span>Go on a Adventure to learn more</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
