"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";


interface IslandsProps {
  positions: {
    island1: [number, number, number];
    island2: [number, number, number];
    island3: [number, number, number];
    island4: [number, number, number];
  };
  scale?: number;
}

export default function Islands({ positions, scale = 1 }: IslandsProps) {
  const { scene: island1 } = useGLTF("/models/Island1.glb");
  const { scene: island2 } = useGLTF("/models/Island2.glb");
  const { scene: island3 } = useGLTF("/models/Island3.glb");
  const { scene: island4 } = useGLTF("/models/Island4.glb");

  // Enable shadows for both islands
  useMemo(() => {
    [island1, island2, island3, island4].forEach((scene) => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });
  }, [island1, island2, island3, island4]);

  return (
    <group>
      <primitive
        object={island1}
        position={positions.island1}
        rotation={[0, -1.5 * Math.PI / 4, 0]}
        scale={scale}
      />
      <primitive
        object={island2}
        position={positions.island2}
        rotation={[0, Math.PI / 4, 0]}
        scale={scale}
      />
      <primitive
        object={island3}
        position={positions.island3}
        rotation={[0, 2 * Math.PI / 4, 0]}
        scale={scale}
      />

       <primitive
        object={island4}
        position={positions.island4}
        rotation={[0, 1.8* Math.PI / 4, 0]}
        scale={scale}
      />
    </group>
  );
}

useGLTF.preload("/models/Island1.glb");
useGLTF.preload("/models/Island2.glb");
useGLTF.preload("/models/Island3.glb");
useGLTF.preload("/models/Island4.glb");
