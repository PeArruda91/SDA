import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Bem-vindo ao Quiz!</h1>
      <button className="button" onClick={() => navigate("/quiz")}>
        Começar Jogo
      </button>
    </div>
  );
};

export default Home;
