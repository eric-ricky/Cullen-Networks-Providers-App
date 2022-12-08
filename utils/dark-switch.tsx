import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      {theme === 'dark' ? (
        <button
          onClick={() => setTheme('light')}
          className="text-gray-300 rounded-full outline-none focus:outline-none"
        >
          <span className="hidden sr-only">Light Mode</span>

          <SunIcon className="h-6" />
        </button>
      ) : (
        <button
          onClick={() => setTheme('dark')}
          className="text-gray-500 rounded-full outline-none focus:outline-none"
        >
          <span className="hidden sr-only">Dark Mode</span>
          <MoonIcon className="h-6" />
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
