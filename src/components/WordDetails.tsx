import type { Word } from "../types";

interface WordDetailsProps {
  selectedWord: Word | null;
}

const WordDetails = ({ selectedWord }: WordDetailsProps) => {
  if (!selectedWord) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-4 text-center">
      <h3 className="text-lg font-semibold text-gray-800">
        Selected: <span className="text-blue-600">{selectedWord.word}</span>
      </h3>
      <p className="text-sm text-gray-600 mt-2">
        Path: {selectedWord.path.map((p) => `(${p.row},${p.col})`).join(" → ")}
      </p>
    </div>
  );
};

export default WordDetails;
