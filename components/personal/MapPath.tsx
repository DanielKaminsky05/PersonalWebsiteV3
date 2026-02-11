"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { MapLocation } from "./types";
import { Line } from "@react-three/drei";

export default function MapPath({ locations }: { locations: MapLocation[] }) {
  const points = locations.map(l => new THREE.Vector3(...l.position));

  // Create a curved path? Or just straight lines for a map feel?
  // Straight lines with dashes often look more "map-like".
  
  return (
    <Line
      points={points}       // Array of points
      color="#8b0000"       // Red Ink color
      lineWidth={3}         // Thicker line
      dashed={true}         // Dashed line
      dashScale={5}         // Larger dashes
      dashSize={0.4}        // Dash size
      gapSize={0.4}         // Gap size
      position={[0, 0.05, 0]} // Slightly above map
      opacity={0.8}
      transparent
    />
  );
}
