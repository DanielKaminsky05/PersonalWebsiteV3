export default function DoingRightNow() {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-serif text-[#3e2723] mb-6 capitalize tracking-wide border-b-2 border-[#5d4037] pb-2">
        Right now I'm:
      </h2>
      
      <div className="flex flex-col gap-4 text-[#3e2723]">
        
        {/* Building */}
        <div className="flex items-baseline gap-3 py-2 border-b border-[#5d4037]/20">
            <h3 className="text-[#5d4037] text-sm font-bold uppercase tracking-wider w-28 shrink-0 font-serif">Building</h3>
            <p className="text-[#3e2723] font-serif text-base">an educational platform for talkmaze</p>
        </div>

        {/* Learning */}
        <div className="flex items-baseline gap-3 py-2 border-b border-[#5d4037]/20">
            <h3 className="text-[#5d4037] text-sm font-bold uppercase tracking-wider w-28 shrink-0 font-serif">Learning</h3>
            <p className="text-[#3e2723] font-serif text-base">AI & ML</p>
        </div>

        {/* Improving */}
        <div className="flex items-baseline gap-3 py-2 border-b border-[#5d4037]/20">
            <h3 className="text-[#5d4037] text-sm font-bold uppercase tracking-wider w-28 shrink-0 font-serif">Improving</h3>
            <p className="text-[#3e2723] font-serif text-base">my habits</p>
        </div>

        {/* Reading */}
        <div className="flex items-baseline gap-3 py-2 border-b border-[#5d4037]/20">
            <h3 className="text-[#5d4037] text-sm font-bold uppercase tracking-wider w-28 shrink-0 font-serif">Reading</h3>
            <p className="text-[#3e2723] font-serif text-base">meditations by marcus aurelius</p>
        </div>

        {/* Watching */}
        <div className="flex items-baseline gap-3 py-2">
            <h3 className="text-[#5d4037] text-sm font-bold uppercase tracking-wider w-28 shrink-0 font-serif">Watching</h3>
            <p className="text-[#3e2723] font-serif text-base">band of brothers</p>
        </div>

      </div>
    </div>
  );
}
