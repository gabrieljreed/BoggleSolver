import type { Word } from "../../types";
import WordItem from "./WordItem";
import FindWordsButton from "./FindWordsButton";

interface WordsListProps {
  foundWords: Word[];
  selectedWord: Word | null;
  findWords: () => void;
  onWordSelect: (word: Word) => void;
}

const WordsList = ({
  foundWords,
  selectedWord,
  findWords,
  onWordSelect,
}: WordsListProps) => (
  <div>
    <FindWordsButton findWords={findWords} />

    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Found Words ({foundWords.length})
      </h2>

      {/* Scrollable word list */}
      <div className="flex-1 overflow-y-auto max-h-96 pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {foundWords.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No words found yet.</p>
            <p className="text-sm">Click "Find Words" to start!</p>
          </div>
        ) : (
          foundWords.map((wordObj, index) => (
            <WordItem
              key={index}
              wordObj={wordObj}
              isSelected={selectedWord?.word === wordObj.word}
              onSelect={onWordSelect}
            />
          ))
        )}
      </div>
    </div>
  </div>
);

export default WordsList;
