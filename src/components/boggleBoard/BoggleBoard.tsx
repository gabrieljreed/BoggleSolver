import type { Board, Word, TilePositions } from "../../types";
import { useRef, useEffect, useState } from "react";
import BoggleTile from "./BoggleTile";
import PathOverlay from "./PathOverlay";

interface BoggleBoardProps {
  board: Board;
  selectedWord: Word | null;
  onTilePositionsCalculated?: (positions: TilePositions) => void;
}

const BoggleBoard = ({
  board,
  selectedWord,
  onTilePositionsCalculated,
}: BoggleBoardProps) => {
  const [tilePositions, setTilePositions] = useState<TilePositions>({});
  const boardRef = useRef<HTMLDivElement>(null);

  // Calculate tile positions for drawing lines
  useEffect(() => {
    if (boardRef.current) {
      const tiles =
        boardRef.current.querySelectorAll<HTMLDivElement>("[data-tile]");
      const positions: TilePositions = {};

      tiles.forEach((tile) => {
        const rowStr = tile.dataset.row;
        const colStr = tile.dataset.col;
        if (!rowStr || !colStr) return;

        const rect = tile.getBoundingClientRect();
        const boardRect = boardRef.current!.getBoundingClientRect();
        const row = parseInt(rowStr);
        const col = parseInt(colStr);

        positions[`${row}-${col}`] = {
          x: rect.left - boardRect.left + rect.width / 2,
          y: rect.top - boardRect.top + rect.height / 2,
        };
      });

      setTilePositions(positions);
      if (onTilePositionsCalculated) {
        onTilePositionsCalculated(positions);
      }
    }
  }, [board, onTilePositionsCalculated]);

  const isHighlighted = (row: number, col: number): boolean => {
    return selectedWord
      ? selectedWord.path.some((p) => p.row === row && p.col === col)
      : false;
  };

  return (
    <div className="relative">
      <div
        ref={boardRef}
        className="grid grid-cols-4 gap-2 p-4 bg-gray-800 rounded-lg"
      >
        {board.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <BoggleTile
              key={`${rowIndex}-${colIndex}`}
              letter={letter}
              row={rowIndex}
              col={colIndex}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      <PathOverlay selectedWord={selectedWord} tilePositions={tilePositions} />
    </div>
  );
};

export default BoggleBoard;
