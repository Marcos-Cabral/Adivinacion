import Game from './Components/Game/Game';
import { useGameContext } from './Context/GameContext';
import './App.css';
import x from './tracklists.json';
import React, { useState } from 'react';
import GeneralSettingsModal from './Components/GeneralSettingsModal/GeneralSettingsModal';

const App: React.FC = () => {
  const { theme } = useGameContext();
  const [modalVisible, setModalVisible] = useState<boolean>(!theme);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  var d = '';

  Object.keys(x).forEach(artist => {
    d = d +  artist + " ,";
  });

  console.log(d);
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