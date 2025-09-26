interface FindWordsButtonProps {
  findWords: () => void;
}

const FindWordsButton = ({ findWords }: FindWordsButtonProps) => (
  <button
    className="
      w-full p-3 mb-3 h-[4rem] rounded-lg 
      text-white font-medium text-xl
      transition-all duration-200
      bg-green-600
      shadow-md hover:drop-shadow-lg
      hover:scale-101
      border-2 border-transparent
      cursor-pointer
  "
    onClick={findWords}
  >
    Find Words
  </button>
);

export default FindWordsButton;
