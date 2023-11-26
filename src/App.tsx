import Game from './Components/Game/Game';
import { useGameContext } from './Context/GameContext';
import './App.css';
import React, { useState } from 'react';
import GeneralSettingsModal from './Components/GeneralSettingsModal/GeneralSettingsModal';

const App: React.FC = () => {
  const { theme, setTheme } = useGameContext();
  const [modalVisible, setModalVisible] = useState<boolean>(!theme);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSetBzrpTheme = () => {
    setTheme('bzrp');
    setModalVisible(false);
  };

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