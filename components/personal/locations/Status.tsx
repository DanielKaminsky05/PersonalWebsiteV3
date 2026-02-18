export default function Status() {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-serif text-[#3e2723] mb-6 capitalize tracking-wide border-b-2 border-[#5d4037] pb-2">
        Current Status
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
        {/* Status Box */}
        <div className="col-span-2 md:col-span-2 bg-[#5d4037]/10 border border-[#5d4037]/20 p-4 rounded-xl hover:bg-[#5d4037]/20 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider font-serif">Status</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-700"></span>
              </span>
              <span className="text-xl md:text-2xl text-[#3e2723] font-serif font-bold">Online</span>
            </div>
          </div>
        </div>

        {/* Hackathons Box */}
        <div className="col-span-1 md:col-span-1 bg-[#5d4037]/10 border border-[#5d4037]/20 p-4 rounded-xl hover:bg-[#5d4037]/20 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider font-serif">Hackathons</h3>
            <span className="text-2xl md:text-3xl text-[#3e2723] font-serif font-bold">3</span>
          </div>
        </div>

        {/* Countries Box */}
        <div className="col-span-1 md:col-span-1 bg-[#5d4037]/10 border border-[#5d4037]/20 p-4 rounded-xl hover:bg-[#5d4037]/20 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider font-serif">Countries Visited</h3>
            <span className="text-2xl md:text-3xl text-[#3e2723] font-serif font-bold">15</span>
          </div>
        </div>

        {/* Gym Split Box */}
        <div className="col-span-2 md:col-span-2 bg-[#5d4037]/10 border border-[#5d4037]/20 p-4 rounded-xl hover:bg-[#5d4037]/20 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider font-serif">Gym Split</h3>
            <span className="text-lg md:text-xl text-[#3e2723] font-serif font-bold">Push, Pull, Legs</span>
          </div>
        </div>

        {/* Coffee Box */}
        <div className="col-span-1 md:col-span-1 bg-[#5d4037]/10 border border-[#5d4037]/20 p-4 rounded-xl hover:bg-[#5d4037]/20 transition-colors">
            <div className="h-full flex flex-col justify-between gap-2">
                <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider font-serif">Coffee</h3>
                <span className="text-xl md:text-2xl text-[#3e2723] font-serif font-bold">Black</span>
            </div>
        </div>

        {/* Chess Rating Box */}
        <div className="col-span-1 md:col-span-2 bg-[#5d4037]/10 border border-[#5d4037]/20 p-4 rounded-xl hover:bg-[#5d4037]/20 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-[#5d4037] text-xs font-bold uppercase tracking-wider font-serif">Chess Rating</h3>
            <span className="text-2xl md:text-3xl text-[#3e2723] font-serif font-bold">1200 Rapid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
