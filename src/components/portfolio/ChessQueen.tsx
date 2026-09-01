import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function QueenMesh() {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    // Queen profile (radius, height) revolved around the Y axis
    const profile: Array<[number, number]> = [
      [0.0, 0.0],
      [0.62, 0.0],
      [0.62, 0.08],
      [0.55, 0.16],
      [0.42, 0.22],
      [0.5, 0.3],
      [0.46, 0.38],
      [0.3, 0.46],
      [0.24, 0.6],
      [0.2, 0.9],
      [0.17, 1.2],
      [0.15, 1.45],
      [0.24, 1.5], // collar
      [0.26, 1.56],
      [0.16, 1.62],
      [0.13, 1.78],
      [0.16, 1.9],
      [0.3, 1.98], // crown flare
      [0.34, 2.06],
      [0.28, 2.14],
      [0.14, 2.2],
      [0.1, 2.28],
      [0.0, 2.34],
    ];
    const points = profile.map(([x, y]) => new THREE.Vector2(x, y));
    const geo = new THREE.LatheGeometry(points, 48);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Gentle idle spin only while the user isn't dragging
  const controlsRef = useRef<any>(null);
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (group.current && !controlsRef.current?.dragging) {
      group.current.rotation.y += dt * 0.4;
    }
    if (group.current) {
      group.current.position.y =
        -1.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  return (
    <>
      <group ref={group} position={[0, -1.15, 0]}>
        <mesh geometry={geometry} castShadow>
          <meshStandardMaterial
            color="#161616"
            roughness={0.25}
            metalness={0.35}
          />
        </mesh>
        {/* Crown ball */}
        <mesh position={[0, 2.38, 0]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial
            color="#161616"
            roughness={0.25}
            metalness={0.35}
          />
        </mesh>
      </group>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.9}
      />
    </>
  );
}

export function ChessQueen() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-28 w-full sm:h-32" aria-hidden />;
  }

  return (
    <div
      className="h-28 w-full cursor-grab touch-none active:cursor-grabbing sm:h-32"
      aria-label="Interactive 3D render of a queen chess piece — drag to spin"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 4.4], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} />
        {/* Purple rim light to echo the site's glow accent */}
        <pointLight position={[-3, 2, -2]} intensity={6} color="#a855f7" />
        <pointLight position={[2, -1, 3]} intensity={2} color="#ffffff" />
        <QueenMesh />
      </Canvas>
    </div>
  );
}
