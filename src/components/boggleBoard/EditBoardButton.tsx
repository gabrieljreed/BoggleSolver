interface EditBoardButtonProps {
  isEditing: boolean;
  onEditClicked: () => void;
}

const EditBoardButton = ({
  isEditing,
  onEditClicked,
}: EditBoardButtonProps) => {
  const buttonText = isEditing ? "Done" : "Edit";
  return (
    <div className="flex flex-row items-start w-fit">
      <button
        className="bg-gray-400 text-white rounded-md px-3 py-1 cursor-pointer mt-2"
        onClick={onEditClicked}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EditBoardButton;
