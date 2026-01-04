"use client";

interface Props {
  active: boolean;
  onClick: () => void;
}

const OptionsToggleButton: React.FC<Props> = ({ active, onClick }) => {
  return (
    <button className="btn btn-ghost btn-circle" onClick={onClick}>
      <span
        className={`
          inline-block
          transition-transform duration-300 ease-out
          ${active ? "rotate-90" : "rotate-0"}
        `}
      >
        ⋯
      </span>
    </button>
  );
};

export default OptionsToggleButton;
