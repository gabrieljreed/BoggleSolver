import { words } from "./assets/dictionary";
import type { Board, Position, Word } from "./types";

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isWord: boolean = false;
}

class Trie {
  private root: TrieNode = new TrieNode();

  constructor(words: string[]) {
    words.forEach((word) => this.insert(word));
  }

  private insert(word: string): void {
    let current = this.root;
    for (const char of word.toUpperCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isWord = true;
  }

  hasPrefix(prefix: string): boolean {
    let current = this.root;
    for (const char of prefix.toUpperCase()) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    return true;
  }

  hasWord(word: string): boolean {
    let current = this.root;
    for (const char of word.toUpperCase()) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    return current.isWord;
  }
}

const dictionary = new Trie(words);

const DIRECTIONS: Position[] = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

const MIN_WORD_LENGTH: number = 3;

const isValidPosition = (board: Board, row: number, col: number): boolean => {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
};

const dfs = (
  board: Board,
  row: number,
  col: number,
  visited: boolean[][],
  currentWord: string,
  currentPath: Position[],
  foundWords: Set<string>,
  foundPaths: Map<string, Position[]>
): void => {
  const letter = board[row][col];
  const newWord = currentWord + letter;
  const newPath = [...currentPath, { row, col }];

  if (!dictionary.hasPrefix(newWord)) {
    return;
  }

  if (newWord.length >= MIN_WORD_LENGTH && dictionary.hasWord(newWord)) {
    if (!foundWords.has(newWord)) {
      foundWords.add(newWord);
      foundPaths.set(newWord, newPath);
    }
  }

  // Mark current cell as visited
  visited[row][col] = true;

  // Explore all adjacent cells
  for (const direction of DIRECTIONS) {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (isValidPosition(board, newRow, newCol)) {
      dfs(
        board,
        newRow,
        newCol,
        visited,
        currentWord,
        currentPath,
        foundWords,
        foundPaths
      );
    }
  }

  // Backtrack - unmark current cell
  visited[row][col] = false;
};

export const findWordsInBoard = (board: Board): Word[] => {
  const foundWords = new Set<string>();
  const foundPaths = new Map<string, Position[]>();

  // Try starting from each cell
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const visited: boolean[][] = board.map((row) => row.map(() => false));
      dfs(board, row, col, visited, "", [], foundWords, foundPaths);
    }
  }

  // Convert to Word objects
  const result: Word[] = [];
  foundWords.forEach((word) => {
    const path = foundPaths.get(word);
    if (path) {
      result.push({ word, path });
    }
  });

  // Sort by length, then alphabetically
  return result.sort((a, b) => {
    if (a.word.length !== b.word.length) {
      return b.word.length - a.word.length;
    }
    return a.word.localeCompare(b.word);
  });
};

export const getWordStats = (words: Word[]): Record<number, number> => {
  const stats: Record<number, number> = {};
  words.forEach((word) => {
    const length = word.word.length;
    stats[length] = (stats[length] || 0) + 1;
  });
  return stats;
};
