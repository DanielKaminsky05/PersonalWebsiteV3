export default function Status() {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-light text-white mb-6 capitalize tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Current Status
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
        {/* Status Box */}
        <div className="col-span-2 md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Status</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xl md:text-2xl text-white font-light">Online</span>
            </div>
          </div>
        </div>

        {/* Hackathons Box */}
        <div className="col-span-1 md:col-span-1 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Hackathons</h3>
            <span className="text-2xl md:text-3xl text-white font-light">3</span>
          </div>
        </div>

        {/* Countries Box */}
        <div className="col-span-1 md:col-span-1 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Countries Visited</h3>
            <span className="text-2xl md:text-3xl text-white font-light">15</span>
          </div>
        </div>

        {/* Gym Split Box */}
        <div className="col-span-2 md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Gym Split</h3>
            <span className="text-lg md:text-xl text-white font-light">Push, Pull, Legs</span>
          </div>
        </div>

        {/* Coffee Box - Make it span 1 on mobile too for compactness or 2 if text is long? Black is short. */}
        <div className="col-span-1 md:col-span-1 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="h-full flex flex-col justify-between gap-2">
                <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Coffee</h3>
                <span className="text-xl md:text-2xl text-white font-light">Black</span>
            </div>
        </div>

        {/* Chess Rating Box */}
        <div className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="h-full flex flex-col justify-between gap-2">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Chess Rating</h3>
            <span className="text-2xl md:text-3xl text-white font-light">1200 Rapid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
