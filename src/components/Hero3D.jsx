import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
      glare={false}
      shadows
      camera={{ fov: 60, position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={new THREE.Vector3(5, 5, 5)}
        intensity={0.8}
      />
      <directionalLight
        position={new THREE.Vector3(-5, -5, -5)}
        intensity={0.3}
      />

      <group rotation={[-0.2, 0, 0]}>
        {/* Subtle cyan geometric tube */}
        <mesh>
          <torusGeometry radius={0.6} tube={0.15} tubularSegments={48} rotateX={Math.PI / 4} />
          <meshStandardMaterial
            metalness={0.3}
            roughness={0.5}
            color="#4CC9F0"
            emissive="#0A0A0A"
            emissiveIntensity={0.02}
          />
        </mesh>

        {/* Soft violet sphere */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            metalness={0}
            roughness={0.8}
            color="#8B5CF6"
            opacity={0.15}
            transparent
          />
        </mesh>

        {/* Minimal chrome ring */}
        <mesh>
          <torusGeometry radius={1.2} tube={0.1} tubularSegments={60} rotateX={Math.PI / 2} />
          <meshStandardMaterial
            metalness={0.5}
            roughness={0.3}
            color="#8B5CF6"
            opacity={0.1}
          />
        </mesh>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableAutoRotate={true}
        autoRotateSpeed={0.3}
        minPolar={0.5}
        maxPolar={Math.PI - 0.5}
      />
    </Canvas>
  );
}