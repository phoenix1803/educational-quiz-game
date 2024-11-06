import React, { createContext, useContext, useState } from 'react';

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: (type: 'correct' | 'wrong' | 'complete') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => setIsSoundOn(!isSoundOn);

  const playSound = (type: 'correct' | 'wrong' | 'complete') => {
    if (!isSoundOn) return;

    const audio = new Audio();
    switch (type) {
      case 'correct':
        audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3';
        break;
      case 'wrong':
        audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3';
        break;
      case 'complete':
        audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3';
        break;
    }
    audio.play().catch(console.error);
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};