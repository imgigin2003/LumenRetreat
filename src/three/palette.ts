import type { CabinCategory } from '@/types/database.types';

export interface CabinPalette {
  wall: string;
  wallDark: string; // plinth / trim
  roof: string;
  accent: string; // door / brass
  windowGlow: string; // emissive window color
  ground: string;
}

/** Refined material palettes per cabin tier — shared by the login hero & detail 3D. */
export const CABIN_PALETTES: Record<CabinCategory, CabinPalette> = {
  standard: {
    wall: '#8f9aa8',
    wallDark: '#3a4350',
    roof: '#2f3742',
    accent: '#b9c6d6',
    windowGlow: '#dcecff',
    ground: '#222a33',
  },
  deluxe: {
    wall: '#4f8f80',
    wallDark: '#2c4a43',
    roof: '#293a37',
    accent: '#8fe0cc',
    windowGlow: '#c9f6ea',
    ground: '#1d332e',
  },
  luxury: {
    wall: '#9a774a', // warm timber
    wallDark: '#5e4a30',
    roof: '#343a42', // cool slate roof for contrast
    accent: '#e6c079', // brass door / trim
    windowGlow: '#ffdda0',
    ground: '#26221c',
  },
};
