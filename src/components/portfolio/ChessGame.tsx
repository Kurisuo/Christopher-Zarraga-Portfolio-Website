import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Chess } from "chess.js";

const MOVES =
  "d4 e6 c4 h5 Nf3 Be7 e4 d6 Nc3 a6 Be3 Nf6 Qc2 c6 O-O-O Nfd7 Be2 a5 a3 Na6 Kb1 d5 exd5 exd5 c5 b6 cxb6 Nxb6 h4 Rb8 Bf4 Rb7 Bxa6 Ra7 Bd3 Nc4 Bxc4 dxc4 Rhe1 Be6 Ne4 Bxa3 bxa3 O-O Nc5 Qb6+ Ka1 a4 Rb1".split(
    " ",
  );

type PieceType = "p" | "n" | "b" | "r" | "q" | "k";

/** Lathe profiles (radius, height) for each piece type. */
const PROFILES: Record<PieceType, Array<[number, number]>> = {
  p: [
    [0, 0],
    [0.3, 0],
    [0.3, 0.05],
    [0.22, 0.12],
    [0.12, 0.2],
    [0.1, 0.34],
    [0.16, 0.4],
    [0.15, 0.44],
    [0.18, 0.5],
    [0.15, 0.58],
    [0.08, 0.64],
    [0, 0.66],
  ],
  r: [
    [0, 0],
    [0.32, 0],
    [0.32, 0.06],
    [0.24, 0.14],
    [0.2, 0.5],
    [0.26, 0.6],
    [0.3, 0.62],
    [0.3, 0.76],
    [0.22, 0.76],
    [0, 0.76],
  ],
  n: [
    [0, 0],
    [0.32, 0],
    [0.32, 0.06],
    [0.24, 0.14],
    [0.18, 0.5],
    [0.22, 0.66],
    [0.14, 0.8],
    [0.1, 0.86],
    [0, 0.88],
  ],
  b: [
    [0, 0],
    [0.32, 0],
    [0.32, 0.06],
    [0.24, 0.14],
    [0.14, 0.5],
    [0.2, 0.6],
    [0.14, 0.66],
    [0.18, 0.78],
    [0.12, 0.9],
    [0.06, 0.96],
    [0, 0.98],
  ],
  q: [
    [0, 0],
    [0.36, 0],
    [0.36, 0.06],
    [0.26, 0.16],
    [0.16, 0.56],
    [0.22, 0.68],
    [0.14, 0.76],
    [0.24, 0.92],
    [0.14, 1.02],
    [0.08, 1.08],
    [0, 1.1],
  ],
  k: [
    [0, 0],
    [0.36, 0],
    [0.36, 0.06],
    [0.26, 0.16],
    [0.16, 0.6],
    [0.24, 0.72],
    [0.15, 0.82],
    [0.15, 1.02],
    [0.08, 1.06],
    [0, 1.08],
  ],
};

function usePieceGeometries() {
  return useMemo(() => {
    const out = {} as Record<PieceType, THREE.LatheGeometry>;
    (Object.keys(PROFILES) as PieceType[]).forEach((t) => {
      const geo = new THREE.LatheGeometry(
        PROFILES[t].map(([x, y]) => new THREE.Vector2(x, y)),
        28,
      );
      geo.computeVertexNormals();
      out[t] = geo;
    });
    return out;
  }, []);
}

type Placed = {
  key: string;
  type: PieceType;
  color: "w" | "b";
  x: number;
  z: number;
};

function Board({ placed }: { placed: Placed[] }) {
  const geos = usePieceGeometries();
  const group = useRef<THREE.Group>(null);
  const controls = useRef<any>(null);

  useFrame((_, delta) => {
    if (group.current && !controls.current?.dragging) {
      group.current.rotation.y += Math.min(delta, 0.05) * 0.18;
    }
  });

  const squares = useMemo(() => {
    const list: Array<{ key: string; x: number; z: number; dark: boolean }> = [];
    for (let f = 0; f < 8; f++) {
      for (let r = 0; r < 8; r++) {
        list.push({
          key: `${f}-${r}`,
          x: f - 3.5,
          z: r - 3.5,
          dark: (f + r) % 2 === 0,
        });
      }
    }
    return list;
  }, []);

  return (
    <>
      <group ref={group}>
        {squares.map((s) => (
          <mesh key={s.key} position={[s.x, -0.05, s.z]} receiveShadow>
            <boxGeometry args={[1, 0.1, 1]} />
            <meshStandardMaterial
              color={s.dark ? "#2a2118" : "#e8e0d2"}
              roughness={0.6}
            />
          </mesh>
        ))}
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[8.7, 0.22, 8.7]} />
          <meshStandardMaterial color="#181410" roughness={0.5} />
        </mesh>
        {placed.map((p) => (
          <mesh key={p.key} geometry={geos[p.type]} position={[p.x, 0, p.z]} castShadow>
            <meshStandardMaterial
              color={p.color === "w" ? "#f2ede2" : "#191919"}
              roughness={0.3}
              metalness={0.25}
            />
          </mesh>
        ))}
      </group>
      <OrbitControls
        ref={controls}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2.15}
      />
    </>
  );
}

export function ChessGame() {
  const [mounted, setMounted] = useState(false);
  const [ply, setPly] = useState(0);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const id = window.setInterval(() => {
      setPly((p) => (p >= MOVES.length ? 0 : p + 1));
    }, 1400);
    return () => window.clearInterval(id);
  }, [mounted]);

  const placed = useMemo<Placed[]>(() => {
    const game = new Chess();
    for (let i = 0; i < ply; i++) {
      try {
        game.move(MOVES[i]);
      } catch {
        break;
      }
    }
    const out: Placed[] = [];
    game.board().forEach((row, rIdx) => {
      row.forEach((sq, fIdx) => {
        if (!sq) return;
        out.push({
          key: sq.square,
          type: sq.type as PieceType,
          color: sq.color,
          x: fIdx - 3.5,
          z: rIdx - 3.5,
        });
      });
    });
    return out;
  }, [ply]);

  if (!mounted) return <div className="h-40 w-full sm:h-48" aria-hidden />;

  return (
    <div
      className="h-40 w-full cursor-grab touch-none active:cursor-grabbing sm:h-48"
      aria-label="3D chess board replaying Kurisuo vs StanleyPons, Chess.com 2024 — drag to rotate"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 7.5, 8.5], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 8, 5]} intensity={1.5} />
        <pointLight position={[-4, 3, -3]} intensity={8} color="#a855f7" />
        <Board placed={placed} />
      </Canvas>
    </div>
  );
}
