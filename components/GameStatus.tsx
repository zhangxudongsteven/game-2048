'use client';

interface GameStatusProps {
  gameOver: boolean;
  won: boolean;
  onReset: () => void;
}

export function GameStatus({ gameOver, won, onReset }: GameStatusProps) {
  if (!gameOver && !won) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl text-center">
        <h2 className="text-3xl font-bold mb-4">
          {won ? (
            <span className="text-green-600 dark:text-green-400">恭喜获胜！🎉</span>
          ) : (
            <span className="text-red-600 dark:text-red-400">游戏结束</span>
          )}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {won ? '你成功达到了 2048！' : '没有可移动的方块了。'}
        </p>
        <button
          onClick={onReset}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          再玩一次
        </button>
      </div>
    </div>
  );
}