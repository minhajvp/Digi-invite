'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Rings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]} position={[0.5, 0.2, 0.5]}>
          <torusGeometry args={[1.2, 0.04, 16, 100]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function FloatingRings() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#fef3c7" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#d97706" />
        <Rings />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
