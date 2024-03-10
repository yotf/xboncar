import { PlusIcon } from "@heroicons/react/24/outline";

type AddButtonProps = {
  onClick: () => void;
};
const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <PlusIcon
      onClick={onClick}
      className="
            w-10 h-10
            mt-10
            p-2
            text-black
            cursor-pointer
            transition-all
            duration-300
            ease-in-out
            shadow-md
            border-2
            border-carbonx-green
            hover:shadow-lg
            rounded-full
            bg-white
            hover:scale-110
   
   
"
    />
  );
};

export default AddButton;
