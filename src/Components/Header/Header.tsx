import React from 'react';

interface HeaderProps {
    onPlay: () => void;
    isPlaying: boolean;
}

const Header: React.FC<HeaderProps> = ({ onPlay, isPlaying }) => {
    return (
        <div className='header'>
            <h1 className='title-song'>🎵 Adivinación 🎵</h1>
            <button className='btn-player' onClick={onPlay} disabled={isPlaying}>
                <img src={isPlaying ? "/audio.gif" : "/play.png"} alt="play" width={30} height={30} />Play
            </button>
        </div>
    );
};

export default Header;