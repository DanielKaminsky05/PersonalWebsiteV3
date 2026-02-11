"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Islands() {
  const { scene: island1 } = useGLTF("/models/Island1.glb");
  const { scene: island2 } = useGLTF("/models/Island2.glb");

  // Enable shadows for both islands
  useMemo(() => {
    [island1, island2].forEach((scene) => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });
  }, [island1, island2]);

  return (
    <group>
      <primitive
        object={island1}
        position={[-30, -1, 0]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={3}
      />
      <primitive
        object={island2}
        position={[30, -1, -5]} // Moved further away to prevent overlap
        rotation={[0, Math.PI / 4, 0]}
        scale={3}
      />
    </group>
  );
}

useGLTF.preload("/models/Island1.glb");
useGLTF.preload("/models/Island2.glb");
