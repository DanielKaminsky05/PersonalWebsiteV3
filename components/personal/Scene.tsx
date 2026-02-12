import { Environment, ContactShadows } from "@react-three/drei";

export default function Scene() {


  return (
    <>
      <color attach="background" args={["#29b6f6"]} />

      {/* Warm 'Sunlight' */}
      <ambientLight intensity={0.8} color="#fffcf0" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        color="#fff5db"
        castShadow 
      />
      
      <Environment preset="city" />

      {/* The Map Surface (Water) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial 
            color="#29b6f6" 
            roughness={0.4} 
            metalness={0.1}
        />
      </mesh>

      {/* Grid Lines (Latitude/Longitude feel) */}
      

      <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.4} far={10} color="#8d6e63" />
    </>
  );
}
