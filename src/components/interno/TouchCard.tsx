import React, { useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * A Card that distinguishes scroll from tap on mobile.
 * - Touch: only fires onCardClick if finger moved < 12px and < 300ms
 * - Mouse: fires normally via onClick
 */
interface TouchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onCardClick: () => void;
  children: React.ReactNode;
}

const TouchCard = React.forwardRef<HTMLDivElement, TouchCardProps>(
  ({ onCardClick, children, className, onClick, ...props }, ref) => {
    const touchRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const wasTouchRef = useRef(false);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
      wasTouchRef.current = true;
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
      if (!touchRef.current) return;
      const touch = e.changedTouches[0];
      const dx = Math.abs(touch.clientX - touchRef.current.x);
      const dy = Math.abs(touch.clientY - touchRef.current.y);
      const dt = Date.now() - touchRef.current.time;
      touchRef.current = null;
      if (dx < 12 && dy < 12 && dt < 300) {
        onCardClick();
      }
    }, [onCardClick]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      // Skip click events that originated from touch (ghost clicks)
      if (wasTouchRef.current) {
        wasTouchRef.current = false;
        return;
      }
      onCardClick();
    }, [onCardClick]);

    return (
      <Card
        ref={ref}
        className={cn("touch-pan-x touch-pan-y cursor-pointer", className)}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

TouchCard.displayName = "TouchCard";

export default TouchCard;
