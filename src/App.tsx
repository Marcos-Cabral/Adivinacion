import Game from './Components/Game/Game';
import { useGameContext } from './Context/GameContext';
import './App.css';
import React, { useEffect, useState } from 'react';
import GeneralSettingsModal from './Components/GeneralSettingsModal/GeneralSettingsModal';

const App: React.FC = () => {
  const { theme } = useGameContext();
  const [modalVisible, setModalVisible] = useState<boolean>(!theme);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    setModalVisible(!theme);
  }, [theme]);

  return (
    <div className='container'>
      {!theme || modalVisible ? (
        <GeneralSettingsModal onClose={handleModal} />
      ) : (
        <>
          <button onClick={handleModal} className='config-btn'>⚙</button>
          <Game />
        </>
      )}
    </div>
  );
};

export default App;