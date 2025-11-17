export type Cell = number | null;
export type Grid = Cell[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

export class Game2048 {
  private grid: Grid;
  private score: number;
  private size: number;

  constructor(size: number = 4) {
    this.size = size;
    this.grid = this.createEmptyGrid();
    this.score = 0;
    this.addRandomTile();
    this.addRandomTile();
  }

  private createEmptyGrid(): Grid {
    return Array(this.size).fill(null).map(() => Array(this.size).fill(null));
  }

  private addRandomTile(): void {
    const emptyCells: [number, number][] = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === null) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const [row, col] = emptyCells[randomIndex];
      this.grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  private moveRow(row: Cell[]): [Cell[], number] {
    const filtered = row.filter(cell => cell !== null) as number[];
    let score = 0;
    const merged: Cell[] = [];

    for (let i = 0; i < filtered.length; i++) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        merged.push(filtered[i] * 2);
        score += filtered[i] * 2;
        i++;
      } else {
        merged.push(filtered[i]);
      }
    }

    while (merged.length < this.size) {
      merged.push(null);
    }

    return [merged, score];
  }

  private rotateGrid(): void {
    const newGrid = this.createEmptyGrid();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        newGrid[i][j] = this.grid[this.size - 1 - j][i];
      }
    }
    this.grid = newGrid;
  }

  private moveLeft(): boolean {
    let moved = false;
    for (let i = 0; i < this.size; i++) {
      const [newRow, rowScore] = this.moveRow(this.grid[i]);
      if (newRow.toString() !== this.grid[i].toString()) {
        moved = true;
      }
      this.grid[i] = newRow;
      this.score += rowScore;
    }
    return moved;
  }

  private moveRight(): boolean {
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = this.grid[i].reverse();
    }
    const moved = this.moveLeft();
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = this.grid[i].reverse();
    }
    return moved;
  }

  private moveUp(): boolean {
    let moved = false;
    for (let i = 0; i < this.size; i++) {
      const column: Cell[] = [];
      for (let j = 0; j < this.size; j++) {
        column.push(this.grid[j][i]);
      }
      const [newColumn, colScore] = this.moveRow(column);
      if (newColumn.toString() !== column.toString()) {
        moved = true;
      }
      for (let j = 0; j < this.size; j++) {
        this.grid[j][i] = newColumn[j];
      }
      this.score += colScore;
    }
    return moved;
  }

  private moveDown(): boolean {
    let moved = false;
    for (let i = 0; i < this.size; i++) {
      const column: Cell[] = [];
      for (let j = 0; j < this.size; j++) {
        column.push(this.grid[j][i]);
      }
      const reversedColumn = column.reverse();
      const [newColumn, colScore] = this.moveRow(reversedColumn);
      if (newColumn.toString() !== reversedColumn.toString()) {
        moved = true;
      }
      const finalColumn = newColumn.reverse();
      for (let j = 0; j < this.size; j++) {
        this.grid[j][i] = finalColumn[j];
      }
      this.score += colScore;
    }
    return moved;
  }

  public move(direction: Direction): { moved: boolean; gameOver: boolean; won: boolean } {
    let moved = false;

    switch (direction) {
      case 'left':
        moved = this.moveLeft();
        break;
      case 'right':
        moved = this.moveRight();
        break;
      case 'up':
        moved = this.moveUp();
        break;
      case 'down':
        moved = this.moveDown();
        break;
    }

    if (moved) {
      this.addRandomTile();
    }

    const gameOver = this.isGameOver();
    const won = this.hasWon();

    return { moved, gameOver, won };
  }

  private isGameOver(): boolean {
    // Check for empty cells
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === null) {
          return false;
        }
      }
    }

    // Check for possible merges
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const current = this.grid[i][j];
        // Check right
        if (j < this.size - 1 && current === this.grid[i][j + 1]) {
          return false;
        }
        // Check down
        if (i < this.size - 1 && current === this.grid[i + 1][j]) {
          return false;
        }
      }
    }

    return true;
  }

  private hasWon(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === 2048) {
          return true;
        }
      }
    }
    return false;
  }

  public getGrid(): Grid {
    return this.grid.map(row => [...row]);
  }

  public getScore(): number {
    return this.score;
  }

  public reset(): void {
    this.grid = this.createEmptyGrid();
    this.score = 0;
    this.addRandomTile();
    this.addRandomTile();
  }
}