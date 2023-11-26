import React, { useEffect, useState, useRef } from 'react';
import GameOptions from '../GameOptions/GameOptions';
import AnswerDialog from '../AnswerDialog/AnswerDialog';
import Header from '../Header/Header';
import trackList from '../../tracklists.json';
import { useGameContext } from '../../Context/GameContext';

export interface GameState {
    options: Track[];
    correctOption: number | null;
}

export interface Track {
    title: string;
    preview: string;
    img: string;
    id: number;
}

const Game: React.FC = () => {
    const { theme, difficulty } = useGameContext();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [gameState, setGameState] = useState<GameState>({
        options: [],
        correctOption: null,
    });

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const generateOptions = () => {
        const shuffledIndexes: number[] = [];
        while (shuffledIndexes.length < 3) {
            const newIndex: number = Math.floor(Math.random() * trackList[theme!].data.length);
            if (!shuffledIndexes.includes(newIndex)) {
                shuffledIndexes.push(newIndex);
            }
        }

        const shuffledOptions: Track[] = shuffledIndexes.map(index => trackList[theme!].data[index]);
        const correctOptionIndex: number = Math.floor(Math.random() * shuffledIndexes.length);

        setGameState({
            options: shuffledOptions,
            correctOption: correctOptionIndex,
        });
    };

    useEffect(() => {
        generateOptions();
    }, []);

    const playSong = () => {
        let duration = 0;

        switch (difficulty) {
            case 'Fácil':
                duration = 5000;
                break;
            case 'Normal':
                duration = 2000;
                break;
            case 'Difícil':
                duration = 500;
                break;
            default:
                duration = 2000; // Por defecto, establecer la duración normal
                break;
        }
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setIsPlaying(true);
            audioRef.current.play();
            setTimeout(() => {
                setIsPlaying(false);
                audioRef.current!.pause();
            }, duration);
        } difficulty
    };

    const handleOptionClick = (index: number) => {
        if (index === gameState.correctOption) {
            showModal('¡Respuesta correcta!');
        } else {
            showModal('Respuesta incorrecta, era ' + gameState.options[gameState.correctOption!].title);
        }
        setTimeout(() => {
            generateOptions();
            closeModal();
        }, 1500);
    };

    const closeModal = () => {
        setModalVisible(false)
    };

    return (
        <>
            <Header onPlay={playSong} isPlaying={isPlaying} />
            <AnswerDialog visible={modalVisible} message={modalMessage} onClose={closeModal} />
            <GameOptions audioRef={audioRef} gameState={gameState} onSelectOption={handleOptionClick} />
        </>
    );
};

export default Game;