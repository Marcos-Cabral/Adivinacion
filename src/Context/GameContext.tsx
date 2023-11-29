import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme } from '../Types/Theme';
import { Difficulty } from '../Types/Difficulty';
import { Track } from '../Components/Game/Game';


interface GameContextType {
    difficulty: Difficulty;
    theme: Theme | null;
    setDifficulty: (level: Difficulty) => void;
    setTheme: (themes: Theme | null) => void;
    score: number;
    setScore: (score: number) => void;
    setOptions: (tracks: Track) => void;
    options: Track[];
    resetOptions: (array: Track[]) => void;
}

const initialDifficulty = Difficulty.Normal;
const initialScore = 0;

const GameContext = createContext<GameContextType>({
    difficulty: initialDifficulty,
    theme: null,
    setDifficulty: () => { },
    setTheme: () => { },
    score: initialScore,
    setScore: () => { },
    options: [],
    setOptions: () => { },
    resetOptions: (array: Track[]) => { },
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
    const [theme, setTheme] = useState<Theme | null>(null);
    const [score, setScore] = useState<number>(initialScore);
    const [options, setOptions] = useState<Track[]>([]);

    const handleSetDifficulty = (level: Difficulty) => {
        setDifficulty(level);
    };

    const handleSetTheme = (theme: Theme | null) => {
        setTheme(theme);
    };

    const handleSetOptions = (track: Track) => {
        setOptions(prevOptions => [...prevOptions, track]);
    };

    const resetOptions = (array: Track[]) => {
        setOptions(array);
    };


    return (
        <GameContext.Provider
            value={{
                difficulty,
                theme,
                setDifficulty: handleSetDifficulty,
                setTheme: handleSetTheme,
                score,
                setScore,
                options,
                setOptions: handleSetOptions,
                resetOptions
            }}
        >
            {children}
        </GameContext.Provider>
    );
};