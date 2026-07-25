import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { MathUtils, type Mesh } from 'three';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { useTabVisible } from '@/hooks/useTabVisible';
import { cn } from '@/utils/cn';

/** A gentle glass orb that tilts toward the mouse and slowly rotates. */
function Orb() {
  const mesh = useRef<Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += delta * 0.25;
    m.rotation.x = MathUtils.lerp(m.rotation.x, pointer.current.y * 0.5, 0.06);
    m.position.x = MathUtils.lerp(m.position.x, pointer.current.x * 0.35, 0.06);
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#d9a648"
          emissive="#5c3a10"
          emissiveIntensity={0.4}
          roughness={0.12}
          metalness={0.7}
          distort={0.3}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

export function HeaderOrb({ className }: { className?: string }) {
  const visible = useTabVisible();

  return (
    <div className={cn('h-24 w-24', className)}>
      <CanvasErrorBoundary>
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.25]}
            frameloop={visible ? 'always' : 'never'}
            camera={{ position: [0, 0, 3.6], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 3, 3]} intensity={2.4} color="#f0c778" />
            <pointLight position={[-3, -2, 2]} intensity={1.6} color="#3fb89e" />
            <Orb />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}
