import React from 'react';
import { Moon, Sun, Volume2, VolumeX, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isSoundOn, toggleSound } = useSound();
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src={user?.avatar}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold">{user?.name}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSound}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label={isSoundOn ? 'Mute sound' : 'Unmute sound'}
        >
          {isSoundOn ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
        
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={logout}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400"
          aria-label="Log out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;