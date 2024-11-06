import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Book, Calculator } from 'lucide-react';

const categories = [
  { id: 'science', name: 'Science', icon: Beaker, color: 'from-blue-500 to-cyan-500' },
  { id: 'history', name: 'History', icon: Book, color: 'from-amber-500 to-red-500' },
  { id: 'math', name: 'Mathematics', icon: Calculator, color: 'from-green-500 to-emerald-500' },
];

interface CategorySelectProps {
  onStart: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onStart }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStart(category.id)}
          className={`p-6 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}
        >
          <category.icon className="w-12 h-12 mb-4 mx-auto" />
          <h3 className="text-xl font-bold">{category.name}</h3>
        </motion.button>
      ))}
    </div>
  );
};

export default CategorySelect;