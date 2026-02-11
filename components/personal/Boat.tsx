"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, MathUtils, Quaternion } from "three";
import { Float, useGLTF } from "@react-three/drei";

interface BoatProps {
  targetPosition: [number, number, number];
}

export default function Boat({ targetPosition }: BoatProps) {
  const meshRef = useRef<any>(null);
  const currentPos = useMemo(() => new Vector3(40, 0, 40), []);
  const velocity = useMemo(() => new Vector3(0, 0, 0), []);
  const worldTarget = useMemo(() => new Vector3(...targetPosition), [targetPosition]);
  
  // Physics parameters
  const MAX_SPEED = 0;
  const ACCELERATION = 2.0;
  const TURN_SPEED = 2.5;
  const STOPPING_DISTANCE = 0.1;
  const DOCKING_RADIUS = 2.5; // Distance to stop from island center

  // Load the GLB model
  const { scene } = useGLTF("/models/boat.glb");

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Calculate Docking Position
    // Instead of going TO the center of the island, we want to go NEAR it.
    // Calculate direction from Island -> Boat (to know which side we are on)
    // Actually, calculate direction from Boat -> Island, then stop short.
    
    const distToTarget = currentPos.distanceTo(worldTarget);
    
    // We want to stop at 'DOCKING_RADIUS' away from worldTarget.
    // So the *actual* movement target is along the line to the target, but short of it.
    // However, if we just lerp the target, the boat might snap.
    // Let's use a "smart target" that is the point on the docking circle closest to the boat.
    
    const dirToTarget = new Vector3().subVectors(worldTarget, currentPos).normalize();
    const actualTarget = new Vector3().copy(worldTarget).sub(dirToTarget.multiplyScalar(DOCKING_RADIUS));

    const distToActualTarget = currentPos.distanceTo(actualTarget);
    
    // 2. Physics Movement
    if (distToTarget > DOCKING_RADIUS + STOPPING_DISTANCE) {
        // Accelerate towards actual target
        const desiredVelocity = new Vector3().subVectors(actualTarget, currentPos).normalize().multiplyScalar(MAX_SPEED);
        
        // Smooth scaling of speed for arrival
        if (distToActualTarget < 2.0) {
            desiredVelocity.multiplyScalar(distToActualTarget / 2.0);
        }

        // Apply force (steering)
        const steering = new Vector3().subVectors(desiredVelocity, velocity).multiplyScalar(ACCELERATION * delta);
        velocity.add(steering);
        
        // Clamp velocity
        if (velocity.length() > MAX_SPEED) velocity.setLength(MAX_SPEED);
    } else {
        // Decelerate to stop
        velocity.lerp(new Vector3(0,0,0), delta * 2);
    }

    // Apply Velocity
    currentPos.add(velocity.clone().multiplyScalar(delta));
    meshRef.current.position.copy(currentPos);

    // 3. Rotation (Turning)
    // Only rotate if moving significantly
    if (velocity.lengthSq() > 0.01) {
        const targetRotation = new Quaternion();
        const lookAtMatrix = new THREE.Matrix4().lookAt(currentPos, new Vector3().addVectors(currentPos, velocity), new Vector3(0, 1, 0));
        targetRotation.setFromRotationMatrix(lookAtMatrix);
        
        meshRef.current.quaternion.slerp(targetRotation, TURN_SPEED * delta);
        
        // Tilt based on turn (banking) - simplified
        // We could calculate angular velocity but a simple sway based on rotation diff works too
        // For now, let's just let the Float component handle the wobble to avoid fighting physics
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef}>
        <primitive 
            object={scene} 
            position={[0, 0, 0]} 
            scale={1.5} 
            rotation={[0, Math.PI, 0]} 
        />
      </group>
    </Float>
  );
}

// Preload the model
useGLTF.preload("/models/boat.glb");

// Need THREE for matrix operations inside useFrame
import * as THREE from 'three';
