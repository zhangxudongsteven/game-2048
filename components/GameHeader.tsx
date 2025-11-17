'use client';

interface GameHeaderProps {
  score: number;
  onReset: () => void;
}

export function GameHeader({ score, onReset }: GameHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
        2048
      </h1>
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="bg-gray-200 dark:bg-gray-700 px-3 sm:px-4 py-2 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">得分</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            {score}
          </p>
        </div>
        <button
          onClick={onReset}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
        >
          重新开始
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm">
        合并相同数字的方块，达到 2048 即可获胜！
      </p>
    </div>
  );
}