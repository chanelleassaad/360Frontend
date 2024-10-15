interface IButtonProps {
  name?: string;
  backgroundColor?: string;
  color?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const ReButton = ({
  name,
  backgroundColor,
  color,
  icon,
  onClick,
}: IButtonProps) => {
  return (
    <button
      className="flex items-center justify-center py-2 px-4 rounded text-white font-bold"
      style={{ backgroundColor, color }}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {name}
    </button>
  );
};

export default ReButton;
