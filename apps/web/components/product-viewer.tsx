"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center } from "@react-three/drei";
import { Suspense } from "react";

interface ProductViewerProps {
  modelUrl?: string;
  className?: string;
}

function FallbackBox() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 1.5, 0.4]} />
      <meshStandardMaterial color="#1B3A6B" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function ProductModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function ProductViewer({ modelUrl, className = "" }: ProductViewerProps) {
  return (
    <div className={`w-full aspect-square chalk-border rounded-lg overflow-hidden hatching ${className}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<FallbackBox />}>
          <Center>
            {modelUrl ? <ProductModel url={modelUrl} /> : <FallbackBox />}
          </Center>
        </Suspense>
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
