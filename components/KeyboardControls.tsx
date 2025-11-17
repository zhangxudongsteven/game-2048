'use client';

import { useEffect } from 'react';
import { Direction } from '@/utils/game2048';

interface KeyboardControlsProps {
  onMove: (direction: Direction) => void;
}

export function KeyboardControls({ onMove }: KeyboardControlsProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onMove('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          onMove('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onMove('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          onMove('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onMove]);

  return (
    <div className="mt-4 sm:mt-6 text-center">
      <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-[180px] sm:max-w-xs mx-auto">
        <div></div>
        <button
          onClick={() => onMove('up')}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 sm:py-3 px-3 sm:px-4 rounded active:scale-95 transition-transform"
        >
          ↑
        </button>
        <div></div>
        <button
          onClick={() => onMove('left')}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 sm:py-3 px-3 sm:px-4 rounded active:scale-95 transition-transform"
        >
          ←
        </button>
        <button
          onClick={() => onMove('down')}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 sm:py-3 px-3 sm:px-4 rounded active:scale-95 transition-transform"
        >
          ↓
        </button>
        <button
          onClick={() => onMove('right')}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 sm:py-3 px-3 sm:px-4 rounded active:scale-95 transition-transform"
        >
          →
        </button>
      </div>
    </div>
  );
}