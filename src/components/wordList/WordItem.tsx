import type { Word } from "../../types";

interface WordItemProps {
  wordObj: Word;
  isSelected: boolean;
  onSelect: (word: Word) => void;
}

const WordItem = ({ wordObj, isSelected, onSelect }: WordItemProps) => (
  <button
    onClick={() => onSelect(wordObj)}
    className={`
      w-full text-left p-3 rounded-lg transition-all duration-200 cursor-pointer
      ${
        isSelected
          ? "bg-blue-100 border-2 border-blue-400 text-blue-800"
          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
      }
    `}
  >
    <span className="font-medium">{wordObj.word}</span>
    <span className="text-sm text-gray-500 ml-2">
      ({wordObj.path.length} letters)
    </span>
  </button>
);

export default WordItem;
