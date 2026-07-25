import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import type { CabinCategory } from '@/types/database.types';
import { CABIN_PALETTES } from './palette';

/**
 * A refined, softly-lit cabin built from primitive geometry — no external
 * model files. Rounded body, a true gable roof (extruded triangle), stone
 * plinth and warm glowing windows. Materials vary by cabin category.
 */
export function CabinModel({ category = 'luxury' }: { category?: CabinCategory }) {
  const p = useMemo(() => CABIN_PALETTES[category], [category]);

  // Gable roof: extrude a triangle along Z, then centre it.
  const roofGeo = useMemo(() => {
    const halfW = 1.4;
    const rise = 0.92;
    const depth = 2.02;
    const shape = new THREE.Shape();
    shape.moveTo(-halfW, 0);
    shape.lineTo(halfW, 0);
    shape.lineTo(0, rise);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    geo.translate(0, 0, -depth / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => () => roofGeo.dispose(), [roofGeo]);

  return (
    <group>
      {/* Stone plinth */}
      <RoundedBox args={[2.36, 0.24, 1.86]} radius={0.05} smoothness={3} position={[0, 0.12, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.wallDark} roughness={0.95} metalness={0.02} />
      </RoundedBox>

      {/* Body */}
      <RoundedBox args={[2.2, 1.32, 1.7]} radius={0.05} smoothness={4} position={[0, 0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.wall} roughness={0.62} metalness={0.08} />
      </RoundedBox>

      {/* Corner trims for a crafted look */}
      {[-1.06, 1.06].map((x) => (
        <mesh key={x} position={[x, 0.9, 0]}>
          <boxGeometry args={[0.06, 1.34, 1.72]} />
          <meshStandardMaterial color={p.wallDark} roughness={0.8} />
        </mesh>
      ))}

      {/* Gable roof */}
      <mesh geometry={roofGeo} position={[0, 1.56, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.roof} roughness={0.5} metalness={0.18} />
      </mesh>

      {/* Ridge cap */}
      <mesh position={[0, 2.46, 0]} castShadow>
        <boxGeometry args={[0.1, 0.08, 2.04]} />
        <meshStandardMaterial color={p.wallDark} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Chimney */}
      <RoundedBox args={[0.28, 0.82, 0.28]} radius={0.03} smoothness={2} position={[0.66, 1.98, 0.18]} castShadow>
        <meshStandardMaterial color={p.wallDark} roughness={0.9} />
      </RoundedBox>

      {/* Door + brass handle */}
      <RoundedBox args={[0.52, 0.94, 0.08]} radius={0.04} smoothness={3} position={[0, 0.71, 0.85]}>
        <meshStandardMaterial color={p.accent} roughness={0.35} metalness={0.55} />
      </RoundedBox>
      <mesh position={[0.16, 0.71, 0.9]}>
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshStandardMaterial color="#f7e7bf" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Front windows — warm emissive glow with dark frames */}
      {[-0.64, 0.64].map((x) => (
        <group key={x} position={[x, 1.06, 0.855]}>
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[0.5, 0.56, 0.06]} />
            <meshStandardMaterial color={p.wallDark} roughness={0.8} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.42, 0.48, 0.05]} />
            <meshStandardMaterial
              color={p.windowGlow}
              emissive={p.windowGlow}
              emissiveIntensity={1.15}
              roughness={0.15}
              metalness={0.1}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Side window */}
      <group position={[1.075, 1.02, 0]}>
        <mesh position={[-0.02, 0, 0]}>
          <boxGeometry args={[0.06, 0.44, 0.62]} />
          <meshStandardMaterial color={p.wallDark} roughness={0.8} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.05, 0.36, 0.54]} />
          <meshStandardMaterial
            color={p.windowGlow}
            emissive={p.windowGlow}
            emissiveIntensity={0.9}
            roughness={0.15}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Warm interior light spilling out the front */}
      <pointLight position={[0, 1.0, 1.5]} intensity={3.2} distance={5.5} decay={2} color={p.windowGlow} />

      {/* Front step */}
      <RoundedBox args={[0.8, 0.14, 0.4]} radius={0.03} smoothness={2} position={[0, 0.29, 1.02]} receiveShadow>
        <meshStandardMaterial color={p.wallDark} roughness={0.95} />
      </RoundedBox>
    </group>
  );
}

/** A softer low-poly pine tree — smoother cones, subtle colour steps. */
export function Tree({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.08, 0.11, 0.52, 8]} />
        <meshStandardMaterial color="#4a3a29" roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 0.85, 0]}>
        <coneGeometry args={[0.52, 0.95, 9]} />
        <meshStandardMaterial color="#2c5145" roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 1.32, 0]}>
        <coneGeometry args={[0.38, 0.72, 9]} />
        <meshStandardMaterial color="#336054" roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 1.68, 0]}>
        <coneGeometry args={[0.25, 0.52, 9]} />
        <meshStandardMaterial color="#3a6d5f" roughness={0.85} />
      </mesh>
    </group>
  );
}
