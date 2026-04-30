'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Heart = ({ position, scale, rotationSpeed, floatSpeed, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create Heart Shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0;
    const y = 0;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y, x, y);
    shape.bezierCurveTo(x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5);
    shape.bezierCurveTo(x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5);
    shape.bezierCurveTo(x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.2,
    bevelThickness: 0.2,
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta;
      meshRef.current.position.y += floatSpeed * delta;

      // Reset position if it goes too high
      if (meshRef.current.position.y > 15) {
        meshRef.current.position.y = -15;
      }
    }
  });

  return (
    <Float speed={4} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

export default function FloatingHearts({ count = 15, colors = ['#fca5a5', '#f87171', '#fecdd3', '#ffffff'] }) {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: count }).map((_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10 - 5],
      scale: Math.random() * 0.05 + 0.02,
      rotationSpeed: (Math.random() - 0.5) * 4,
      floatSpeed: Math.random() * 1.5 + 1.0,
      color: colors[Math.floor(Math.random() * colors.length)],
    })));
  }, [count, colors]);

  if (hearts.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f43f5e" />
        
        {hearts.map((heart) => (
          <Heart key={heart.id} {...heart} />
        ))}
      </Canvas>
    </div>
  );
}
