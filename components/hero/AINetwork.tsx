"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

type TechIcon = {
  emoji: string;
  label: string;
  color: string;
};

type Node = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
  tech: TechIcon;
};

// Danh sách các biểu tượng công nghệ IT
const techIcons: TechIcon[] = [
  { emoji: "🤖", label: "AI", color: "#00e5ff" },
  { emoji: "☁️", label: "Cloud", color: "#4dd0e1" },
  { emoji: "💾", label: "Database", color: "#26c6da" },
  { emoji: "🔒", label: "Security", color: "#00acc1" },
  { emoji: "⛓️", label: "Blockchain", color: "#0097a7" },
  { emoji: "📱", label: "Mobile", color: "#00838f" },
  { emoji: "🌐", label: "Web", color: "#006064" },
  { emoji: "📡", label: "IoT", color: "#80deea" },
  { emoji: "📊", label: "Analytics", color: "#26c6da" },
  { emoji: "🧠", label: "ML", color: "#00e5ff" },
  { emoji: "⚙️", label: "DevOps", color: "#4dd0e1" },
  { emoji: "🔌", label: "API", color: "#00acc1" },
  { emoji: "💫", label: "Quantum", color: "#80deea" },
  { emoji: "📶", label: "5G", color: "#0097a7" },
  { emoji: "🥽", label: "AR/VR", color: "#00e5ff" },
];

export default function AINetwork({ count = 40 }) {
  const nodesRef = useRef<THREE.Group[]>([]);
  const lineGeometriesRef = useRef<THREE.BufferGeometry[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, z: 0 });
  const hoveredNodeRef = useRef<number | null>(null);
  const clickedNodeRef = useRef<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nodes = useMemo<Node[]>(() => {
    const arr: Node[] = [];
    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      // Gán ngẫu nhiên một tech icon cho mỗi node
      const tech = techIcons[i % techIcons.length];
      arr.push({
        position: pos.clone(),
        originalPosition: pos.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        ),
        tech,
      });
    }
    return arr;
  }, [count]);

  const connections = useMemo(() => {
    const arr: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Tăng khoảng cách tối thiểu để ít connections hơn, nhìn gọn hơn
        if (nodes[i].position.distanceTo(nodes[j].position) < 3.5) {
          arr.push([i, j]);
        }
      }
    }
    // Initialize line geometries
    lineGeometriesRef.current = arr.map(([a, b]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        nodes[a].position.clone(),
        nodes[b].position.clone(),
      ]);
      return geometry;
    });
    return arr;
  }, [nodes]);

  // Lắng nghe cursor movement để tạo parallax effect và magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    // Đơn giản hóa vị trí mouse trong không gian 3D
    const mouse3D = new THREE.Vector3(
      mouseRef.current.x * 5,
      -mouseRef.current.y * 3.5,
      0 // Giữ z = 0 để ổn định hơn
    );

    nodes.forEach((n, index) => {
      // Thêm damping cho velocity để tránh tích lũy quá nhiều
      n.velocity.multiplyScalar(0.98);

      // Giới hạn velocity tối đa
      const maxVelocity = 0.02;
      if (n.velocity.length() > maxVelocity) {
        n.velocity.normalize().multiplyScalar(maxVelocity);
      }

      n.position.add(n.velocity);

      // Thêm parallax effect dựa trên cursor position (nhẹ hơn)
      const depthFactor = Math.max(0, (n.position.z + 3) / 6);
      const parallaxStrength = 0.1; // Giảm từ 0.15 xuống 0.1
      const parallaxX = mouseRef.current.x * parallaxStrength * depthFactor;
      const parallaxY = mouseRef.current.y * parallaxStrength * depthFactor;
      n.position.x += parallaxX * 0.008; // Giảm từ 0.01 xuống 0.008
      n.position.y += parallaxY * 0.008;

      // Magnetic effect - nhẹ nhàng hơn, chỉ khi hover trực tiếp
      const distanceToMouse = n.position.distanceTo(mouse3D);
      const magneticRadius = 1.5; // Giảm từ 2.5 xuống 1.5
      const magneticStrength = 0.08; // Giảm từ 0.3 xuống 0.08
      
      if (distanceToMouse < magneticRadius && distanceToMouse > 0.1) {
        const direction = new THREE.Vector3()
          .subVectors(mouse3D, n.position)
          .normalize();
        const force = (1 - distanceToMouse / magneticRadius) * magneticStrength;
        // Áp dụng force trực tiếp vào position thay vì velocity để mượt hơn
        n.position.add(direction.multiplyScalar(force * 0.02));
      }

      // Boundary check với bounce nhẹ hơn
      ["x", "y", "z"].forEach((axis) => {
        if (Math.abs((n.position as any)[axis]) > 6) {
          (n.velocity as any)[axis] *= -0.8; // Giảm bounce từ -1 xuống -0.8
        }
      });
    });

    // Update node groups với scale effect khi hover
    nodesRef.current.forEach((group, i) => {
      if (group) {
        group.position.copy(nodes[i].position);
        
        // Scale effect khi hover hoặc click
        const isHovered = hoveredIndex === i;
        const isClicked = clickedNodeRef.current === i;
        const targetScale = isClicked ? 2.0 : isHovered ? 1.5 : 1;
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
      }
    });

    // Update line geometries
    lineGeometriesRef.current.forEach((geometry, i) => {
      const [a, b] = connections[i];
      const positions = geometry.attributes.position.array as Float32Array;

      positions[0] = nodes[a].position.x;
      positions[1] = nodes[a].position.y;
      positions[2] = nodes[a].position.z;

      positions[3] = nodes[b].position.x;
      positions[4] = nodes[b].position.y;
      positions[5] = nodes[b].position.z;

      geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group>
      {/* Tech Icon Nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredIndex === i;
        const isClicked = clickedNodeRef.current === i;
        const isActive = isHovered || isClicked;
        
        return (
          <group
            key={`node-${i}`}
            ref={(el) => {
              if (el) nodesRef.current[i] = el;
            }}
            onPointerEnter={(e) => {
              e.stopPropagation();
              setHoveredIndex(i);
              hoveredNodeRef.current = i;
              document.body.style.cursor = "pointer";
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              setHoveredIndex(null);
              hoveredNodeRef.current = null;
              document.body.style.cursor = "default";
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (clickedNodeRef.current === i) {
                clickedNodeRef.current = null;
              } else {
                clickedNodeRef.current = i;
                // Reset sau 1.5 giây
                setTimeout(() => {
                  clickedNodeRef.current = null;
                }, 1500);
              }
            }}
          >
            {/* Background glow sphere */}
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={node.tech.color}
                emissive={node.tech.color}
                emissiveIntensity={isActive ? 1.5 : 0.5}
                transparent
                opacity={isActive ? 0.6 : 0.3}
              />
            </mesh>

            {/* Tech Icon Emoji */}
            <Text
              fontSize={0.25}
              color={isActive ? "#ffffff" : "#e0f7fa"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor={node.tech.color}
            >
              {node.tech.emoji}
            </Text>

            {/* Label hiển thị khi hover */}
            {isActive && (
              <Text
                position={[0, -0.35, 0]}
                fontSize={0.12}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.005}
                outlineColor={node.tech.color}
              >
                {node.tech.label}
              </Text>
            )}

            {/* Outer ring khi hover */}
            {isActive && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.2, 0.25, 32]} />
                <meshBasicMaterial
                  color={node.tech.color}
                  transparent
                  opacity={0.5}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Tech Connections */}
      {connections.map(([a, b], i) => {
        const geometry = lineGeometriesRef.current[i];
        const isConnectedToHovered = hoveredIndex === a || hoveredIndex === b;
        const isConnectedToClicked = clickedNodeRef.current === a || clickedNodeRef.current === b;
        const isHighlighted = isConnectedToHovered || isConnectedToClicked;
        
        // Blend colors from both connected nodes
        const colorA = nodes[a].tech.color;
        const colorB = nodes[b].tech.color;
        
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore - React Three Fiber line component type issue
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial
              color={isHighlighted ? "#00e5ff" : colorA}
              transparent
              opacity={isHighlighted ? 0.5 : 0.15}
              linewidth={isHighlighted ? 2 : 1}
            />
          </line>
        );
      })}
    </group>
  );
}
