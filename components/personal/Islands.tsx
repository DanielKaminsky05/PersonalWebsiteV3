"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Islands() {
  const { scene: island1 } = useGLTF("/models/Island1.glb");
  const { scene: island2 } = useGLTF("/models/Island2.glb");
  const { scene: island3 } = useGLTF("/models/Island3.glb");

  // Enable shadows for both islands
  useMemo(() => {
    [island1, island2, island3].forEach((scene) => {
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
        position={[0, 0.5, 20]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={1}
      />
      <primitive
        object={island2}
        position={[20, 0, 0]} // Moved further away to prevent overlap
        rotation={[0, Math.PI / 4, 0]}
        scale={1}
      />
      <primitive
        object={island3}
        position={[0, 0.3, 0]} // Moved further away to prevent overlap
        rotation={[0, Math.PI / 4, 0]}
        scale={1}
      />
    </group>
  );
}

useGLTF.preload("/models/Island1.glb");
useGLTF.preload("/models/Island2.glb");
