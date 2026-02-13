import { Sailboat } from "lucide-react";

export default function BoatLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Boat Animation - Pure CSS for better performance */}
      <div className="animate-bounce">
        <Sailboat className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
      </div>
      
      {/* Loading Text */}
      <p className="text-white text-sm font-light tracking-wider animate-pulse">
        Sailing...
      </p>
    </div>
  );
}
