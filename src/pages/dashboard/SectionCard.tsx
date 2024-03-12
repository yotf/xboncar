type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className,
  onClick,
}) => (
  <div
    className={`p-4  ease-in-out transition-all  bg-white rounded-lg shadow border-2 ${
      className || ""
    }`}
    onClick={onClick}
  >
    <h3 className="mb-6 text-xl font-semibold text-center">{title}</h3>
    {children}
  </div>
);

export default SectionCard;
