'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Petal = ({ position, scale, rotationSpeed, floatSpeed, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Curved Petal Geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, 10, 10);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Curve the plane to look like a petal
      const z = Math.sin(x * Math.PI) * 0.3 + Math.cos(y * Math.PI) * 0.3;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * delta;
      meshRef.current.rotation.y += rotationSpeed.y * delta;
      meshRef.current.rotation.z += rotationSpeed.z * delta;
      meshRef.current.position.y -= floatSpeed * delta; // falling down

      // Reset position if it goes too low
      if (meshRef.current.position.y < -15) {
        meshRef.current.position.y = 15;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial 
          color={color} 
          side={THREE.DoubleSide} 
          roughness={0.6} 
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

export default function FloatingPetals({ count = 30, colors = ['#10b981', '#34d399', '#fcd34d', '#fbbf24'] }) {
  const [petals, setPetals] = useState<any[]>([]);
  useEffect(() => {
    setPetals(Array.from({ length: count }).map((_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15 - 5],
      scale: Math.random() * 0.5 + 0.3,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
      },
      floatSpeed: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    })));
  }, [count, colors]);

  if (petals.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -10, -5]} intensity={0.5} color="#fbbf24" />
        
        {petals.map((petal) => (
          <Petal key={petal.id} {...petal} />
        ))}
      </Canvas>
    </div>
  );
}
