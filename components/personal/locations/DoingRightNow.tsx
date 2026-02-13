export default function DoingRightNow() {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-light text-white mb-6 capitalize tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Right now I'm:
      </h2>
      
      <div className="flex flex-col gap-4 text-white/90">
        
        {/* Building */}
        <div className="flex items-baseline gap-3 py-2 border-b border-white/5">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider w-28 shrink-0">Building</h3>
            <p className="text-white font-light text-base">an educational platform for talkmaze</p>
        </div>

        {/* Learning */}
        <div className="flex items-baseline gap-3 py-2 border-b border-white/5">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider w-28 shrink-0">Learning</h3>
            <p className="text-white font-light text-base">AI & ML</p>
        </div>

        {/* Improving */}
        <div className="flex items-baseline gap-3 py-2 border-b border-white/5">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider w-28 shrink-0">Improving</h3>
            <p className="text-white font-light text-base">my habits</p>
        </div>

        {/* Reading */}
        <div className="flex items-baseline gap-3 py-2 border-b border-white/5">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider w-28 shrink-0">Reading</h3>
            <p className="text-white font-light text-base">meditations by marcus aurelius</p>
        </div>

        {/* Watching */}
        <div className="flex items-baseline gap-3 py-2">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider w-28 shrink-0">Watching</h3>
            <p className="text-white font-light text-base">band of brothers</p>
        </div>

      </div>
    </div>
  );
}
