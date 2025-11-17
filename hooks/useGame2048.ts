'use client';

import { useState, useEffect, useCallback } from 'react';
import { Game2048, Grid, Direction } from '@/utils/game2048';

export interface GameState {
  grid: Grid;
  score: number;
  gameOver: boolean;
  won: boolean;
  move: (direction: Direction) => void;
  reset: () => void;
}

export function useGame2048(): GameState {
  const [game, setGame] = useState<Game2048 | null>(null);
  const [grid, setGrid] = useState<Grid>(() => Array(4).fill(null).map(() => Array(4).fill(null)));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 确保在客户端初始化游戏
  useEffect(() => {
    setIsClient(true);
    const newGame = new Game2048();
    setGame(newGame);
    setGrid(newGame.getGrid());
    setScore(newGame.getScore());
    setGameOver(false);
    setWon(false);
  }, []);

  const move = useCallback((direction: Direction) => {
    if (!game || gameOver || won) return;

    const result = game.move(direction);

    if (result.moved) {
      setGrid(game.getGrid());
      setScore(game.getScore());
      setGameOver(result.gameOver);
      setWon(result.won);
    }
  }, [game, gameOver, won]);

  const reset = useCallback(() => {
    if (!game) return;
    game.reset();
    setGrid(game.getGrid());
    setScore(game.getScore());
    setGameOver(false);
    setWon(false);
  }, [game]);

  // 在客户端渲染之前返回空网格
  if (!isClient) {
    return {
      grid: Array(4).fill(null).map(() => Array(4).fill(null)),
      score: 0,
      gameOver: false,
      won: false,
      move: () => {},
      reset: () => {},
    };
  }

  return {
    grid,
    score,
    gameOver,
    won,
    move,
    reset,
  };
}