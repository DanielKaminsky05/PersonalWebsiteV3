"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Islands() {
  const { scene } = useGLTF("/models/Island1.glb");

  // Enable shadows
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      position={[0, -1, 0]} 
      rotation={[0, -Math.PI / 4, 0]}
      scale={3} 
    />
  );
}

useGLTF.preload("/models/Island1.glb");
