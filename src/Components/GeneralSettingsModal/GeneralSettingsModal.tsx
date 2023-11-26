import React, { useState } from 'react';
import { useGameContext } from '../../Context/GameContext';
import { Theme } from '../../Types/Theme';
import './style.css';
import { Difficulty } from '../../Types/Difficulty';

interface GeneralSettingsModalProps {
    onClose: () => void;
}

const GeneralSettingsModal: React.FC<GeneralSettingsModalProps> = ({ onClose }) => {
    const { setTheme, difficulty, theme, setDifficulty } = useGameContext();
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(theme);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulty);

    const difficulties: Difficulty[] = ['Fácil', 'Normal', 'Difícil']; // Ejemplo de niveles de dificultad

    const themes: Theme[] = ['taylor-swift', 'bzrp'];

    const handleSetDifficulty = (difficulty: Difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleSetTheme = (theme: Theme) => {
        setSelectedTheme(theme); // Marcar la opción seleccionada visualmente
    };

    const handleSaveTheme = () => {
        if (selectedTheme) {
            setTheme(selectedTheme);
            setDifficulty(selectedDifficulty);
            onClose();
        }
    };

    return (
        <div className="modal-background">
            <div className="general-settings-modal">
                <h2 className='label-config'>Selecciona un género a adivinar</h2>
                <div className='scroll-container'>
                    <div className='scroll-content'>
                        {themes.map((theme, index) => (
                            <button
                                className={`item btn-option ${selectedTheme === theme ? 'selected' : ''}`}
                                key={index}
                                onClick={() => handleSetTheme(theme)}
                            >
                                {theme}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='difficulty-section'>
                    <div>
                        <h2 className='label-config'>Selecciona la dificultad</h2>
                        <span className='info-difficulty'>La dificultad modifica la duración de la canción al momento de adivinarla.</span>
                    </div>
                    <div className='difficulty-container'>
                        {difficulties.map((difficulty, index) => (
                            <button
                                className={`difficulty-btn ${selectedDifficulty === difficulty ? 'selected' : ''}`}
                                key={index}
                                onClick={() => handleSetDifficulty(difficulty)}
                            >
                                <span>{difficulty}</span>
                                <div className='average-container'>
                                    {Array.from({ length: index + 1 }).map((_, i) => (
                                        <span key={i}>⭐️</span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="button-container">
                    <button className="save-button" onClick={handleSaveTheme}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettingsModal;