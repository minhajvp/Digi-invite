'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CrystalShard = ({ position, scale, rotationSpeed }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * delta;
      meshRef.current.rotation.y += rotationSpeed.y * delta;
      meshRef.current.rotation.z += rotationSpeed.z * delta;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#ffffff" 
        emissive="#ffffff"
        emissiveIntensity={0.5}
        transparent 
        opacity={0.3} 
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
};

const ConstellationLines = ({ shards }: { shards: any[] }) => {
  const lines = useMemo(() => {
    const segments: any[] = [];
    for (let i = 0; i < shards.length; i++) {
      for (let j = i + 1; j < shards.length; j++) {
        const dist = new THREE.Vector3(...shards[i].position).distanceTo(new THREE.Vector3(...shards[j].position));
        if (dist < 6) {
          segments.push([shards[i].position, shards[j].position]);
        }
      }
    }
    return segments;
  }, [shards]);

  return (
    <>
      {lines.map((points, idx) => (
        <Line
          key={idx}
          points={points}
          color="#e2e8f0"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
    </>
  );
};

export default function FloatingCrystals({ count = 20 }) {
  const [shards, setShards] = useState<any[]>([]);

  useEffect(() => {
    setShards(Array.from({ length: count }).map((_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15 - 5],
      scale: Math.random() * 0.2 + 0.1,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
      }
    })));
  }, [count]);

  if (shards.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-white via-slate-50/30 to-white">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#f1f5f9" />
        
        {shards.map((shard) => (
          <CrystalShard key={shard.id} {...shard} />
        ))}
        
        <ConstellationLines shards={shards} />
      </Canvas>
    </div>
  );
}
