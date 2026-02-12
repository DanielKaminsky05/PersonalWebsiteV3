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
  { id: "origins", label: "Origins", position: [15, 0, 20], content: <div>Where I started...</div> },
  { id: "projects", label: "Projects", position: [-10, 0, 20], content: <div>Cool stuff I built...</div> },
  { id: "leadership", label: "Leadership", position: [-4, 0, -3], content: <div>Leading teams...</div> },
  { id: "philosophy", label: "Philosophy", position: [15, 0, -12], content: <div>How I think...</div> },
  { id: "hobbies", label: "Hobbies", position: [20, 0, 5], content: <div>What I do for fun...</div> },
];

export default function JourneyMap() {
  const [activeLocation, setActiveLocation] = useState<LocationId | null>(null);
  const [menuLocation, setMenuLocation] = useState<LocationId | null>(null);

  const pathPoints: [number, number, number][] = [
    [15, 0, 20],   // Origins
    [10, 0, 21],
    [0, 0, 15],    // Control point to curve left around island
    [-10, 0, 20],  // Projects
    [-12, 0, 8],
    [-4, 0, -3],   // Leadership
    [-6, 0, -10],
    [15, 0, -12],  // Philosophy
    [20, 0, 5],    // Hobbies
  ];

  const handleLocationClick = (location: MapLocation) => {
    // Hide menu immediately when starting travel
    setMenuLocation(null);
    setActiveLocation(location.id);
  };

  const handleBoatArrived = () => {
    // Show menu when boat arrives
    setMenuLocation(activeLocation);
  };

  return (
    <div className="w-full h-screen relative bg-[#e0f7fa]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [40, 30, 50], fov: 25 }}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <Scene />
          <Islands />
          <Boat 
            points={pathPoints} 
            activeLocationId={activeLocation} 
            locations={locations}
            onArrived={handleBoatArrived}
          />
          <MapLocations 
            locations={locations} 
            activeLocation={activeLocation} 
            onLocationClick={handleLocationClick} 
          />
          <MapPath points={pathPoints} />
        </Suspense>
      </Canvas>
      <Loader />
      
      {/* UI Panel for Content */}
      <div className={`absolute top-10 left-10 w-80 bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg transition-transform duration-500 transform ${menuLocation ? "translate-x-0" : "-translate-x-[150%]"}`}>
        <h2 className="text-2xl font-bold mb-4 capitalize">{menuLocation}</h2>
        <div className="text-gray-700">
            {locations.find(l => l.id === menuLocation)?.content}
        </div>
        <button 
            className="mt-4 text-sm text-gray-500 hover:text-black underline"
            onClick={() => { setMenuLocation(null); setActiveLocation(null); }}
        >
            Close
        </button>
      </div>
    </div>
  );
}
