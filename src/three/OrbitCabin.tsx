import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, OrbitControls } from '@react-three/drei';
import { CabinModel, Tree } from './CabinModel';
import { CanvasFallback } from './CanvasFallback';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { CABIN_PALETTES } from './palette';
import { useTabVisible } from '@/hooks/useTabVisible';
import type { CabinCategory } from '@/types/database.types';

function Scene({ category }: { category: CabinCategory }) {
  const p = CABIN_PALETTES[category];
  return (
    <>
      <hemisphereLight args={['#cdd8ea', '#0e1620', 0.6]} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.6}
        color="#fbe6bf"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#5fa4d6" />

      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.35}>
        <group position={[0, 0, 0]}>
          <CabinModel category={category} />
          <Tree position={[-2.1, 0, -0.7]} scale={1.05} />
          <Tree position={[2.15, 0, -0.5]} scale={0.85} />
          <Tree position={[1.6, 0, 1.25]} scale={0.7} />
        </group>
      </Float>

      {/* Ground disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[6, 48]} />
        <meshStandardMaterial color={p.ground} roughness={1} />
      </mesh>

      <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={12} blur={2.6} far={5} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={11}
        minPolarAngle={0.4}
        maxPolarAngle={Math.PI / 2.15}
        autoRotate
        autoRotateSpeed={0.9}
        target={[0, 1, 0]}
      />
    </>
  );
}

export function OrbitCabin({ category }: { category: CabinCategory }) {
  const visible = useTabVisible();
  return (
    <CanvasErrorBoundary fallbackLabel="Cabin preview">
      <Suspense fallback={<CanvasFallback label="Loading cabin…" />}>
        <Canvas
          shadows
          dpr={[1, 1.75]}
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [5, 3.2, 5.6], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Scene category={category} />
        </Canvas>
      </Suspense>
    </CanvasErrorBoundary>
  );
}
