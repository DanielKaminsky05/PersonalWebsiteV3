import { motion } from "motion/react";
import { ReactNode } from "react";

interface LocationOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

export default function LocationOverlay({ children, onClose }: LocationOverlayProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content Box */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        className="relative z-10 w-full max-w-2xl bg-black border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden"
      >
        {/* Decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-8">
            {children}
            
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-lg text-white text-sm font-light tracking-wide transition-all backdrop-blur-md"
            >
              <span>Continue Sailing</span>
              <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
