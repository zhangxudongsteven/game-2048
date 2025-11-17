'use client';

import { useGame2048 } from '@/hooks/useGame2048';
import { useTouchControls } from '@/hooks/useTouchControls';
import { GameGrid } from '@/components/GameGrid';
import { KeyboardControls } from '@/components/KeyboardControls';
import { GameHeader } from '@/components/GameHeader';
import { GameStatus } from '@/components/GameStatus';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Home() {
  const { grid, score, gameOver, won, move, reset } = useGame2048();

  // 添加触摸操作支持
  useTouchControls({ onSwipe: move });

  // 检查是否还在加载中（所有格子都是 null）
  const isLoading = grid.every(row => row.every(cell => cell === null));

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 font-sans p-4">
        <main className="flex flex-col items-center justify-center min-h-screen w-full max-w-md py-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-8">
            2048
          </h1>
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            游戏正在加载中...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 font-sans p-4 select-none">
      <main className="flex flex-col items-center justify-center min-h-screen w-full max-w-md py-4">
        <GameHeader score={score} onReset={reset} />

        <div
          id="game-container"
          className="mb-6 touch-none"
        >
          <GameGrid grid={grid} />
        </div>

        <div className="mb-6">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-3">
            滑动或点击方向键控制
          </p>
          <KeyboardControls onMove={move} />
        </div>

        <GameStatus gameOver={gameOver} won={won} onReset={reset} />
      </main>
    </div>
  );
}
