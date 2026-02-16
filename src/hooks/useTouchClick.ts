import { useRef, useCallback, TouchEvent } from "react";

/**
 * Hook that distinguishes between scroll gestures and intentional taps on mobile.
 * Returns touch handlers that only fire `onClick` when the finger barely moved
 * and the touch was quick (< 300ms, < 12px movement).
 * 
 * This prevents cards from "stealing" scroll events on Android/iOS.
 */
export function useTouchClick(onClick: () => void) {
  const touchRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, []);

  const onTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchRef.current) return;
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchRef.current.x);
    const dy = Math.abs(touch.clientY - touchRef.current.y);
    const dt = Date.now() - touchRef.current.time;
    touchRef.current = null;
    if (dx < 12 && dy < 12 && dt < 300) {
      onClick();
    }
  }, [onClick]);

  return { onTouchStart, onTouchEnd };
}
