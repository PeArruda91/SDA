import React, { useState } from "react";

interface OptionsProps {
  options: { text: string; isCorrect: boolean }[];
  onAnswer: (isCorrect: boolean) => void;
  isCorrect: boolean | null;
}

const Options: React.FC<OptionsProps> = ({ options, onAnswer, isCorrect }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number, isCorrect: boolean) => {
    setClickedIndex(index); 
    setTimeout(() => {
      onAnswer(isCorrect); 
    }, 1500);
  };

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={index}
          className={`option-button ${
            clickedIndex === index ? "clicked" : ""
          } ${isCorrect !== null && option.isCorrect ? "correct" : ""}
          ${isCorrect !== null && clickedIndex === index && !option.isCorrect ? "incorrect" : ""}`}
          onClick={() => handleClick(index, option.isCorrect)}
          disabled={isCorrect !== null}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Options;
