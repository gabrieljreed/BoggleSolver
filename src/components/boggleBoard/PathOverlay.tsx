import type { Word, TilePositions } from "../../types";

interface PathOverlayProps {
  selectedWord: Word | null;
  tilePositions: TilePositions;
}

const PathOverlay = ({ selectedWord, tilePositions }: PathOverlayProps) => {
  if (!selectedWord) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
        </marker>
      </defs>

      {/* Draw path lines */}
      {selectedWord.path.map((pos, index) => {
        if (index === selectedWord.path.length - 1) return null;

        const currentPos = tilePositions[`${pos.row}-${pos.col}`];
        const nextPos =
          tilePositions[
            `${selectedWord.path[index + 1].row}-${
              selectedWord.path[index + 1].col
            }`
          ];

        if (!currentPos || !nextPos) return null;

        return (
          <line
            key={index}
            x1={currentPos.x}
            y1={currentPos.y}
            x2={nextPos.x}
            y2={nextPos.y}
            stroke="#3b82f6"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
            className="animate-pulse"
          />
        );
      })}

      {/* Draw starting point */}
      {selectedWord.path.length > 0 && (
        <circle
          cx={
            tilePositions[
              `${selectedWord.path[0].row}-${selectedWord.path[0].col}`
            ]?.x
          }
          cy={
            tilePositions[
              `${selectedWord.path[0].row}-${selectedWord.path[0].col}`
            ]?.y
          }
          r="6"
          fill="#10b981"
          className="animate-pulse"
        />
      )}
    </svg>
  );
};

export default PathOverlay;
