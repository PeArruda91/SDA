import React, { useState, useEffect, useCallback } from "react";
import "../style/main.css";
import questionsData from "../data/questions.json";

interface Question {
  question: string;
  options: { text: string; isCorrect: boolean }[];
}

const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

const Modal: React.FC<{ onRestart: () => void }> = ({ onRestart }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Você errou!</h2>
      <p>Que tal tentar novamente?</p>
      <button className="button" onClick={onRestart}>
        Começar Novamente
      </button>
    </div>
  </div>
);

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const shuffled = shuffleArray(
      questionsData.map((question: Question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
      document.body.classList.add(`${savedMode}-mode`);
    }
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    if (!isCorrect) {
      setShowModal(true);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsCorrect(null);
      }, 1000);
    }
  }, []);

  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setIsCorrect(null);
    setShowModal(false);
  }, []);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : mode === "dark" ? "relax" : "light";
    setMode(newMode);
    document.body.classList.remove("light-mode", "dark-mode", "relax-mode");
    document.body.classList.add(`${newMode}-mode`);
    localStorage.setItem("mode", newMode);
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  if (currentQuestionIndex >= shuffledQuestions.length) {
    return (
      <div className="container">
        <h1 className="title">Parabéns!</h1>
        <p className="results">Você concluiu o quiz!</p>
        <button className="button" onClick={restartQuiz}>
          Jogar Novamente
        </button>
      </div>
    );
  }

  if (!currentQuestion) return <p>Carregando...</p>;

  return (
    <div className="container">
      <button className="dark-mode-toggle" onClick={toggleMode}>
        {mode === "light" ? "🌙" : mode === "dark" ? "🌿" : "☀️"}
      </button>
      <h2 className="question">{currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              isCorrect === true && option.isCorrect ? "correct" : ""
            } ${
              isCorrect === false && !option.isCorrect ? "incorrect" : ""
            }`}
            onClick={() => handleAnswer(option.isCorrect)}
            disabled={isCorrect !== null}
          >
            {option.text}
          </button>
        ))}
      </div>
      {showModal && <Modal onRestart={restartQuiz} />}
    </div>
  );
};

export default Quiz;
