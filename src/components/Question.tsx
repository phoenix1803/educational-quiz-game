import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { ArrowRight } from 'lucide-react';

interface QuestionProps {
  question: {
    id: number;
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { submitAnswer } = useQuiz();

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    submitAnswer(selectedAnswer === question.correct);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
      
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedAnswer === null
                ? 'bg-gray-800 hover:bg-gray-700'
                : selectedAnswer === index
                ? index === question.correct
                  ? 'bg-green-600'
                  : 'bg-red-600'
                : index === question.correct && showExplanation
                ? 'bg-green-600'
                : 'bg-gray-800'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <div className="p-4 bg-gray-800 rounded-lg mb-4">
            <p className="text-gray-300">{question.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <span>Next Question</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Question;