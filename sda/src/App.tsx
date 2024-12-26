import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  const [quizType, setQuizType] = useState<"acupuncture" | "tung" | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleStartQuiz = (type: "acupuncture" | "tung") => {
    setQuizType(type);
  };

  const handleGoBack = () => {
    setQuizType(null); 
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>
      {!quizType ? (
        <StartScreen onStartQuiz={handleStartQuiz} />
      ) : (
        <Quiz quizType={quizType} onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default App;