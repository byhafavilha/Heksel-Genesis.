import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   🎨 Theme Toggle FAB
   Dark (Cosmic) ↔ Light (Ultra Professional White)
   Click 🎨 to switch. Holds state in <html> class.
───────────────────────────────────────────── */

type Theme = 'dark' | 'light';

export function ThemeToggleFAB() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light', 'secret');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setToastMsg(
      next === 'light'
        ? '☀️ Ultra Professional White'
        : '🌌 Cosmic Dark Mode'
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const isDark = theme === 'dark';

  return (
    <>
      {/* FAB button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: isDark
            ? 'rgba(14,14,28,0.75)'
            : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(14px)',
          border: isDark
            ? '1.5px solid rgba(180,94,255,0.4)'
            : '1.5px solid rgba(120,80,220,0.3)',
          boxShadow: isDark
            ? '0 0 20px rgba(180,94,255,0.25), 0 4px 16px rgba(0,0,0,0.4)'
            : '0 0 20px rgba(120,80,220,0.18), 0 4px 16px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.45rem',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'background 0.4s, border 0.4s, box-shadow 0.4s',
        }}
        aria-label={isDark ? 'Switch to White mode' : 'Switch to Dark mode'}
        title={isDark ? 'Switch to Ultra Professional White' : 'Switch to Cosmic Dark'}
      >
        🎨
      </motion.button>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="theme-toast"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '1.5rem',
              zIndex: 101,
              background: isDark
                ? 'rgba(14,14,28,0.9)'
                : 'rgba(255,255,255,0.95)',
              border: isDark
                ? '1px solid rgba(180,94,255,0.45)'
                : '1px solid rgba(120,80,220,0.3)',
              color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(30,20,60,0.85)',
              padding: '10px 18px',
              borderRadius: 12,
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark
                ? '0 0 18px rgba(180,94,255,0.15)'
                : '0 4px 24px rgba(0,0,0,0.1)',
              whiteSpace: 'nowrap',
            }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
