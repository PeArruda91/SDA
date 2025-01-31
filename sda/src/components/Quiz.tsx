import React, { useState, useEffect } from "react";
import acupunctureQuestions from "../data/questions.json";
import tungQuestions from "../data/tung_questions.json";
import Question from "./Question";
import Modal from "./Modal";
import { shuffleArray } from "../utils/helpers";

interface QuizProps {
  quizType: "acupuncture" | "tung";
  onGoBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quizType, onGoBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [helpUsed, setHelpUsed] = useState({ eliminate: 0, skip: 0 });
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  useEffect(() => {
    const questions = quizType === "acupuncture" ? acupunctureQuestions : tungQuestions;
    const shuffled = shuffleArray(
      questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(shuffled);
  }, [quizType]);

  useEffect(() => {
    if (!shuffledQuestions[currentQuestionIndex]) return;

    setTimeLeft(10);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, shuffledQuestions]);

  useEffect(() => {
    setEliminatedOptions([]);
  }, [currentQuestionIndex]);

  const handleAnswer = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowModal(true);
    }
    setIsCorrect(null);
  };

  const handleTimeout = () => {
    setIsCorrect(false);
    setShowModal(true);
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowModal(false);
    setIsCorrect(null);
    setHelpUsed({ eliminate: 0, skip: 0 });
    setEliminatedOptions([]);
    const questions = quizType === "acupuncture" ? acupunctureQuestions : tungQuestions;
    const shuffled = shuffleArray(
      questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(shuffled);
  };

  const handleEliminate = () => {
    if (helpUsed.eliminate < 3 && currentQuestion) {
      const incorrectOptions = currentQuestion.options
        .map((option: any, index: number) => (!option.isCorrect ? index : -1))
        .filter((index: number) => index !== -1);
      const toEliminate = incorrectOptions.slice(0, 2);
      setEliminatedOptions(toEliminate);
      setHelpUsed((prev) => ({ ...prev, eliminate: prev.eliminate + 1 }));
    }
  };

  const handleSkip = () => {
    if (helpUsed.skip < 3) {
      setScore((prev) => prev + 1);
      setCurrentQuestionIndex((prev) => prev + 1);
      setHelpUsed((prev) => ({ ...prev, skip: prev.skip + 1 }));
      setIsCorrect(null);
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="quiz-card">
      <p className="score">Pontuação: {score}</p>
      {currentQuestion ? (
        <>
          <p className="timer">Tempo restante: {timeLeft} segundos</p>
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            isCorrect={isCorrect}
            eliminatedOptions={eliminatedOptions}
          />
          <div className="help-buttons">
            <button
              className="help-button"
              onClick={handleEliminate}
              disabled={helpUsed.eliminate >= 3}
            >
              <i className="fas fa-times-circle"></i> Eliminar 2 opções ({3 - helpUsed.eliminate} restantes)
            </button>
            <button
              className="help-button"
              onClick={handleSkip}
              disabled={helpUsed.skip >= 3}
            >
              <i className="fas fa-forward"></i> Pular questão ({3 - helpUsed.skip} restantes)
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1 className="title">Parabéns!</h1>
          <p className="results">Você concluiu o quiz!</p>
          <button className="button" onClick={restartQuiz}>
            Jogar Novamente
          </button>
        </div>
      )}
      {showModal && <Modal onRestart={restartQuiz} />}
      <button className="back-button" onClick={onGoBack}>
        Voltar à Tela Inicial
      </button>
    </div>
  );
};

export default Quiz;