"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, RoundedBox } from "@react-three/drei";
import { IconType } from "react-icons";
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiDotnet,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiRedux,
  SiCloudinary,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiJavascript,
  SiGraphql
} from "react-icons/si";
import { FaMicrosoft, FaAws, FaFigma } from "react-icons/fa";
import { TbBrandReact } from "react-icons/tb";

type TechIcon = {
  icon: IconType;
  label: string;
  color: string;
};

type Node = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
  tech: TechIcon;
};

// Danh sách các biểu tượng công nghệ IT - sử dụng icons từ SkillsSection
const techIcons: TechIcon[] = [
  { icon: SiReact, label: "React", color: "#61dafb" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#06b6d4" },
  { icon: SiDotnet, label: ".NET", color: "#512bd4" },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#4169e1" },
  { icon: SiMongodb, label: "MongoDB", color: "#47a248" },
  { icon: SiDocker, label: "Docker", color: "#2496ed" },
  { icon: SiGit, label: "Git", color: "#f05032" },
  { icon: SiRedux, label: "Redux", color: "#764abc" },
  { icon: SiPython, label: "Python", color: "#3776ab" },
  { icon: SiJavascript, label: "JavaScript", color: "#f7df1e" },
  { icon: SiGraphql, label: "GraphQL", color: "#e10098" },
  { icon: FaAws, label: "AWS", color: "#ff9900" },
  { icon: SiCloudinary, label: "Cloudinary", color: "#3448c5" },
  { icon: FaMicrosoft, label: "Azure", color: "#0078d4" },
  { icon: FaFigma, label: "Figma", color: "#f24e1e" },
  { icon: TbBrandReact, label: "React Query", color: "#ff4154" },
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

    // Update node groups với scale effect và rotation
    nodesRef.current.forEach((group, i) => {
      if (group) {
        group.position.copy(nodes[i].position);
        
        // Scale effect khi hover hoặc click
        const isHovered = hoveredIndex === i;
        const isClicked = clickedNodeRef.current === i;
        const targetScale = isClicked ? 1.4 : isHovered ? 1.2 : 1;
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        
        // Subtle floating animation - cards face camera
        group.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1;
        group.rotation.x = Math.cos(state.clock.elapsedTime * 0.2 + i) * 0.05;
        
        // Rotate particles and ring when active
        if (isHovered || isClicked) {
          // Find and rotate the torus (ring)
          group.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
              child.rotation.z += 0.02;
            }
          });
        }
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
      {/* Tech Cards - 3D Glass Morphism Style */}
      {nodes.map((node, i) => {
        const isHovered = hoveredIndex === i;
        const isClicked = clickedNodeRef.current === i;
        const isActive = isHovered || isClicked;
        const Icon = node.tech.icon;
        
        return (
          <group
            key={`node-${i}`}
            ref={(el) => {
              if (el) nodesRef.current[i] = el;
            }}
          >
            {/* Background glow sphere khi hover */}
            {isActive && (
              <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial
                  color={node.tech.color}
                  transparent
                  opacity={0.15}
                />
              </mesh>
            )}

            {/* Main Card - RoundedBox with glass effect */}
            <RoundedBox
              args={[0.5, 0.5, 0.08]}
              radius={0.05}
              smoothness={4}
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
                  setTimeout(() => {
                    clickedNodeRef.current = null;
                  }, 1500);
                }
              }}
            >
              <meshPhysicalMaterial
                color={isActive ? node.tech.color : "#1a1a2e"}
                emissive={node.tech.color}
                emissiveIntensity={isActive ? 0.6 : 0.2}
                transparent
                opacity={isActive ? 0.9 : 0.7}
                metalness={0.2}
                roughness={0.3}
                clearcoat={1}
                clearcoatRoughness={0.2}
                transmission={0.1}
                thickness={0.5}
              />
            </RoundedBox>

            {/* Card border/outline */}
            <RoundedBox
              args={[0.52, 0.52, 0.09]}
              radius={0.05}
              smoothness={4}
            >
              <meshBasicMaterial
                color={node.tech.color}
                transparent
                opacity={isActive ? 0.6 : 0.2}
                wireframe
              />
            </RoundedBox>

            {/* Tech Icon - HTML Overlay */}
            <Html
              center
              distanceFactor={6}
              position={[0, 0, 0.05]}
              style={{
                pointerEvents: "none",
                userSelect: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Icon Container */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: isActive 
                      ? `${node.tech.color}20` 
                      : "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: isActive 
                      ? `2px solid ${node.tech.color}` 
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: isActive 
                      ? `0 0 20px ${node.tech.color}80, inset 0 0 10px ${node.tech.color}40` 
                      : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Icon
                    size={28}
                    style={{
                      color: isActive ? "#ffffff" : node.tech.color,
                      filter: `drop-shadow(0 0 ${isActive ? "8px" : "4px"} ${node.tech.color})`,
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>

                {/* Label always visible but styled */}
                <div
                  style={{
                    padding: "3px 10px",
                    backgroundColor: isActive 
                      ? `${node.tech.color}30` 
                      : "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(8px)",
                    border: isActive 
                      ? `1px solid ${node.tech.color}` 
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    fontSize: "10px",
                    fontWeight: "600",
                    color: isActive ? "#ffffff" : "#a0a0a0",
                    whiteSpace: "nowrap",
                    boxShadow: isActive 
                      ? `0 0 12px ${node.tech.color}60` 
                      : "0 2px 4px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {node.tech.label}
                </div>
              </div>
            </Html>

            {/* Particles effect khi hover */}
            {isActive && (
              <>
                {[...Array(8)].map((_, idx) => {
                  const angle = (idx / 8) * Math.PI * 2;
                  const radius = 0.4;
                  return (
                    <mesh
                      key={`particle-${i}-${idx}`}
                      position={[
                        Math.cos(angle) * radius,
                        Math.sin(angle) * radius,
                        0,
                      ]}
                    >
                      <sphereGeometry args={[0.02, 8, 8]} />
                      <meshBasicMaterial
                        color={node.tech.color}
                        transparent
                        opacity={0.6}
                      />
                    </mesh>
                  );
                })}
              </>
            )}

            {/* Rotating ring orbit khi hover */}
            {isActive && (
              <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[0.35, 0.01, 16, 32]} />
                <meshBasicMaterial
                  color={node.tech.color}
                  transparent
                  opacity={0.5}
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
