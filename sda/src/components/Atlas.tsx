import React, { useState } from "react";

const Atlas: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const bodyParts = [
    "Cabeça",
    "Orelha",
    "Face",
    "Tronco",
    "Costas",
    "Braços",
    "Mãos",
    "Pernas",
    "Pés"
  ];

  const handleExpand = (part: string) => {
    setExpanded(expanded === part ? null : part);
  };

  return (
    <div className="atlas">
      <h2>Atlas de Acupuntura</h2>
      <p>Explore informações sobre os pontos de Acupuntura Sistêmica e Técnica Tung.</p>
      <ul>
        {bodyParts.map((part) => (
          <li key={part} onClick={() => handleExpand(part)}>
            {part}
            {expanded === part && <div>Informações detalhadas sobre {part}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Atlas;
