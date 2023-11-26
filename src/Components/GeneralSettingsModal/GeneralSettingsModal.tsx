import React, { useState } from 'react';
import { useGameContext } from '../../Context/GameContext';
import { Theme } from '../../Types/Theme';
import './style.css';
import { Difficulty } from '../../Types/Difficulty';

interface GeneralSettingsModalProps {
    onClose: () => void;
}

const GeneralSettingsModal: React.FC<GeneralSettingsModalProps> = ({ onClose }) => {
    const { setTheme, difficulty, theme, setDifficulty, setScore } = useGameContext();
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(theme);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulty);

    const difficulties: Difficulty[] = [
        Difficulty.Facil,
        Difficulty.Normal,
        Difficulty.Dificil,
        Difficulty.Insano,
    ];
    const themes: Theme[] = [
        Theme.TaylorSwift,
        Theme.Bzrp,
        Theme.Duki,
        Theme.MariaBecerra,
        Theme.YSYA,
        Theme.Tini,
        Theme.NickiNicole,
        Theme.Wos,
        Theme.Louta,
        Theme.Trueno,
        Theme.Lali,
        Theme.AbelPintos,
        Theme.Cerati,
        Theme.SodaStereo,
        Theme.LosRedondos,
        Theme.LaRenga,
        Theme.CharlyGarcia,
        Theme.Iorio,
        Theme.CristianCastro,
        Theme.DuaLipa
    ].sort((a, b) => a.localeCompare(b));
    const handleSetDifficulty = (difficulty: Difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleSetTheme = (theme: Theme) => {
        setSelectedTheme(theme);
    };

    const handleSaveTheme = () => {
        if (selectedTheme) {
            setTheme(selectedTheme);
            setDifficulty(selectedDifficulty);
            setScore(0);
            onClose();
        }
    };

    function handleCloseBtn() {
        if (theme) {
            onClose();
        }
    }

    return (
        <div className="modal-background">
            <h3 className='config-title'>Configuración</h3>
            <div className="general-settings-modal">
                <div className="theme-container-text">
                    <h2 className='label-config'>Género</h2>
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
                </div>
                <div className='difficulty-section'>
                    <div>
                        <h2 className='label-config'>Duración</h2>
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
                                        <span className='star' key={i}>⭐️</span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="button-container">
                    <button className="close-button" onClick={handleCloseBtn}>Cerrar</button>
                    <button className="save-button" onClick={handleSaveTheme}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettingsModal;