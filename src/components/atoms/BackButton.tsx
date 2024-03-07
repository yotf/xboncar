import { useNavigate } from "react-router-dom";

const BackButton: React.FC<{ label: string; to?: string }> = ({ label }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="text-green-600  hover:text-green-800 transition duration-300 ease-in-out  font-semibold self-start m-5 -mr-5"
    >
      <span className="text-xl">‹   </span> {label}
    </button>
  );
};

export default BackButton;
