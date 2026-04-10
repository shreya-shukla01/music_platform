import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { Song } from "@/data/songs";
import { useGalaxyStore } from "@/store/galaxyStore";

interface PlanetProps {
  song: Song;
  position: [number, number, number];
  onClick: (song: Song) => void;
  isActive: boolean;
  isFiltered: boolean;
}

function Planet({ song, position, onClick, isActive, isFiltered }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.002;
    const t = state.clock.getElapsedTime();
    if (isActive) {
      meshRef.current.scale.setScalar(song.size * (1 + Math.sin(t * 4) * 0.05));
    } else if (hovered) {
      meshRef.current.scale.setScalar(song.size * 1.2);
    } else {
      meshRef.current.scale.setScalar(song.size * (isFiltered ? 0.3 : 1));
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(isActive ? song.size * 1.8 + Math.sin(t * 3) * 0.1 : song.size * 1.4);
    }
  });

  const color = new THREE.Color(song.color);
  const opacity = isFiltered ? 0.15 : 1;

  return (
    <group position={position} onClick={() => onClick(song)}>
      <mesh ref={glowRef} scale={song.size * 1.4}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isActive ? 0.25 : 0.1} depthWrite={false} />
      </mesh>
      <mesh
        ref={meshRef}
        scale={song.size}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = "none"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "none"; }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : hovered ? 0.4 : 0.15}
          transparent
          opacity={opacity}
        />
      </mesh>
      {(hovered || isActive) && (
        <Text
          position={[0, song.size * 1.5 + 0.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000"
        >
          {song.title}
        </Text>
      )}
      {isActive && (
        <pointLight color={song.color} intensity={3} distance={8} />
      )}
    </group>
  );
}

function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.z -= 0.005;
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.01;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 + 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={ringRef} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[3.5, 0.4, 16, 64]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff4422" emissiveIntensity={1} roughness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#000022" transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <pointLight color="#ff6b35" intensity={5} distance={20} />
    </group>
  );
}

function GalaxyParticles() {
  const count = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 30;
      arr[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#aaaaff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Extra scattered star clusters for depth
function StarClusters() {
  const count = 600;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#c084fc"),
      new THREE.Color("#818cf8"),
      new THREE.Color("#67e8f9"),
      new THREE.Color("#f9a8d4"),
      new THREE.Color("#fde68a"),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface GalaxySceneProps {
  songs: Song[];
  onSongClick: (song: Song) => void;
  currentSong: Song | null;
  filteredIds: Set<string>;
}

function GalaxyScene({ songs, onSongClick, currentSong, filteredIds }: GalaxySceneProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 15, 35);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const positions = useMemo((): [number, number, number][] => {
    return songs.map((song, i) => {
      const arm = i % 4;
      const armAngle = (arm / 4) * Math.PI * 2;
      const t = (i / songs.length) * Math.PI * 6;
      const radius = 6 + (i / songs.length) * 22;
      const spread = (Math.random() - 0.5) * 4;
      return [
        Math.cos(armAngle + t) * radius + spread,
        (Math.random() - 0.5) * 5,
        Math.sin(armAngle + t) * radius + spread,
      ];
    });
  }, [songs]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 20, 0]} intensity={2} color="#ffffff" />

      {/* Deep star field — many more stars than before, colored */}
      <Stars radius={200} depth={120} count={10000} factor={5} saturation={0.9} fade speed={0.5} />

      {/* Original galaxy dust particles */}
      <GalaxyParticles />

      {/* Extra colored star clusters around the galaxy */}
      <StarClusters />

      <BlackHole />

      {songs.map((song, i) => (
        <Planet
          key={song.id}
          song={song}
          position={positions[i]}
          onClick={onSongClick}
          isActive={currentSong?.id === song.id}
          isFiltered={filteredIds.size > 0 && !filteredIds.has(song.id)}
        />
      ))}
    </>
  );
}

interface Galaxy3DProps {
  songs: Song[];
  filteredIds: Set<string>;
}

export default function Galaxy3D({ songs, filteredIds }: Galaxy3DProps) {
  const { playSong, currentSong } = useGalaxyStore();
  const [webglError, setWebglError] = useState(false);

  return (
    <div className="w-full h-full relative">
      {webglError ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="text-6xl">🌌</div>
            <p className="text-purple-300 text-lg font-semibold">3D Galaxy Preview</p>
            <p className="text-gray-500 text-sm max-w-xs">
              Your browser doesn&apos;t support WebGL. Use the search and lists on the left to discover and play music!
            </p>
          </div>
        </div>
      ) : (
        <Canvas
          camera={{ position: [0, 15, 35], fov: 60 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            if (!gl) setWebglError(true);
          }}
        >
          <GalaxyScene
            songs={songs}
            onSongClick={playSong}
            currentSong={currentSong}
            filteredIds={filteredIds}
          />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            maxDistance={80}
            minDistance={8}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      )}
    </div>
  );
}
