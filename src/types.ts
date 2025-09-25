export interface Position {
    row: number;
    col: number;
}

export interface Word {
    word: string;
    path: Position[];
}

export interface TilePositions {
    [key: string]: { x: number, y: number };
}

export type Board = string[][];