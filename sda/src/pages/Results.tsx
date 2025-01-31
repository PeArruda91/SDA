import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score ?? 0;

  const handlePlayAgain = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="title">Resultados</h1>
      <p className="results">Sua pontuação final foi: {score}</p>
      <button className="button" onClick={handlePlayAgain}>
        Jogar Novamente
      </button>
    </div>
  );
};

export default Results;
