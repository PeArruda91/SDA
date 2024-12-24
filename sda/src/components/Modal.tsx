import React from "react";

interface ModalProps {
  onRestart: () => void;
}

const Modal: React.FC<ModalProps> = ({ onRestart }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Você errou!</h2>
        <p>Que tal tentar novamente?</p>
        <button className="modal-button" onClick={onRestart}>
          Recomeçar
        </button>
      </div>
    </div>
  );
};

export default Modal;
