interface BoggleTileProps {
  letter: string;
  row: number;
  col: number;
  isHighlighted: boolean;
}

const BoggleTile = ({ letter, row, col, isHighlighted }: BoggleTileProps) => (
  <div
    data-tile="true"
    data-row={row}
    data-col={col}
    className={`
      w-16 h-16 flex items-center justify-center
      bg-white rounded-lg shadow-md
      text-2xl font-bold text-gray-800
      transition-all duration-200
      ${isHighlighted
        ? 'bg-blue-200 ring-2 ring-blue-400' 
        : 'hover:bg-gray-100'
      }
    `}
  >
    {letter}
  </div>
);

export default BoggleTile;
