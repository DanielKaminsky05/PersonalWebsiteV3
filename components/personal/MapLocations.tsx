import { Html } from "@react-three/drei";
import { useState } from "react";
import { MapLocation, LocationId } from "./types";

interface MapLocationsProps {
  locations: MapLocation[];
  onLocationClick: (location: MapLocation) => void;
  activeLocation: LocationId | null;
}

export default function MapLocations({ locations, onLocationClick, activeLocation }: MapLocationsProps) {
  return (
    <>
      {locations.map((loc) => (
        <LocationMarker
          key={loc.id}
          location={loc}
          onClick={() => onLocationClick(loc)}
          isActive={activeLocation === loc.id}
        />
      ))}
    </>
  );
}

function LocationMarker({ location, onClick, isActive }: { location: MapLocation, onClick: () => void, isActive: boolean }) {
  const [hovered, setHovered] = useState(false);
  const color = isActive ? "#ef4444" : (hovered ? "#dc2626" : "#7f1d1d"); // Red ink colors

  return (
    <group 
      position={location.position}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Invisible Hitbox */}
      <mesh visible={false}>
         <boxGeometry args={[3, 2, 3]} />
         <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* "X" Mark Geometry */}
      <group 
        rotation={[0, Math.PI / 4, 0]} // Rotate to make it an X
        position={[0, 0.02, 0]} // Just above paper
        scale={hovered || isActive ? 3.2 : 3}
      >
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.05, 0.15]} />
            <meshStandardMaterial color={color} roughness={1} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.05, 0.15]} />
            <meshStandardMaterial color={color} roughness={1} />
        </mesh>
      </group>
      
      {/* Label - Handwritten style font if possible, standard for now */}
      <Html position={[0, 1, 0]} center distanceFactor={10}>
        <div 
          className={`px-3 py-1 text-3xl font-bold transition-all duration-300 pointer-events-none whitespace-nowrap
            ${isActive ? "text-red-600 scale-125 font-serif" : (hovered ? "text-red-500 font-serif" : "text-gray-600/70 font-serif")}
          `}
          style={{ textShadow: '0 0 2px #f4e4bc' }} // Paper colored outline for readability
        >
          {location.label}
        </div>
      </Html>
    </group>
  );
}
