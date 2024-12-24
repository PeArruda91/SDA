import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  const [quizType, setQuizType] = useState<"acupuncture" | "tung" | null>(null);

  const handleStartQuiz = (type: "acupuncture" | "tung") => {
    setQuizType(type);
  };

  const handleGoBack = () => {
    setQuizType(null); 
  };

  return (
    <div>
      {!quizType ? (
        <StartScreen onStartQuiz={handleStartQuiz} />
      ) : (
        <Quiz quizType={quizType} onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default App;
