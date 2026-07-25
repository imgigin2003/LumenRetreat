import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Lightformer, SoftShadows } from '@react-three/drei';
import type { Group } from 'three';
import { CabinModel, Tree } from './CabinModel';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { useTabVisible } from '@/hooks/useTabVisible';

function RetreatScene() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.16;
  });

  return (
    <>
      {/* Soft shadow edges for a premium look */}
      <SoftShadows samples={10} size={22} focus={0.85} />

      {/* Cinematic lighting: cool moon key + teal rim + warm fill */}
      <ambientLight intensity={0.28} color="#4a5a78" />
      <directionalLight
        castShadow
        position={[-6, 7.5, 4]}
        intensity={1.9}
        color="#aebfe0"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-7, 7, 7, -7, 0.1, 32]} />
      </directionalLight>
      <directionalLight position={[5, 3, -5]} intensity={0.5} color="#3fb89e" />
      <pointLight position={[2, 1.4, 3]} intensity={0.5} color="#e6b877" distance={12} />

      {/* Procedural reflections (no external HDR) — renders once */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.1} position={[-4, 4, 3]} scale={[7, 7, 1]} color="#9fb4dc" />
        <Lightformer intensity={0.6} position={[5, 2, -3]} scale={[5, 5, 1]} color="#3fb89e" />
        <Lightformer form="ring" intensity={0.9} position={[3.4, 4, -4]} scale={2.2} color="#ffd9a0" />
      </Environment>

      {/* Glowing moon */}
      <mesh position={[3.6, 3.9, -6]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial color="#f4edd9" emissive="#f4edd9" emissiveIntensity={0.85} toneMapped={false} />
      </mesh>

      <Stars radius={50} depth={25} count={500} factor={2.6} saturation={0} fade speed={0.5} />

      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
        <group ref={group} position={[0, -0.15, 0]}>
          <CabinModel category="luxury" />
          <Tree position={[-2.5, 0, -0.7]} scale={1.2} />
          <Tree position={[2.3, 0, -1.0]} scale={1.0} />
          <Tree position={[1.9, 0, 1.3]} scale={0.72} />
          <Tree position={[-2.0, 0, 1.4]} scale={0.86} />

          {/* Ground disc */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <circleGeometry args={[9, 56]} />
            <meshStandardMaterial color="#1a2029" roughness={1} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export function CabinScene() {
  const visible = useTabVisible();
  const [ready, setReady] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#1e2836] via-[#161d29] to-[#10151d]">
      {/* Ambient aurora glow — visible instantly, before the canvas mounts */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(58%_50%_at_30%_24%,rgba(230,192,120,0.14),transparent_60%),radial-gradient(50%_45%_at_82%_18%,rgba(63,184,158,0.11),transparent_55%)]" />

      <CanvasErrorBoundary fallbackLabel="Lumen Retreat">
        <Suspense fallback={null}>
          <Canvas
            shadows
            dpr={[1, 1.75]}
            frameloop={visible ? 'always' : 'never'}
            camera={{ position: [0, 1.6, 7.6], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onCreated={() => setReady(true)}
            style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.1s ease' }}
          >
            <fog attach="fog" args={['#141a24', 10, 24]} />
            <RetreatScene />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}
