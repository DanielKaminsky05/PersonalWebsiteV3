"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, MathUtils, Quaternion } from "three";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import { MapLocation, LocationId } from "./types";

interface BoatProps {
  points: [number, number, number][];
  activeLocationId: LocationId | null;
  locations: MapLocation[];
  onArrived: () => void;
}

export default function Boat({ points, activeLocationId, locations, onArrived }: BoatProps) {
  const meshRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const targetProgress = useRef<number | null>(null);
  const lastSignaledTarget = useRef<number | null>(null);

  // ... (curve and map setup code remains same, omitted here for brevity if replace handles contexts correctly but here I need to be careful)
  // Wait, I can't restart the function body easily with replace_file_content unless I replace the whole function start.
  // I will target the props interface and function signature first.
  
  // NOTE regarding the tool usage: I must target contiguous blocks. 
  // I will do this in two chunks if needed, or valid range.
  // Let's do the logic injection in useFrame separately from Props update? No, Props update changes signature.
  // I'll update the Interface and Main Function Signature in one go.
  
  // Actually, I can replace from `interface BoatProps` down to `const meshRef` start.

  
  // Create the curve from points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
      true, // Closed loop
      'catmullrom',
      0.5
    );
  }, [points]);

  // Pre-calculate progress (t) for each location
  const locationProgressMap = useMemo(() => {
    const map = new Map<LocationId, number>();
    
    // Sample curve to find closest t for each location
    const divisions = 200;
    locations.forEach(loc => {
        const locPos = new Vector3(...loc.position);
        let minTime = 0;
        let minDist = Infinity;
        
        for (let i = 0; i <= divisions; i++) {
            const t = i / divisions;
            const point = curve.getPointAt(t);
            const dist = point.distanceTo(locPos);
            if (dist < minDist) {
                minDist = dist;
                minTime = t;
            }
        }
        map.set(loc.id, minTime);
    });
    return map;
  }, [curve, locations]);

  // Update target when active location changes
  useEffect(() => {
    if (activeLocationId) {
        const t = locationProgressMap.get(activeLocationId);
        if (t !== undefined) {
            // Logic to ensure forward movement:
            // We want target > current.
            // Current is always increasing (absolute).
            // Let's work with normalized (0-1) for lookup, but absolute for movement.
            
            const currentMod = progress.current % 1;
            let targetMod = t;
            
            // If target is behind us in the loop, moving forward means going to next loop
            if (targetMod < currentMod) {
                targetMod += 1;
            }
            
            // However, we need to apply this to the absolute progress.
            // progress.current = 5.8 (0.8 mod)
            // target = 0.2
            // We want target to be 6.2
            
            // Calculate base loop index
            const baseLoop = Math.floor(progress.current);
            let absoluteTarget = baseLoop + targetMod;
            
            // Ensure target is ahead of current
            if (absoluteTarget < progress.current) {
                absoluteTarget += 1;
            }
            
            targetProgress.current = absoluteTarget;
        }
    }
    // If null, we just stay where we are (target remains what it was or null? If null, stop?)
    // User said "stops until you click". So if no target, stop.
    // If we click off, do we stop immediately? Yes.
    else {
        targetProgress.current = null;
    }
  }, [activeLocationId, locationProgressMap]);


  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Movement Logic
    const SPEED = 0.05; // Base speed
    
    if (targetProgress.current !== null) {
        // Move towards target
        // Check distance to target
        const dist = targetProgress.current - progress.current;
        const STOP_THRESHOLD = 0.001;
        const ARRIVAL_SIGNAL_THRESHOLD = 0.05; // Trigger early (5% of loop) so menu pops up during deceleration
        
        // Signal early arrival
        if (dist <= ARRIVAL_SIGNAL_THRESHOLD) {
             if (lastSignaledTarget.current !== targetProgress.current) {
                 lastSignaledTarget.current = targetProgress.current;
                 onArrived();
             }
        }
        
        if (dist > STOP_THRESHOLD) {
            // Move forward
            let moveStep = delta * SPEED;
            
            // Slow down when close
            if (dist < 0.1) {
                moveStep *= (dist / 0.1); 
                // Ensure minimum speed to actually finish
                moveStep = Math.max(moveStep, delta * 0.005);
            }
            
            // Apply movement, but don't overshoot beyond target
            progress.current += Math.min(moveStep, dist);
        } 
        
        // Check if we have arrived (or are close enough to snap)
        // We check this separately so even if we moved just a tiny bit or were already close, we snap.
        if (Math.abs(targetProgress.current - progress.current) <= STOP_THRESHOLD) {
             if (progress.current !== targetProgress.current) {
                 progress.current = targetProgress.current;
             }
             
             // Signal arrival (redundant check if already signaled, but safe)
             if (lastSignaledTarget.current !== targetProgress.current) {
                 lastSignaledTarget.current = targetProgress.current;
                 onArrived();
             }
        }
    }


    // Get position and tangent from curve logic
    const t = progress.current % 1; // Normalize to 0-1 for getPoint
    const position = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();

    // Update position
    meshRef.current.position.copy(position);

    // Update rotation to face forward (along tangent)
    const lookAtPos = position.clone().add(tangent);
    meshRef.current.lookAt(lookAtPos);
  });

  // Load the GLB model
  const { scene } = useGLTF("/models/boat.glb");

  return (
    <Float speed={0} rotationIntensity={0} floatIntensity={0.1} floatingRange={[-0.005, 0.005]}>
      <group ref={meshRef}>
        <primitive 
            object={scene} 
            position={[0, -0.05, 0]}
            rotation={[0, 2* Math.PI, 0]} 
            scale={1.5} 
        />
      </group>
    </Float>
  );
}

// Preload the model
useGLTF.preload("/models/boat.glb");

// Need THREE for matrix operations inside useFrame
// import * as THREE from 'three'; // Removed duplicate

