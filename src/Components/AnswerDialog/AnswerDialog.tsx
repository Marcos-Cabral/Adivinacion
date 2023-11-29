import React from 'react';
import ResultMessage from '../ResultMessage/ResultMessage';
import { useGameContext } from '../../Context/GameContext';

export interface AnswerDialogProps {
    visible: boolean;
    title: string;
    guessed: boolean;
    reset: () => void;
}

const AnswerDialog: React.FC<AnswerDialogProps> = ({ guessed, visible, reset, title }) => {
    const { setTheme, resetOptions, setScore, score } = useGameContext();

    function backToMenu() {
        setTheme(null);
        resetOptions([]);
        setScore(0);
    }

    return (
        <div className='modal' style={{ display: visible ? 'flex' : 'none' }}>
            <div className='modal-content'>
                <ResultMessage guessed={guessed} title={title} />
                {!guessed &&
                    <>
                        <p>Acertaste {score} canciones 😅</p>
                        <div className='button-incorrect-container'>
                            <button onClick={reset} className='button-incorrect'>Reiniciar</button>
                            <button onClick={backToMenu} className='button-incorrect'>Volver al menú</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default AnswerDialog;