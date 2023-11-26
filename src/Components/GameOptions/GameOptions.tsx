import React from 'react';
import { GameState } from '../Game/Game';

export interface Option {
  id: number;
  title: string;
  preview: string;
  img: string;
}

export interface GameOptionsProps {
  gameState: GameState;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  onSelectOption: (option: number) => void;
}

const GameOptions: React.FC<GameOptionsProps> = ({ gameState, onSelectOption, audioRef }) => {
  return (
    <>
      {gameState.options.length > 0 && (
        <>
          <audio ref={audioRef} src={gameState.options[gameState.correctOption!].preview} />
          <div className='options-container'>
            {gameState.options.map((option, index) => (
              <button className='options' key={option.id} onClick={() => onSelectOption(index)}>
                <div className="option-info-img">
                  <img className='album-img' src={option.img} alt={option.title} width="100%" height="100%" />
                </div>
                <p className='title-album'>
                  {option.title}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default GameOptions;
