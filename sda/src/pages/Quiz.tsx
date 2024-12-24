import React, { useState, useEffect } from "react";
import "../style/main.css";
import questionsData from "../data/questions.json"; // Importa as perguntas do JSON

// Função para embaralhar um array
const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

// Componente Modal
const Modal: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  return (
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
};

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Embaralha as perguntas e suas opções ao iniciar o jogo
    const shuffled = shuffleArray(
      questionsData.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);

    if (!isCorrect) {
      setShowModal(true); // Mostra o modal se a resposta estiver errada
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsCorrect(null);
      }, 1000);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0); // Reinicia as perguntas
    setIsCorrect(null);         // Limpa o estado de resposta
    setShowModal(false);        // Fecha o modal
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
      <h2 className="question">{currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((option: any, index: number) => (
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

      {/* Exibe o modal se showModal for true */}
      {showModal && <Modal onRestart={restartQuiz} />}
    </div>
  );
};

export default Quiz;
