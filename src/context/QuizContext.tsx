import React, { createContext, useContext, useState } from 'react';
import { useSound } from './SoundContext';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Record<string, Question[]> = {
  science: [
    {
      id: 1,
      text: "What is the closest planet to the Sun?",
      options: ["Venus", "Mercury", "Mars", "Earth"],
      correct: 1,
      explanation: "Mercury is the closest planet to the Sun, orbiting at an average distance of about 57.9 million kilometers."
    },
    {
      id: 2,
      text: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correct: 1,
      explanation: "Au (from the Latin 'aurum') is the chemical symbol for gold."
    },
    {
      id: 3,
      text: "Which of these is not a state of matter?",
      options: ["Plasma", "Energy", "Gas", "Solid"],
      correct: 1,
      explanation: "Energy is not a state of matter. The four states of matter are solid, liquid, gas, and plasma."
    }
  ],
  history: [
    {
      id: 1,
      text: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2,
      explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in August."
    },
    {
      id: 2,
      text: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
      correct: 2,
      explanation: "George Washington was the first President of the United States, serving from 1789 to 1797."
    },
    {
      id: 3,
      text: "Which empire was ruled by the Aztecs?",
      options: ["Mexican", "Incan", "Mayan", "Roman"],
      correct: 0,
      explanation: "The Aztec Empire was centered in modern-day Mexico and ruled from 1428 until 1521."
    }
  ],
  math: [
    {
      id: 1,
      text: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correct: 2,
      explanation: "The square root of 144 is 12, because 12 × 12 = 144."
    },
    {
      id: 2,
      text: "What is 15% of 200?",
      options: ["20", "30", "25", "35"],
      correct: 1,
      explanation: "15% of 200 is calculated as (15/100) × 200 = 30"
    },
    {
      id: 3,
      text: "What is the value of π (pi) to two decimal places?",
      options: ["3.14", "3.41", "3.12", "3.16"],
      correct: 0,
      explanation: "The value of π (pi) to two decimal places is 3.14."
    }
  ]
};

type GameState = 'menu' | 'playing' | 'finished';

interface QuizContextType {
  gameState: GameState;
  currentQuestion: Question | null;
  score: number;
  questionStats: {
    current: number;
    total: number;
    correct: number;
    wrong: number;
  };
  totalQuestions: number;
  startQuiz: (category: string) => void;
  submitAnswer: (correct: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [category, setCategory] = useState<string>('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0,
  });
  const { playSound } = useSound();

  const currentQuestion = category && questions[category]?.[questionIndex] || null;
  const totalQuestions = category ? questions[category]?.length || 0 : 0;

  const startQuiz = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setQuestionIndex(0);
    setScore(0);
    setStats({ correct: 0, wrong: 0 });
    setGameState('playing');
  };

  const submitAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 100);
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      playSound('correct');
    } else {
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      playSound('wrong');
    }

    setTimeout(() => {
      if (questionIndex + 1 < (questions[category]?.length || 0)) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setGameState('finished');
        playSound('complete');
      }
    }, 2000);
  };

  const questionStats = {
    current: questionIndex + 1,
    total: totalQuestions,
    correct: stats.correct,
    wrong: stats.wrong,
  };

  return (
    <QuizContext.Provider value={{
      gameState,
      currentQuestion,
      score,
      questionStats,
      totalQuestions,
      startQuiz,
      submitAnswer
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};