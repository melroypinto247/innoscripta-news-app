import React from "react";
import "./home.css";

const NavCards: React.FC<{ title: string; selected: string; onClick: () => void }> = ({
  title,
  selected,
  onClick,
}) => {
  return (
    <div
      className={`source-container ${
        selected === title ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <img
        src="/assets/images/newspaper-folded.png"
        alt="news-paper-icon"
        width={30}
        height={30}
      />
      <div className="source-name">{title}</div>
    </div>
  );
};

export default NavCards;