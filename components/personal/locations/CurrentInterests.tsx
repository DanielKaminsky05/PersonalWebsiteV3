import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Interests() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const hikingImages = [
    '/hike/hike1.webp',
    '/hike/hike2.webp',
    '/hike/hike3.webp'
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-light text-white mb-6 capitalize tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Current Interests
      </h2>
      
      <div className="flex flex-col gap-4 text-white/90">
        
        {/* Finance Row */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-4">
                <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider w-24 shrink-0">Finance</h3>
                <span className="text-gray-500 text-[10px] uppercase tracking-wider hidden sm:block">I am currently following</span>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto">
                 <div className="flex items-center gap-2">
                    <span className="text-white font-light text-sm">Meta</span>
                    <span className="text-green-400 text-xs font-medium">+1.2%</span>
                 </div>
                 <div className="w-px h-4 bg-white/10"></div>
                 <div className="flex items-center gap-2">
                    <span className="text-white font-light text-sm">AAPL</span>
                    <span className="text-green-400 text-xs font-medium">+0.8%</span>
                 </div>
            </div>
        </div>

        {/* Hiking Row */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex">
                <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider w-24 shrink-0">Hiking</h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider">I love nature:</p>
            </div>
            <div className="flex gap-2 overflow-x-auto">
                 {hikingImages.map((img, i) => (
                    <button 
                        key={i} 
                        onClick={() => setSelectedImage(i)}
                        className="flex-shrink-0 w-10 h-10 rounded-md border border-white/10 overflow-hidden hover:scale-105 transition-all hover:border-white/30"
                    >
                        <img 
                            src={img} 
                            alt={`Hiking ${i + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                 ))}
            </div>
        </div>

        {/* Gym Row */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
             <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider w-24 shrink-0">Gym</h3>
             <p className="text-white font-light text-sm text-opacity-80">
                So close to 2 plates on bench
             </p>
        </div>

        {/* Roman History Row (Single Line) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-white/5 gap-2 sm:gap-0">
                <div className="flex">
                    <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider w-24 shrink-0">History</h3>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">My Top 5 Emperors:</p>
                </div>
             <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-sm text-white font-light text-opacity-80 items-center">
                <span>Aurelian, Trojan, Augustus, Diocletian, Justinian</span>
             </div>
        </div>

        {/* Catan Row */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
             <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider w-24 shrink-0">Catan</h3>
             <p className="text-white font-light text-sm text-opacity-80">
                Why do my tiles never roll
             </p>
        </div>

         {/* Tanks Row */}
         <div className="flex items-center justify-between py-2">
             <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider w-24 shrink-0">Tanks</h3>
             <p className="text-white font-light text-sm text-opacity-80">
                Bob Semple Tank, enough said.
             </p>
         </div>

      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
            >
                <div 
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-2 max-w-4xl w-full aspect-video flex items-center justify-center relative shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-3 -right-3 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg font-bold"
                    >
                        ✕
                    </button>
                    <img 
                        src={hikingImages[selectedImage]} 
                        alt={`Hiking ${selectedImage + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
