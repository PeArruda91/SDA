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

  useEffect(() => {
    const questions =
      quizType === "acupuncture" ? acupunctureQuestions : tungQuestions;
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

    const questions =
      quizType === "acupuncture" ? acupunctureQuestions : tungQuestions;
    const shuffled = shuffleArray(
      questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }))
    );
    setShuffledQuestions(shuffled);
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
          />
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