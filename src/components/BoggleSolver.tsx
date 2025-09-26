import { useState } from "react";
import WordsList from "./wordList/WordsList";
import WordDetails from "./WordDetails";
import type { Board, Word } from "../types";
import BoggleBoard from "./boggleBoard/BoggleBoard";
import EditBoardButton from "./boggleBoard/EditBoardButton";
import { findWordsInBoard } from "../boggleSolver";

// Main app component
const BoggleSolver = () => {
  // Sample boggle board - you can make this editable later
  const [board] = useState<Board>([
    ["C", "A", "T", "S"],
    ["R", "O", "G", "E"],
    ["N", "D", "I", "M"],
    ["B", "L", "U", "E"],
  ]);

  const [isEditingBoard, setIsEditingBoard] = useState<boolean>(false);

  // Sample found words with their paths (row, col coordinates)
  const [foundWords] = useState<Word[]>([
    {
      word: "CAT",
      path: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
    },
    {
      word: "DOG",
      path: [
        { row: 2, col: 1 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ],
    },
    {
      word: "CORD",
      path: [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
        { row: 2, col: 1 },
      ],
    },
    {
      word: "BLUE",
      path: [
        { row: 3, col: 0 },
        { row: 3, col: 1 },
        { row: 3, col: 2 },
        { row: 3, col: 3 },
      ],
    },
  ]);

  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const handleWordSelect = (wordObj: Word): void => {
    setSelectedWord(selectedWord?.word === wordObj.word ? null : wordObj);
  };

  const handleEditBoardToggle = () => {
    setIsEditingBoard((isEditing) => !isEditing);
    // TODO: Make the board editable
  }

  const handleFindWords = () => {
    console.log("hi");
    const words = findWordsInBoard(board);
    console.log(`Found ${words.length} words!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Boggle Solver
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <BoggleBoard board={board} selectedWord={selectedWord} />
            <EditBoardButton isEditing={isEditingBoard} onEditClicked={handleEditBoardToggle} />
            <p className="mt-4 text-sm text-gray-600 text-center">
              Click on a word to see its path on the board
            </p>
          </div>

          <WordsList
            foundWords={foundWords}
            selectedWord={selectedWord}
            findWords={handleFindWords}
            onWordSelect={handleWordSelect}
          />
        </div>

        <WordDetails selectedWord={selectedWord} />
      </div>
    </div>
  );
};

export default BoggleSolver;
