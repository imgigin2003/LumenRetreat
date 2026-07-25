import { useEffect, useState } from 'react';

/**
 * Tracks document visibility. Used to pause the R3F render loop when the tab
 * is hidden (set Canvas `frameloop` to 'never') to save the GPU/battery.
 */
export function useTabVisible(): boolean {
  const [visible, setVisible] = useState(
    typeof document === 'undefined' ? true : !document.hidden,
  );

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return visible;
}
