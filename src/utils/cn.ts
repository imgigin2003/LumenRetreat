/**
 * Tiny classnames joiner. Filters out falsy values and joins with spaces.
 * (Deliberately dependency-free — no clsx/tailwind-merge needed here.)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
