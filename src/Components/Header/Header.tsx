import React from 'react';

interface HeaderProps {
    onPlay: () => void;
    isPlaying: boolean;
}

const Header: React.FC<HeaderProps> = ({ onPlay, isPlaying }) => {
    return (
        <div className='header'>
            <h1 className='title-song'>🕵️‍♀️Song Detective🕵️‍♂️</h1>
            <button className='btn-player' onClick={onPlay} disabled={isPlaying}>
                <img src="/play.png" alt="play" width={20} height={20} />Play
            </button>
        </div>
    );
};

export default Header;