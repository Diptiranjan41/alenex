"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface NetworkSphereProps {
  nodeCount?: number;
  radius?: number;
  maxDist?: number;
  color?: string;
  colorBright?: string;
  minSize?: number;
  autoRotateSpeed?: number;
  mouseInfluence?: number;
}

export default function NetworkSphere({
  nodeCount = 42,
  radius = 2.2,
  maxDist = 1.15,
  color = "#e63946",
  colorBright = "#ff3b4e",
  minSize = 400,
  autoRotateSpeed = 0.15,
  mouseInfluence = 0.15,
}: NetworkSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Parse colors
    const colorHex = parseInt(color.replace("#", ""), 16);
    const colorBrightHex = parseInt(colorBright.replace("#", ""), 16);

    // Get dimensions from parent container
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const size = Math.min(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    renderer.domElement.style.margin = "auto";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.borderRadius = "50%"; // Ensures perfect circular shape
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const points: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }

    // 🚀 FIX: CONNECTING LINES AS DASHED/TRANSPARENT DOTS (FOR PERFECT BLENDING)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < maxDist) {
          linePositions.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
        }
      }
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    // Changed from LineBasicMaterial to LineDashedMaterial for better blending
    const lineMaterial = new THREE.LineDashedMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.08, // Extremely low opacity so it blends fully
      dashSize: 0.05,
      gapSize: 0.02,
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    lineMesh.computeLineDistances(); // Required for dashed lines
    group.add(lineMesh);

    // Nodes
    const nodeGeometry = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: colorBrightHex });
    const nodeMeshes: THREE.Mesh[] = [];

    points.forEach((p) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(p);
      group.add(node);
      nodeMeshes.push(node);
    });

    // Glow texture
    function createGlowTexture() {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      
      // Parse colorBright for gradient
      const r = parseInt(colorBright.slice(1, 3), 16);
      const g = parseInt(colorBright.slice(3, 5), 16);
      const b = parseInt(colorBright.slice(5, 7), 16);
      
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.4, `rgba(${r},${g},${b},0.6)`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    }

    const glowTexture = createGlowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: colorBrightHex,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Hub nodes (every ~7th node)
    const hubIndices = Array.from(
      { length: Math.min(6, Math.floor(nodeCount / 7)) },
      (_, i) => i * Math.floor(nodeCount / 6)
    );
    
    hubIndices.forEach((idx) => {
      if (!points[idx]) return;
      const sprite = new THREE.Sprite(glowMaterial);
      sprite.position.copy(points[idx]);
      sprite.scale.set(0.7, 0.7, 0.7);
      group.add(sprite);
    });

    // Outer glow
    const outerGlowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: colorHex,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const outerGlow = new THREE.Sprite(outerGlowMaterial);
    outerGlow.scale.set(8, 8, 8);
    outerGlow.position.z = -1;
    scene.add(outerGlow);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * autoRotateSpeed + mouseX * mouseInfluence;
      group.rotation.x = Math.sin(elapsed * 0.1) * 0.15 + mouseY * 0.1;

      const pulse = 1 + Math.sin(elapsed * 2) * 0.08;
      nodeMeshes.forEach((n, i) => {
        const offset = i * 0.15;
        n.scale.setScalar(1 + Math.sin(elapsed * 2 + offset) * 0.15);
      });
      outerGlow.scale.set(8 * pulse, 8 * pulse, 8);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const newSize = Math.min(w, h);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(newSize, newSize);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      lineGeometry.dispose();
      lineMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      glowTexture.dispose();
      glowMaterial.dispose();
      outerGlowMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [nodeCount, radius, maxDist, color, colorBright, autoRotateSpeed, mouseInfluence]);

  return (
    <div
      ref={mountRef}
      className="flex items-center justify-center w-full h-full aspect-square rounded-full overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        minWidth: `${minSize}px`,
        minHeight: `${minSize}px`,
      }}
      aria-hidden="true"
    />
  );
}