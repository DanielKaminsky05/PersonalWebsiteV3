"use client";

import { useMemo } from "react";
import { MapLocation } from "./types";
import * as THREE from "three";

// Simple pseudo-random function seeded by string
function seededRandom(seed: string) {
  let h = 0xdeadbeef;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
}

function Island({ location }: { location: MapLocation }) {
  const seed = location.id;
  
  // Deterministic random layout based on ID
  const islandConfig = useMemo(() => {
    const r = (n: number) => seededRandom(seed + n.toString());
    
    // Low-poly terrain chunks (mountains/hills)
    const chunks = Array.from({ length: 4 + Math.floor(r(1) * 3) }).map((_, i) => ({
      type: r(i) > 0.5 ? 'mountain' : 'hill',
      scale: 0.8 + r(i) * 1.5,
      position: [
        (r(i + 10) - 0.5) * 2.5, 
        i * 0.02, // Slight vertical offset to prevent Z-fighting
        (r(i + 20) - 0.5) * 2.5
      ] as [number, number, number],
      rotation: r(i + 30) * Math.PI,
      color: r(i + 40) > 0.5 ? '#d4b483' : '#c2a172' // Sand/Terrain variations
    }));

    // Generate 'Town' buildings (cubes with roofs)
    const buildings = Array.from({ length: 3 + Math.floor(r(2) * 5) }).map((_, i) => ({
      position: [
        (r(i + 40) - 0.5) * 1.5, 
        0.1, 
        (r(i + 50) - 0.5) * 1.5
      ] as [number, number, number],
      scale: 0.2 + r(i + 60) * 0.2,
      rotation: r(i + 70) * Math.PI,
      type: r(i + 80) > 0.8 ? 'tower' : 'house'
    }));

    return { chunks, buildings };
  }, [seed]);

  return (
    <group position={location.position}>
      {/* Terrain Chunks */}
      {islandConfig.chunks.map((chunk, i) => (
        <mesh 
          key={`ground-${i}`} 
          position={chunk.position} 
          rotation={[0, chunk.rotation, 0]}
          receiveShadow
          castShadow
        >
          {/* Jagged shapes for hand-drawn map feel */}
          <dodecahedronGeometry args={[chunk.scale * 0.6, 0]} />
          <meshStandardMaterial 
            color={chunk.color}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Buildings (Towns) */}
      {islandConfig.buildings.map((b, i) => (
        <group key={`build-${i}`} position={b.position} rotation={[0, b.rotation, 0]}>
          {/* Base */}
          <mesh position={[0, b.scale/2, 0]} castShadow>
            <boxGeometry args={[b.scale, b.scale, b.scale]} />
            <meshStandardMaterial color="#fdfbf7" /> {/* White plaster */}
          </mesh>
          {/* Roof */}
          <mesh position={[0, b.scale + b.scale/4, 0]} castShadow>
            <coneGeometry args={[b.scale * 0.8, b.scale * 0.5, 4]} />
            <meshStandardMaterial color="#a52a2a" flatShading /> {/* Red  roof */}
          </mesh>
        </group>
      ))}

      {/* Dock Structure - Always pointing somewhat towards center for visibility */}
      <group position={[1.2, 0, 1.2]} rotation={[0, -Math.PI/4, 0]}>
         <mesh position={[0, 0.05, 0]} receiveShadow>
            <boxGeometry args={[1, 0.05, 0.3]} />
            <meshStandardMaterial color="#5d4037" />
         </mesh>
          {/* Dock Piles */}
         <mesh position={[-0.4, -0.1, 0.1]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color="#3e2723" />
         </mesh>
         <mesh position={[0.4, -0.1, 0.1]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color="#3e2723" />
         </mesh>
      </group>

    </group>
  );
}

export default function Islands({ locations }: { locations: MapLocation[] }) {
  return (
    <group>
      {locations.map(loc => (
        <Island key={loc.id} location={loc} />
      ))}
    </group>
  );
}
