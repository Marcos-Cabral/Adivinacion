import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import trackList from './tracklists.json';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [gameState, setGameState] = useState({
    options: [],
    correctOption: null,
  });
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const generateOptions = () => {
    const shuffledIndexes = [];
    while (shuffledIndexes.length < 3) {
      const newIndex = Math.floor(Math.random() * trackList.length);
      if (!shuffledIndexes.includes(newIndex)) {
        shuffledIndexes.push(newIndex);
      }
    }

    const shuffledOptions = shuffledIndexes.map(index => trackList[index]);
    const correctOptionIndex = Math.floor(Math.random() * shuffledIndexes.length);

    setGameState({
      options: shuffledOptions,
      correctOption: correctOptionIndex,
    });
  };

  useEffect(() => {
    generateOptions();
  }, []);

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(true);
      audioRef.current.play();
      setTimeout(() => {
        setIsPlaying(false);
        audioRef.current.pause();
      }, 2000);
    }
  };

  const handleOptionClick = (index) => {
    if (index === gameState.correctOption) {
      showModal('¡Respuesta correcta!');
    } else {
      showModal('Respuesta incorrecta, era ' + gameState.options[gameState.correctOption].title);
    }
    setTimeout(() => {
      generateOptions();
      closeModal();
    }, 900);
  };

  const closeModal = () => {
    setModalVisible(false)
  }
  return (
    <div className='container'>
      <div className='header'>
        <h1 className='title-song'>🕵️‍♀️Song Detective🕵️‍♂️ (Taylor's Version)</h1>
        <button className='btn-player' onClick={playSong}>
          <img src="/play.png" alt="play" width={20} height={20} />Play
        </button>
      </div>
      <div className='modal' style={{ display: modalVisible ? 'flex' : 'none' }}>
        <div className='modal-content'>
          <span className='close-btn' onClick={closeModal}>X</span>
          <p className='modal-msg'>{modalMessage}</p>
        </div>
      </div>
      {gameState.options.length && (
        <>
          <audio ref={audioRef} src={gameState.options[gameState.correctOption].preview} />
          <div className='options-container'>
            {gameState.options.map((option, index) => (
              <button className='options' key={index} onClick={() => handleOptionClick(index)}>
                <div className="option-info-img">
                  <img className='album-img' src={option.album.cover_medium} alt={option.title} width="100%" height="100%" />
                </div>
                <p className='title-album'>
                  {option.title}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
      <span className='info-text' >Eras tour edition</span>
    </div>
  );
};

export default App;
