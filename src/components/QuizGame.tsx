import React, { useState } from 'react';
import { Brain, Trophy } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useSound } from '../context/SoundContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Question from './Question';
import Score from './Score';
import CategorySelect from './CategorySelect';
import QuizProgress from './QuizProgress';
import Timer from './Timer';
import Login from './Login';

const QuizGame = () => {
  const { gameState, currentQuestion, score, startQuiz, questionStats, totalQuestions } = useQuiz();
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Login />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      
      <main className="mt-8">
        {gameState === 'menu' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                BrainQuest
              </h1>
              <p className="text-gray-400">Challenge your knowledge across multiple subjects</p>
            </div>
            <CategorySelect onStart={startQuiz} />
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Timer duration={30} onTimeUp={() => submitAnswer(false)} />
              <Score score={score} />
            </div>
            <QuizProgress
              totalQuestions={totalQuestions}
              currentQuestion={questionStats.current}
              correctAnswers={questionStats.correct}
              wrongAnswers={questionStats.wrong}
            />
            <Question question={currentQuestion} />
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center space-y-6">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            <h2 className="text-3xl font-bold">Quiz Complete!</h2>
            <div className="space-y-2">
              <p className="text-xl">Final Score: {score}</p>
              <p className="text-gray-400">
                Correct Answers: {questionStats.correct} / {totalQuestions}
              </p>
            </div>
            <button
              onClick={() => startQuiz()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizGame;