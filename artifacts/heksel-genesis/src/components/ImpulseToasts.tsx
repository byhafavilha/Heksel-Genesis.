import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SovereignEntry {
  id:      string;
  amount:  string;
  name:    string;
  message: string;
  ts:      number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_KEY = 'heksel_sovereign_echoes';

/** Hardcoded seed messages — always present in the rotation. */
const TOAST_SEEDS: SovereignEntry[] = [
  { id: 't-s1', amount: '€10',  name: 'Merly',   message: "I support LGBT! 🏳️‍🌈",                ts: 0 },
  { id: 't-s2', amount: '$25',  name: 'CyberSam', message: "Heksel to the moon! 🚀",              ts: 0 },
  { id: 't-s3', amount: '$100', name: 'Vixen_X',  message: "Long live independent fashion! 🌌",  ts: 0 },
];

// ─── Component ────────────────────────────────────────────────────────────────
interface ImpulseToastsProps {
  onOpenHelpUs: () => void;
}

export function ImpulseToasts({ onOpenHelpUs }: ImpulseToastsProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible,    setVisible]    = useState(false);

  /**
   * Ref holds the live pool so the recursive timer always reads the
   * latest entries without needing to restart the cycle.
   */
  const poolRef = useRef<SovereignEntry[]>(TOAST_SEEDS);

  // ── Build the pool on mount (localStorage real submissions + seeds) ──────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const stored: SovereignEntry[] = raw ? JSON.parse(raw) : [];
      // Real user submissions have ids starting with 'e-'
      const real = stored.filter(e => e.id.startsWith('e-'));
      // Mix: newest real submissions first, then seeds
      poolRef.current = [...real, ...TOAST_SEEDS];
    } catch {
      poolRef.current = TOAST_SEEDS;
    }
  }, []);

  // ── Cycling engine — starts once on mount ────────────────────────────────
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const showAt = (idx: number) => {
      setCurrentIdx(idx);
      setVisible(true);

      // Fade out after 5 s
      t1 = setTimeout(() => setVisible(false), 5000);

      // Next toast at 8 s (3 s after fade-out starts)
      t2 = setTimeout(() => {
        showAt((idx + 1) % poolRef.current.length);
      }, 8000);
    };

    // Small initial delay so the page finishes loading first
    const init = setTimeout(() => showAt(0), 2500);

    return () => {
      clearTimeout(init);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []); // intentionally runs once

  const entry = poolRef.current[currentIdx] ?? TOAST_SEEDS[0];

  return (
    /* Fixed container — bottom-left, above FAB layer */
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
            key={`${entry.id}-${currentIdx}`}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,   scale: 1     }}
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
              maxWidth:            '310px',
              padding:             '10px 14px',
              borderRadius:        '14px',
              background:          'rgba(7, 7, 15, 0.84)',
              backdropFilter:      'blur(18px)',
              WebkitBackdropFilter:'blur(18px)',
              border:              '1px solid rgba(180,94,255,0.7)',
              boxShadow:           '0 0 22px rgba(180,94,255,0.2), 0 6px 28px rgba(0,0,0,0.55)',
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
                🌌 New Supporter
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
                  {entry.amount}
                </span>
                {' — '}
                {entry.message}
                {' '}
                <span style={{ color: 'rgba(180,94,255,0.58)' }}>:{entry.name}</span>
                {' '}👤
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pulse dot with CSS-based ring animation ──────────────────────────────────
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
