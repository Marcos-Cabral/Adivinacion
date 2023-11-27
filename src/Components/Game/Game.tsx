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
    const { theme, difficulty, setScore, score } = useGameContext();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [guessed, setGuessed] = useState<boolean>(false);
    const [gameState, setGameState] = useState<GameState>({
        options: [],
        correctOption: null,
    });

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const showModal = (guessed: boolean) => {
        setGuessed(guessed);
        setModalVisible(true);
        setScore(guessed ? score + 1 : 0);
    };

    const generateOptions = () => {
        const previousCorrectOption = gameState.correctOption;
        const previousOptions = gameState.options || [];
        const shuffledIndexes: number[] = [];
        while (shuffledIndexes.length < 3) {
            const newIndex: number = Math.floor(Math.random() * trackList[theme!].data.length);
            if(previousOptions.length && previousOptions[previousCorrectOption!].id == trackList[theme!].data[newIndex].id){
                continue;
            }

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
    }, [theme]);

    const playSong = () => {
        let duration = 0;

        switch (difficulty) {
            case 'Fácil':
                duration = 5;
                break;
            case 'Normal':
                duration = 3;
                break;
            case 'Difícil':
                duration = 1.5;
                break;
            case 'Insano':
                duration = 0.6;
                break;
            default:
                duration = 3; // Valor por defecto para la duración
                break;
        }
        if (audioRef.current) {
            audioRef.current.currentTime = 10;
            setIsPlaying(true);
            audioRef.current.play();
            audioRef.current.ontimeupdate = () => {
                if (audioRef.current && audioRef.current.currentTime >= duration + 10) {
                    setIsPlaying(false);
                    audioRef.current.pause();
                    audioRef.current.currentTime = 10;
                    audioRef.current.ontimeupdate = null; // Limpiar el event listener
                }
            };
        }
    };

    const handleOptionClick = (index: number) => {
        showModal(index === gameState.correctOption);
        setTimeout(() => {
            generateOptions();
            closeModal();
            setIsPlaying(false);
            if (audioRef.current) {
                audioRef.current.currentTime = 10;
                audioRef.current!.pause();
            }
        }, 1500);
    };

    const closeModal = () => {
        setModalVisible(false)
    };

    return (
        <>
            <Header onPlay={playSong} isPlaying={isPlaying} />
            <AnswerDialog visible={modalVisible} guessed={guessed} title={gameState?.options[gameState?.correctOption!]?.title} />
            <GameOptions audioRef={audioRef} gameState={gameState} onSelectOption={handleOptionClick} />
        </>
    );
};

export default Game;