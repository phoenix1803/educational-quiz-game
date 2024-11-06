import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
      <Trophy className="w-5 h-5 text-yellow-400" />
      <span className="font-bold text-lg">{score}</span>
    </div>
  );
};

export default Score;