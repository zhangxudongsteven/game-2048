'use client';

import { Grid } from '@/utils/game2048';

interface GameGridProps {
  grid: Grid;
}

const CELL_COLORS: { [key: number]: string } = {
  2: 'bg-gray-200 text-gray-800',
  4: 'bg-gray-300 text-gray-800',
  8: 'bg-orange-300 text-white',
  16: 'bg-orange-400 text-white',
  32: 'bg-orange-500 text-white',
  64: 'bg-orange-600 text-white',
  128: 'bg-yellow-300 text-white text-sm',
  256: 'bg-yellow-400 text-white text-sm',
  512: 'bg-yellow-500 text-white text-sm',
  1024: 'bg-red-400 text-white text-xs',
  2048: 'bg-red-500 text-white text-xs',
};

const TEXT_SIZES: { [key: number]: string } = {
  2: 'text-4xl',
  4: 'text-4xl',
  8: 'text-4xl',
  16: 'text-4xl',
  32: 'text-4xl',
  64: 'text-4xl',
  128: 'text-3xl',
  256: 'text-3xl',
  512: 'text-3xl',
  1024: 'text-2xl',
  2048: 'text-2xl',
};

export function GameGrid({ grid }: GameGridProps) {
  return (
    <div className="bg-gray-700 p-3 rounded-lg shadow-2xl">
      <div className="grid grid-cols-4 gap-2">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-md font-bold transition-all duration-200 transform
                ${cell !== null
                  ? `${CELL_COLORS[cell] || 'bg-gray-900 text-white'} ${TEXT_SIZES[cell] || 'text-xl sm:text-2xl'} scale-100`
                  : 'bg-gray-600'
                }
              `}
            >
              {cell || ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
}