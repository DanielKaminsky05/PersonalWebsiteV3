import { Environment, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export default function Scene() {
  useFrame((state) => {
    // Subtle camera parallax based on mouse
    const t = state.pointer;
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, 50 + t.x * 2, 0.05);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, 50 + t.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Warm 'Sunlight' */}
      <ambientLight intensity={0.8} color="#fffcf0" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        color="#fff5db"
        castShadow 
      />
      
      <Environment preset="city" />

      {/* The Map Surface (Parchment) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
            color="#f4e4bc" 
            roughness={0.9} 
            metalness={0.0}
        />
      </mesh>

      {/* Grid Lines (Latitude/Longitude feel) */}
      <gridHelper 
        args={[100, 50, "#d4c4a8", "#d4c4a8"]} 
        position={[0, -0.09, 0]} 
      />

      <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.4} far={10} color="#8d6e63" />
    </>
  );
}
