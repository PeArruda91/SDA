import React from "react";

const SocialMedia: React.FC = () => {
  return (
    <div className="social-media">
      <h2>Redes Sociais</h2>
      <p>Entre em contato conosco:</p>
      <ul>
        <li>
          <a
            href="https://www.instagram.com/seuperfil"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/seunumerodetelefone"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/seupagina"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialMedia;
