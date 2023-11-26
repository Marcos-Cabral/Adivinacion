import React from 'react';
import './style.css'

interface ResultMessageProps {
  guessed: boolean;
  title: string;
}

const ResultMessage: React.FC<ResultMessageProps> = ({ guessed, title }) => {
  const resultClass = guessed ? 'correct' : 'incorrect';
  const message = guessed ? "Correcto!" : "Fallaste!";

  return (
    <p className={`modal-msg`}>
      <span className={resultClass}>
        {message}
      </span> era {title}
    </p>
  );
};

export default ResultMessage;