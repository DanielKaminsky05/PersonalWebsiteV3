import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function MapPath({ points }: { points: [number, number, number][] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // 1. Create the curve
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
      true, // Closed loop
      'catmullrom',
      0.5 // Tension
    );
  }, [points]);

  // 2. Position the dashes along the curve
  useLayoutEffect(() => {
    if (!meshRef.current) return;

    const totalLength = curve.getLength();
    const dashLength = 0.5;
    const gapLength = 0.3;
    const segmentLength = dashLength + gapLength;
    const count = Math.floor(totalLength / segmentLength);

    meshRef.current.count = count;

    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0); // Y-up

    for (let i = 0; i < count; i++) {
        const t = (i * segmentLength) / totalLength;
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t);

        dummy.position.copy(point);
        // Add a tiny Y offset to prevent z-fighting with the map
        dummy.position.y = 0.05;

        // Orient the dash along the tangent
        // Since we scale the box along Z, the forward vector is (0,0,1)
        // We want the Z-axis of the object to point along the tangent
        const target = point.clone().add(tangent);
        dummy.lookAt(target);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [curve]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 1000]}>
        {/* BoxGeometry: width (X), height (Y/thickness), depth (Z/length along path) */}
        <boxGeometry args={[0.15, 0.02, 0.5]} />
        <meshStandardMaterial 
            color="#000000" 
            transparent 
            opacity={0.8}
            roughness={1}
        />
    </instancedMesh>
  );
}
