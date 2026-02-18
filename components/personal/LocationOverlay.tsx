import { motion } from "motion/react";
import { ReactNode } from "react";

interface LocationOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

export default function LocationOverlay({ children, onClose }: LocationOverlayProps) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Parchment/Scroll Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-2xl bg-[#f4e4bc] text-[#3e2723] rounded-sm shadow-2xl overflow-hidden border-8 border-[#5d4037]"
        style={{
          backgroundImage: "url('/paper-texture.png')", // Fallback if no texture
          boxShadow: "0 0 50px rgba(0,0,0,0.5), inset 0 0 100px rgba(93, 64, 55, 0.3)"
        }}
      >
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#5d4037]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#5d4037]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#5d4037]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#5d4037]" />

        <div className="p-8 md:p-12 relative z-10">
            {children}
            
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#5d4037] text-[#f4e4bc] font-bold text-sm rounded hover:bg-[#3e2723] transition-colors shadow-lg flex items-center gap-2 border-2 border-[#8d6e63]"
              >
                <span>Continue Sailing</span>
                <span className="text-lg">→</span>
              </motion.button>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
