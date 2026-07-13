import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggleFAB() {
  const [clicks, setClicks] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light' | 'secret'>('dark');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (clicks === 3) {
      setTheme('secret');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setClicks(0); // reset
    } else {
      const timer = setTimeout(() => setClicks(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clicks]);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light', 'secret');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleNormal = () => {
    setClicks(prev => prev + 1);
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('dark'); // escape secret mode via normal click
  };

  return (
    <>
      <button 
        onClick={toggleNormal}
        className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center z-50 text-white hover:bg-white/10 hover:scale-110 transition-all shadow-lg"
      >
        <Palette className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg font-mono text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md"
          >
            🌈 SECRET MODE ACTIVATED!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
