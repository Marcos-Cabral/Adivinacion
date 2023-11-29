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
    const { theme, difficulty, setScore, score, setTheme, options, setOptions, resetOptions } = useGameContext();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [guessed, setGuessed] = useState<boolean>(false);
    const [gameState, setGameState] = useState<GameState>({
        options: [],
        correctOption: null,
    });
    const totalOptions = trackList[theme!].data.length;
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

        if (!options.length) {
            while (shuffledIndexes.length < 3) {
                const newIndex: number = Math.floor(Math.random() * trackList[theme!].data.length);
                if ((previousOptions.length &&
                    previousOptions[previousCorrectOption!].id == trackList[theme!].data[newIndex].id)) {
                    continue;
                }

                if (!shuffledIndexes.includes(newIndex)) {
                    shuffledIndexes.push(newIndex);
                }
            }

            const shuffledOptions: Track[] = shuffledIndexes.map(index => trackList[theme!].data[index]);
            const correctOptionIndex: number = Math.floor(Math.random() * shuffledIndexes.length);

            setOptions(shuffledOptions[correctOptionIndex]);
            setGameState({
                options: shuffledOptions,
                correctOption: correctOptionIndex,
            });
        } else {
            const usedOptions = options || [];
            const remainingOptions = trackList[theme!].data.filter(option => !usedOptions.some(used => used.id === option.id));

            const shuffledIndexes: number[] = [];

            while (shuffledIndexes.length < Math.min(remainingOptions.length, 3)) {
                const newIndex: number = Math.floor(Math.random() * remainingOptions.length);

                if (!shuffledIndexes.includes(newIndex)) {
                    shuffledIndexes.push(newIndex);
                }
            }

            const shuffledOptions: Track[] = shuffledIndexes.map(index => remainingOptions[index]);
            const correctOptionIndex: number = Math.floor(Math.random() * shuffledOptions.length);
            if (!shuffledOptions[correctOptionIndex]) {
                return;
            }
            setOptions(shuffledOptions[correctOptionIndex]);
            setGameState({
                options: shuffledOptions,
                correctOption: correctOptionIndex,
            });
        }

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
        var result = index === gameState.correctOption;
        if (result) {
            showModal(result);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.currentTime = 10;
                    audioRef.current!.pause();
                }
                if (options.length == totalOptions) {
                    setModalVisible(false);
                    resetOptions([]);
                    generateOptions();
                    setTheme(null);
                } else {
                    generateOptions();
                    closeModal();
                    setIsPlaying(false);
                }
            }, 1500);
        } else {
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.currentTime = 10;
                    audioRef.current!.pause();
                }
            }, 1500);
            setIsPlaying(false);
            setGuessed(false);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false)
    };

    const reset = async () => {
        setModalVisible(false);
        const shuffledIndexes: number[] = [];
        while (shuffledIndexes.length < 3) {
            const newIndex: number = Math.floor(Math.random() * trackList[theme!].data.length);
            if (!shuffledIndexes.includes(newIndex)) {
                shuffledIndexes.push(newIndex);
            }
        }
        const shuffledOptions: Track[] = shuffledIndexes.map(index => trackList[theme!].data[index]);
        const correctOptionIndex: number = Math.floor(Math.random() * shuffledIndexes.length);
        resetOptions([shuffledOptions[correctOptionIndex]]);
        setGameState({
            options: shuffledOptions,
            correctOption: correctOptionIndex,
        });
        setScore(0);
    };
    return (
        <>
            <Header onPlay={playSong} isPlaying={isPlaying} totalOptions={totalOptions} />
            <AnswerDialog reset={reset} visible={modalVisible} guessed={guessed} title={gameState?.options[gameState?.correctOption!]?.title} />
            <GameOptions audioRef={audioRef} gameState={gameState} onSelectOption={handleOptionClick} />
        </>
    );
};

export default Game;