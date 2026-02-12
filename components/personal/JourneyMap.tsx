import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Scene from "./Scene";
import Boat from "./Boat";
import MapLocations from "./MapLocations";
import { Html, Loader } from "@react-three/drei";
import { MapLocation, LocationId } from "./types";
import MapPath from "./MapPath";
import Islands from "./Islands";

const locations: MapLocation[] = [
  { id: "origins", label: "Origins", position: [-4, 0, 2], content: <div>Where I started...</div> },
  { id: "projects", label: "Projects", position: [-2, 0, -4], content: <div>Cool stuff I built...</div> },
  { id: "leadership", label: "Leadership", position: [3, 0, -3], content: <div>Leading teams...</div> },
  { id: "philosophy", label: "Philosophy", position: [4, 0, 3], content: <div>How I think...</div> },
  { id: "hobbies", label: "Hobbies", position: [0, 0, 5], content: <div>What I do for fun...</div> },
];

export default function JourneyMap() {
  const [activeLocation, setActiveLocation] = useState<LocationId | null>(null);
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 50, 50]);

  const handleLocationClick = (location: MapLocation) => {
    setActiveLocation(location.id);
    setTargetPosition(location.position);
  };

  return (
    <div className="w-full h-screen relative bg-[#e0f7fa]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [50, 35, 50], fov: 20 }}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <Scene />
          <Islands />
          <MapPath locations={locations} />
          <Boat targetPosition={targetPosition} />
          <MapLocations locations={locations} onLocationClick={handleLocationClick} activeLocation={activeLocation} />
        </Suspense>
      </Canvas>
      <Loader />
      
      {/* UI Panel for Content */}
      <div className={`absolute top-10 left-10 w-80 bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg transition-transform duration-500 transform ${activeLocation ? "translate-x-0" : "-translate-x-[150%]"}`}>
        <h2 className="text-2xl font-bold mb-4 capitalize">{activeLocation}</h2>
        <div className="text-gray-700">
            {locations.find(l => l.id === activeLocation)?.content}
        </div>
        <button 
            className="mt-4 text-sm text-gray-500 hover:text-black underline"
            onClick={() => setActiveLocation(null)}
        >
            Close
        </button>
      </div>
    </div>
  );
}
