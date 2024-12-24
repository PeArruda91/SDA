import React from "react";
import logo from "../assets/logo.png";

interface StartScreenProps {
  onStartQuiz: (quizType: "acupuncture" | "tung") => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz }) => {
  return (
    <div className="start-container">
      <img src={logo} alt="Logo" className="start-logo" />
      <h1 className="start-title">Descubra a Sabedoria da Medicina Tradicional Chinesa</h1>
      <p className="start-subtitle">
        Teste seus conhecimentos sobre Acupuntura e Técnica Tung em quizzes interativos e desafiadores.
      </p>
      <button
        className="start-button"
        data-tooltip="Teste seus conhecimentos sobre acupuntura!"
        onClick={() => onStartQuiz("acupuncture")}
      >
        Começar Quiz de Acupuntura
      </button>
      <button
        className="start-button"
        onClick={() => onStartQuiz("tung")}
      >
        Quiz sobre Técnica Tung
      </button>

      <footer className="footer">
        <p>Entre em contato:</p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/seuperfil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://wa.me/seunumerodetelefone"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://www.facebook.com/seupagina"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default StartScreen;
