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
      <h2 className="text-3xl md:text-4xl font-serif text-[#3e2723] mb-6 capitalize tracking-wide border-b-2 border-[#5d4037] pb-2">
        Current Interests
      </h2>
      
      <div className="flex flex-col gap-4 text-[#3e2723]">
        
        {/* Finance Row */}
        <div className="flex items-center justify-between py-2 border-b border-[#5d4037]/20">
            <div className="flex items-center gap-4">
                <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider w-24 shrink-0 font-serif">Finance</h3>
                <span className="text-[#3e2723]/80 text-[10px] uppercase tracking-wider hidden sm:block font-serif">I am currently following</span>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto">
                 <div className="flex items-center gap-2">
                    <span className="text-[#3e2723] font-bold text-sm font-serif">Meta</span>
                 </div>
                 <div className="w-px h-4 bg-[#5d4037]/30"></div>
                 <div className="flex items-center gap-2">
                    <span className="text-[#3e2723] font-bold text-sm font-serif">AAPL</span>
                 </div>
            </div>
        </div>

        {/* Hiking Row */}
        <div className="flex items-center justify-between py-2 border-b border-[#5d4037]/20">
            <div className="flex">
                <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider w-24 shrink-0 font-serif">Hiking</h3>
                <p className="text-[#3e2723]/80 text-[10px] uppercase tracking-wider font-serif">I love nature:</p>
            </div>
            <div className="flex gap-2 overflow-x-auto">
                 {hikingImages.map((img, i) => (
                    <button 
                        key={i} 
                        onClick={() => setSelectedImage(i)}
                        className="flex-shrink-0 w-10 h-10 rounded-md border border-[#5d4037]/30 overflow-hidden hover:scale-105 transition-all hover:border-[#5d4037]"
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
        <div className="flex items-center justify-between py-2 border-b border-[#5d4037]/20">
             <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider w-24 shrink-0 font-serif">Gym</h3>
             <p className="text-[#3e2723] font-serif text-sm">
                 Training to hit 2 plates on Bench
             </p>
        </div>

        {/* Roman History Row (Single Line) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-[#5d4037]/20 gap-2 sm:gap-0">
                <div className="flex">
                    <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider w-24 shrink-0 font-serif">History</h3>
                    <p className="text-[#3e2723]/80 text-[10px] uppercase tracking-wider font-serif">My Top Emperors:</p>
                </div>
             <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-sm text-[#3e2723] font-serif items-center italic">
                <span>Aurelian, Trojan, Augustus, Diocletian, Justinian</span>
             </div>
        </div>

        {/* Catan Row */}
        <div className="flex items-center justify-between py-2 border-b border-[#5d4037]/20">
             <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider w-24 shrink-0 font-serif">Catan</h3>
             <p className="text-[#3e2723] font-serif text-sm">
                Why do my tiles never roll
             </p>
        </div>

         {/* Tanks Row */}
         <div className="flex items-center justify-between py-2">
             <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider w-24 shrink-0 font-serif">Reading</h3>
             <p className="text-[#3e2723] font-serif text-sm">
                LOTR & GOT
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
