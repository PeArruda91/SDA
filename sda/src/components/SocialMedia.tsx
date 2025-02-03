import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const SocialMedia: React.FC = () => {
  return (
    <div className="social-media">
      <h2>Redes Sociais</h2>
      <p>Entre em contato conosco:</p>
      <div className="social-buttons">
        <a
          className="social-button highlight"
          href="https://www.instagram.com/seuperfil"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          className="social-button highlight"
          href="https://wa.me/seunumerodetelefone"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <a
          className="social-button highlight"
          href="https://www.facebook.com/seupagina"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
