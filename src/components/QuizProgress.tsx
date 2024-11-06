import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizProgressProps {
  totalQuestions: number;
  currentQuestion: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  totalQuestions,
  currentQuestion,
  correctAnswers,
  wrongAnswers,
}) => {
  const remainingQuestions = totalQuestions - (correctAnswers + wrongAnswers);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-bold text-lg">{correctAnswers}</span>
          </div>
          <p className="text-sm text-gray-400">Correct</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="font-bold text-lg">{wrongAnswers}</span>
          </div>
          <p className="text-sm text-gray-400">Wrong</p>
        </div>
        <div className="text-center">
          <div className="font-bold text-lg">{remainingQuestions}</div>
          <p className="text-sm text-gray-400">Remaining</p>
        </div>
      </div>
      <div className="mt-4 bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
};
export default QuizProgress;
