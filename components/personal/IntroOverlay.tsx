import { motion } from "motion/react";
import { Skull, Map, Anchor } from "lucide-react";

interface IntroOverlayProps {
  onClose: () => void;
}

export default function IntroOverlay({ onClose }: IntroOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Parchment/Scroll Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-lg bg-[#f4e4bc] text-[#3e2723] rounded-sm shadow-2xl overflow-hidden border-8 border-[#5d4037]"
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

        <div className="p-8 md:p-10 flex flex-col items-center text-center space-y-6 relative">
          

          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wide uppercase text-[#3e2723] drop-shadow-sm">
            Ahoy, Traveler!
          </h2>

          <div className="space-y-4 font-serif text-lg leading-relaxed opacity-90">
            <p>
              Ye have stumbled upon me secret map of <span className="font-bold">Interests & Adventures</span>!
            </p>
            <p className="italic bg-[#5d4037]/10 p-4 rounded-lg border border-[#5d4037]/20">
              Guidance for ye journey: <br/>
              Look for the <span className="font-bold text-[#b71c1c] mx-1">X</span> marks on the islands. 
              Click 'em to reveal the treasures buried within!
            </p>
          </div>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-8 py-3 bg-[#5d4037] text-[#f4e4bc] font-bold text-lg rounded hover:bg-[#3e2723] transition-colors shadow-lg flex items-center gap-2 border-2 border-[#8d6e63]"
          >
            <Anchor className="w-5 h-5" />
            <span>Set Sail!</span>
          </motion.button>
          
          <div className="absolute bottom-4 opacity-30 text-xs uppercase tracking-widest font-bold">
            Captain Daniel's Log
          </div>
        </div>
      </motion.div>
    </div>
  );
}
