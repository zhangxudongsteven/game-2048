'use client';

import { useEffect, useRef, useState } from 'react';
import { Direction } from '@/utils/game2048';

interface TouchPosition {
  x: number;
  y: number;
}

interface TouchControlsOptions {
  onSwipe: (direction: Direction) => void;
  threshold?: number;
}

export function useTouchControls({ onSwipe, threshold = 50 }: TouchControlsOptions) {
  const touchStartRef = useRef<TouchPosition | null>(null);
  const touchEndRef = useRef<TouchPosition | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) {
      return;
    }

    const diffX = touchStartRef.current.x - touchEndRef.current.x;
    const diffY = touchStartRef.current.y - touchEndRef.current.y;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          onSwipe('left');
        } else {
          onSwipe('right');
        }
      }
    } else {
      if (Math.abs(diffY) > threshold) {
        if (diffY > 0) {
          onSwipe('up');
        } else {
          onSwipe('down');
        }
      }
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  useEffect(() => {
    const element = document.getElementById('game-container');
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, threshold]);
}