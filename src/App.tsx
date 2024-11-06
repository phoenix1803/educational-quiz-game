import React from 'react';
import QuizGame from './components/QuizGame';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SoundProvider>
          <QuizProvider>
            <div className="min-h-screen bg-gray-950 text-gray-100 transition-colors duration-300">
              <QuizGame />
            </div>
          </QuizProvider>
        </SoundProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;