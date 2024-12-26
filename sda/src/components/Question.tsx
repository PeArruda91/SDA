import React from "react";
import Options from "./Options";

interface QuestionProps {
  question: {
    question: string;
    options: { text: string; isCorrect: boolean }[];
  };
  onAnswer: (isCorrect: boolean) => void;
  isCorrect: boolean | null;
  eliminatedOptions: number[];
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer, isCorrect, eliminatedOptions }) => {
  return (
    <div>
      <h2 className="question">{question.question}</h2>
      <Options options={question.options} onAnswer={onAnswer} isCorrect={isCorrect} eliminatedOptions={eliminatedOptions} />
    </div>
  );
};

export default Question;
