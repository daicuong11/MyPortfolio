"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import AINetwork from "./AINetwork";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function CameraRig() {
  const ref = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Skip if scrolling for performance
      if (isScrolling) return;
      
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      mouse.current.x = normalizedX;
      mouse.current.y = normalizedY;
      
      targetPosition.current.x = normalizedX * 1.2;
      targetPosition.current.y = -normalizedY * 1.2;
    };

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  useFrame((state) => {
    // Reduce frame calculations when scrolling
    if (isScrolling) return;

    const t = state.clock.getElapsedTime();
    const lerpSpeed = 0.08;
    
    state.camera.position.x +=
      (targetPosition.current.x - state.camera.position.x) * lerpSpeed;
    state.camera.position.y +=
      (targetPosition.current.y - state.camera.position.y) * lerpSpeed;

    state.camera.rotation.z = mouse.current.x * 0.05;
    state.camera.rotation.x = mouse.current.y * 0.03;

    state.camera.position.z = 8 + Math.sin(t * 0.5) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref} />;
}

export default function SpaceScene() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroSection = document.querySelector('.hero-cursor-area');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  if (!visible) {
    return <div className="w-full h-full bg-[#02040f]" />;
  }

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
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#02040f"]} />

          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} />

          <Stars
            radius={120}
            depth={60}
            count={2000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          <AINetwork count={12} />

          <CameraRig />

          {/* Simplified Bloom for better performance */}
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.8}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
