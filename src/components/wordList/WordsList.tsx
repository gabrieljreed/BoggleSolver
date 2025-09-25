import type { Word } from "../../types";
import WordItem from "./WordItem";

interface WordsListProps {
  foundWords: Word[];
  selectedWord: Word | null;
  onWordSelect: (word: Word) => void;
}

const WordsList = ({
  foundWords,
  selectedWord,
  onWordSelect,
}: WordsListProps) => (
  <div className="bg-white rounded-lg shadow-lg p-4">
    <h2 className="text-xl font-bold mb-4 text-gray-800">Found Words</h2>
    <div className="space-y-2">
      {foundWords.map((wordObj, index) => (
        <WordItem
          key={index}
          wordObj={wordObj}
          isSelected={selectedWord?.word === wordObj.word}
          onSelect={onWordSelect}
        />
      ))}
    </div>
  </div>
);

export default WordsList;
