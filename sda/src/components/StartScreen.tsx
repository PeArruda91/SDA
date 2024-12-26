import React, { useState } from "react";
import logo from "../assets/logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Atlas from "./Atlas"; 

interface StartScreenProps {
  onStartQuiz: (quizType: "acupuncture" | "tung") => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz }) => {
  const [activeTab, setActiveTab] = useState("quiz");

  return (
    <div className="start-container">
      <img src={logo} alt="Logo" className="start-logo" />
      <h1 className="start-title">Descubra a Sabedoria da Medicina Tradicional Chinesa</h1>
      {activeTab === "quiz" && (
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
      )}
      {activeTab === "atlas" && (
        <Atlas />
      )}
      {activeTab === "social" && (
        <footer className="footer">
          <p>Entre em contato:</p>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/gisavenancio.masso"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://wa.me/551198516-6565"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://www.facebook.com/gisavenancio.masso"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </footer>
      )}
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
    </div>
  );
};

export default StartScreen;
