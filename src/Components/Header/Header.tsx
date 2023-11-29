import React from 'react';
import { useGameContext } from '../../Context/GameContext';

interface HeaderProps {
    onPlay: () => void;
    isPlaying: boolean;
    totalOptions: number;
}

const Header: React.FC<HeaderProps> = ({ onPlay, isPlaying, totalOptions }) => {
    const { score } = useGameContext();

    return (
        <div className='header-container'>
            <div className="header">
                <h1 className='title-song'>🎵 Adivinación 🎵</h1>
                <button className='btn-player' onClick={onPlay} disabled={isPlaying}>
                    <img src={isPlaying ? "/audio.gif" : "/play.png"} alt="play" width={30} height={30} />
                </button>
            </div>
            <span className='score-text'>Aciertos:
                <span className="score">
                    {""} {score}
                </span>
                <span className='score-text-total'> / {totalOptions} </span>
            </span>
        </div>
    );
};

export default Header;