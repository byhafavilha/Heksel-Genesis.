import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   SEÇÃO 2 — "From beginning to infinity"
   Declaração visual autônoma entre SafeSpace e Manifesto.
   Herda a mesma DNA tipográfica do Hero:
   · font-family: Syne (display), Space Mono (mono)
   · text-transform: uppercase
   · letter-spacing: tight / widest
   · tamanho imponente
───────────────────────────────────────────── */

export function BeginningToInfinity() {
  const lineRef = useRef<HTMLDivElement>(null);

  /* Parallax sutil na linha de separação */
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const pct = 1 - rect.top / window.innerHeight;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0.1, pct))})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="from-beginning"
      style={{
        position: 'relative',
        padding: '120px 0 100px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 0,
      }}
    >
      {/* ── Background accent glows ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700,
          background: 'radial-gradient(ellipse, rgba(180,94,255,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: '30vw', height: '30vw',
          background: 'radial-gradient(ellipse, rgba(0,240,255,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* ── Micro-tag ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.58rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'var(--bti-tag, rgba(0,240,255,0.6))',
        marginBottom: 28,
      }}>
        ✦ HEKSEL GENESIS · MANIFESTO ✦
      </div>

      {/* ── Main headline ── */}
      <h2
        className="bti-headline"
        style={{
          position: 'relative', zIndex: 1,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          margin: 0,
          padding: '0 16px',
        }}
      >
        <span style={{
          display: 'block',
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}>
          From beginning
        </span>
        <span style={{
          display: 'block',
          background: 'linear-gradient(90deg, #00f0ff 0%, #b45eff 50%, #ff6ec7 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          backgroundSize: '200% auto',
          animation: 'btiGradientShift 4s ease infinite',
        }}>
          to infinity
        </span>
      </h2>

      {/* ── Divider line ── */}
      <div
        ref={lineRef}
        style={{
          position: 'relative', zIndex: 1,
          width: '60vw', maxWidth: 420, height: 1,
          marginTop: 52, marginBottom: 40,
          background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.5), rgba(180,94,255,0.5), transparent)',
          transformOrigin: 'center',
          transition: 'transform 0.1s linear',
        }}
      />

      {/* ── Sub-copy ── */}
      <p style={{
        position: 'relative', zIndex: 1,
        fontFamily: "'Space Mono', monospace",
        fontSize: 'clamp(0.6rem, 1.4vw, 0.78rem)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--bti-sub, rgba(255,255,255,0.35))',
        maxWidth: 480,
        lineHeight: 2,
        margin: 0,
        padding: '0 24px',
      }}>
        Cyber-luxury fashion engineered<br />
        from Brazil to the metaverse.
      </p>

      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes btiGradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Light mode overrides */
        html.light #from-beginning .bti-headline span:first-child {
          background: linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        html.light #from-beginning {
          --bti-tag: rgba(110,58,180,0.8);
          --bti-sub: rgba(30,20,60,0.5);
        }
      `}</style>
    </section>
  );
}
