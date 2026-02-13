import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Scene from "./Scene";
import Boat from "./Boat";
import MapLocations from "./MapLocations";
import { Html, Loader } from "@react-three/drei";
import { MapLocation, LocationId } from "./types";
import MapPath from "./MapPath";
import Islands from "./Islands";
import { Vector3 } from "three";
import personalMapData from "@/data/personalMap.json";
import LocationOverlay from "./LocationOverlay";
import Origins from "./locations/Origins";
import Status from "./locations/Status";
import Interests from "./locations/CurrentInterests";
import Philosophy from "./locations/Philosophy";
import Hobbies from "./locations/Hobbies";

// Map location IDs to their respective components
const LOCATION_COMPONENTS: Record<string, React.ComponentType> = {
  origins: Origins,
  status: Status,
  interests: Interests,
  philosophy: Philosophy,
  hobbies: Hobbies,
};

// Layout constants
const DESKTOP_LAYOUT = {
  scale: 1, // Base scale
  islands: {
    island1: [0, 0, -20],
    island2: [5, 0, 25],
    island3: [-20, 0, 0],
    island4: [25, 0, 0],
  },
  locations: [
    { id: "origins", label: "Origins", position: [15, 0, 20] },
    { id: "status", label: "Status", position: [-10, 0, 20] },
    { id: "interests", label: "Interests", position: [-4, 0, -3] },
    { id: "philosophy", label: "Philosophy", position: [15, 0, -12] },
    { id: "hobbies", label: "Hobbies", position: [20, 0, 5] },
  ],
  pathPoints: [
    [15, 0, 20],   // Origins
    [10, 0, 21],
    [0, 0, 15],    // Control point
    [-10, 0, 20],  // Projects
    [-12, 0, 8],
    [-4, 0, -3],   // Leadership
    [-6, 0, -10],
    [15, 0, -12],  // Philosophy
    [20, 0, 5],    // Hobbies
  ]
};

const MOBILE_LAYOUT = {
  scale: 0.5, // Smaller scale for mobile
  islands: {
    // Tighter, more vertical stack
    island1: [0, 0, -10], 
    island2: [2, 0, 12], 
    island3: [-10, 0, -2], 
    island4: [13, 0, 0], 
  },
  locations: [
    // Closer to center
    { id: "origins", label: "Origins", position: [8, 0, 10] },
    { id: "status", label: "Status", position: [-5, 0, 10] },
    { id: "interests", label: "Interests", position: [-2, 0, -2] },
    { id: "philosophy", label: "Philosophy", position: [8, 0, -6] },
    { id: "hobbies", label: "Hobbies", position: [10, 0, 2] },
  ],
  pathPoints: [
    // Tighter curve
    [8, 0, 10],   
    [5, 0, 11],
    [0, 0, 8],    
    [-5, 0, 10],  
    [-6, 0, 4],
    [-2, 0, -2],   
    [-3, 0, -5],
    [8, 0, -6],  
    [10, 0, 2],    
  ]
};

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    
    if (aspect < 1) {
       // Portrait: We are using MOBILE_LAYOUT now.
       // We need to scale the distance based on how narrow the screen is to keep the horizontal width in view.
       // Base distance 60 is good for roughly square aspect. 
       // For narrower screens (iPhone), we need to maintain horizontal FOV.
       // Distance ~= Base / aspect
       const base = 40; 
       const adjusted = base / aspect; 
       
       camera.position.set(adjusted, adjusted * 0.8, adjusted); 
    } else {
       // Landscape: Desktop layout
       camera.position.set(50, 30, 50);
    }
    
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null;
}

export default function JourneyMap() {
  const [activeLocation, setActiveLocation] = useState<LocationId | null>(null);
  const [menuLocation, setMenuLocation] = useState<LocationId | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;

  const currentLocations = layout.locations.map(l => ({
    ...l,
    content: null // Deprecated, using component mapping
  })) as MapLocation[];

  const currentPathPoints = layout.pathPoints as [number, number, number][];
  const currentIslandPositions = layout.islands as any; 
  const currentScale = layout.scale;

  const handleLocationClick = (location: MapLocation) => {
    setMenuLocation(null);
    setActiveLocation(location.id);
  };

  const handleBoatArrived = () => {
    setMenuLocation(activeLocation);
  };

  const ActiveComponent = menuLocation ? LOCATION_COMPONENTS[menuLocation] : null;

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#29b6f6] overflow-hidden">
      <Canvas shadows dpr={[1, 3]} camera={{ position: [50, 30, 50], fov: 25 }}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <ResponsiveCamera />
          <Scene />
          <Islands positions={currentIslandPositions} scale={currentScale} />
          <Boat 
            points={currentPathPoints} 
            activeLocationId={activeLocation} 
            locations={currentLocations}
            onArrived={handleBoatArrived}
            scale={currentScale}
          />
          <MapLocations 
            locations={currentLocations} 
            activeLocation={activeLocation} 
            onLocationClick={handleLocationClick} 
            scale={currentScale}
          />
          <MapPath points={currentPathPoints} />
        </Suspense>
      </Canvas>
      <Loader />
      
      {/* UI Panel for Content */}
      <AnimatePresence>
        {menuLocation && ActiveComponent && (
          <LocationOverlay onClose={() => { setMenuLocation(null); setActiveLocation(null); }}>
            <ActiveComponent />
          </LocationOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}
