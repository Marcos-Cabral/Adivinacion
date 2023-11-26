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
    <div className={`modal-msg`}>
      <h4 className={resultClass}>{message}</h4>
      <span className="">
        Era "{title}"
      </span>
    </div>
  );
};

export default ResultMessage;