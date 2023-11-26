import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme } from '../Types/Theme';
import { Difficulty } from '../Types/Difficulty';


interface GameContextType {
    difficulty: Difficulty;
    theme: Theme | null;
    setDifficulty: (level: Difficulty) => void;
    setTheme: (themes: Theme) => void;
}

const initialDifficulty: Difficulty = 'Normal';

const GameContext = createContext<GameContextType>({
    difficulty: initialDifficulty,
    theme: null,
    setDifficulty: () => { },
    setTheme: () => { },
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
    const [theme, setTheme] = useState<Theme | null>(null);

    const handleSetDifficulty = (level: Difficulty) => {
        setDifficulty(level);
    };

    const handleSetTheme = (theme: Theme) => {
        setTheme(theme);
    };

    return (
        <GameContext.Provider
            value={{
                difficulty,
                theme,
                setDifficulty: handleSetDifficulty,
                setTheme: handleSetTheme,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};