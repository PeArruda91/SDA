import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Atlas from "./Atlas";
import SocialMedia from "./SocialMedia";

interface StartScreenProps {
  onStartQuiz: (quizType: "acupuncture" | "tung") => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz }) => {
  const [activeTab, setActiveTab] = useState("quiz");
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
      document.body.classList.add(`${savedMode}-mode`);
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : mode === "dark" ? "relax" : "light";
    setMode(newMode);
    document.body.classList.remove("light-mode", "dark-mode", "relax-mode");
    document.body.classList.add(`${newMode}-mode`);
    localStorage.setItem("mode", newMode);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "quiz":
        return (
          <>
            <p className="start-subtitle">
              Teste seus conhecimentos sobre Acupuntura e Técnica Tung em quizzes interativos e desafiadores.
            </p>
            <button
              className="start-button"
              data-tooltip="Teste seus conhecimentos sobre acupuntura!"
              onClick={() => onStartQuiz("acupuncture")}
            >
              Quiz sobre Acupuntura Sistêmica 
            </button>
            <button
              className="start-button"
              onClick={() => onStartQuiz("tung")}
            >
              Quiz sobre Técnica Tung
            </button>
          </>
        );
      case "atlas":
        return <Atlas />;
      case "social":
        return <SocialMedia />;
      default:
        return null;
    }
  };

  return (
    <div className="start-container">
      <img src={logo} alt="Logo" className="start-logo" />
      <h1 className="start-title">Descubra a Sabedoria da Medicina Tradicional Chinesa</h1>
      {renderTabContent()}
      <div className="tabs">
        <button className={`tab-button ${activeTab === "quiz" ? "active" : ""}`} onClick={() => setActiveTab("quiz")}>
          <i className="fas fa-gamepad"></i>
          <span>Quiz</span>
        </button>
        <button className={`tab-button ${activeTab === "atlas" ? "active" : ""}`} onClick={() => setActiveTab("atlas")}>
          <i className="fas fa-book"></i>
          <span>Atlas</span>
        </button>
        <button className={`tab-button ${activeTab === "social" ? "active" : ""}`} onClick={() => setActiveTab("social")}>
          <i className="fas fa-globe"></i>
          <span>Redes Sociais</span>
        </button>
      </div>
      <button className="dark-mode-toggle" onClick={toggleMode}>
        {mode === "light" ? "🌙" : mode === "dark" ? "🌿" : "☀️"}
      </button>
    </div>
  );
};

export default StartScreen;
