"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import AINetwork from "./AINetwork";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function CameraRig() {
  const ref = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      mouse.current.x = normalizedX;
      mouse.current.y = normalizedY;
      
      // Tăng độ nhạy - phản ứng mạnh hơn với cursor
      targetPosition.current.x = normalizedX * 1.2;
      targetPosition.current.y = -normalizedY * 1.2;
    });
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Tăng độ nhạy và tốc độ phản ứng với cursor
    const lerpSpeed = 0.08; // Tăng từ 0.02 lên 0.08 để phản ứng nhanh hơn
    
    state.camera.position.x +=
      (targetPosition.current.x - state.camera.position.x) * lerpSpeed;
    state.camera.position.y +=
      (targetPosition.current.y - state.camera.position.y) * lerpSpeed;

    // Thêm rotation nhẹ theo cursor để tăng độ liên kết
    state.camera.rotation.z = mouse.current.x * 0.05;
    state.camera.rotation.x = mouse.current.y * 0.03;

    state.camera.position.z = 8 + Math.sin(t * 0.5) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref} />;
}

export default function SpaceScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
        camera={{ position: [0, 0, 8], fov: 75 }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#02040f"]} />

          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} />

          <Stars
            radius={120}
            depth={60}
            count={6000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <AINetwork count={20} />

          <CameraRig />

          {/* Glow / Bloom */}
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
