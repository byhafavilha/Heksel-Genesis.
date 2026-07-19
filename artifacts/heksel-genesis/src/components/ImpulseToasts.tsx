import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SovereignEntry {
  id:      string;
  amount:  string;
  name:    string;
  message: string;
  ts:      number;
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ImpulseToastsProps {
  /** When set/changed, shows a toast for this entry. Triggered by real user action only. */
  triggerEntry?: SovereignEntry | null;
  onOpenHelpUs: () => void;
}

export function ImpulseToasts({ triggerEntry, onOpenHelpUs }: ImpulseToastsProps) {
  const [entry,   setEntry]   = useState<SovereignEntry | null>(null);
  const [visible, setVisible] = useState(false);

  // Show toast whenever a new real entry arrives
  useEffect(() => {
    if (!triggerEntry) return;

    setEntry(triggerEntry);
    setVisible(true);

    const t = setTimeout(() => setVisible(false), 5500);
    return () => clearTimeout(t);
  }, [triggerEntry]);

  if (!entry) return null;

  return (
    /* Fixed container — bottom-left */
    <div
      aria-live="polite"
      style={{
        position:      'fixed',
        bottom:        '1.5rem',
        left:          '1rem',
        zIndex:        90,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.button
            key={entry.id}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{
              opacity:    0,
              y:         -6,
              scale:      0.97,
              transition: { duration: 0.55, ease: 'easeOut' },
            }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            onClick={onOpenHelpUs}
            style={{
              pointerEvents:       'auto',
              cursor:              'pointer',
              display:             'flex',
              alignItems:          'center',
              gap:                 '10px',
              maxWidth:            '320px',
              padding:             '10px 14px',
              borderRadius:        '14px',
              background:          'rgba(7, 7, 15, 0.88)',
              backdropFilter:      'blur(18px)',
              WebkitBackdropFilter:'blur(18px)',
              border:              '1px solid rgba(180,94,255,0.75)',
              boxShadow:           '0 0 24px rgba(180,94,255,0.25), 0 6px 28px rgba(0,0,0,0.55)',
              textAlign:           'left',
            }}
          >
            {/* Live pulse dot */}
            <PulseDot />

            {/* Text */}
            <div>
              <div
                style={{
                  fontFamily:    "'Space Mono', monospace",
                  fontSize:      '0.58rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.35)',
                  marginBottom:  '3px',
                }}
              >
                🌌 New Believer
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize:   '0.72rem',
                  lineHeight: 1.45,
                  color:      'rgba(255,255,255,0.85)',
                }}
              >
                <span style={{ color: 'rgba(180,94,255,0.98)', fontWeight: 700 }}>
                  ${entry.amount}
                </span>
                {' — '}
                {entry.message}
                {' '}
                <span style={{ color: 'rgba(180,94,255,0.6)' }}>:{entry.name}</span>
                {' '}👤
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pulse dot with ring animation ────────────────────────────────────────────
function PulseDot() {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 10, height: 10 }}>
      {/* Ring */}
      <motion.div
        animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position:     'absolute',
          inset:        0,
          borderRadius: '50%',
          background:   'rgba(180,94,255,0.5)',
        }}
      />
      {/* Core */}
      <div
        style={{
          position:     'absolute',
          inset:        1,
          borderRadius: '50%',
          background:   'rgba(180,94,255,1)',
          boxShadow:    '0 0 8px rgba(180,94,255,0.9)',
        }}
      />
    </div>
  );
}
