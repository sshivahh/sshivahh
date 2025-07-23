"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  scrollVelocity: number;
};

export default function WireCubeCanvas({ scrollVelocity }: Props) {
  return (
    <div className="absolute hidden md:block bottom-[35%] right-[60vw] md:bottom-[3rem] md:right-[3rem] w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <WireCube scrollVelocity={scrollVelocity} />
      </Canvas>
    </div>
  );
}

function WireCube({ scrollVelocity }: { scrollVelocity: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    // Spin speed influenced by scroll velocity
    const spinSpeed = delta * (0.5 + Math.abs(scrollVelocity) * 0.005);
    ref.current.rotation.x += spinSpeed * 0.4;
    ref.current.rotation.y += spinSpeed;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[3, 3, 3]} />
      <meshBasicMaterial color="white" wireframe />
    </mesh>
  );
}
