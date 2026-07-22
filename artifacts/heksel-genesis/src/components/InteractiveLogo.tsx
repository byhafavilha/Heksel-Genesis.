import React, { useState, useMemo } from 'react';

// Image lives in /public — accessed via BASE_URL instead of a direct import.
const logoDefault = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/heksel-brand-icon.png`;

type LogoState = {
  name: string;
  background: string;
};

const LGBT_GRADIENT =
  'linear-gradient(180deg, #E40303 0%, #FF8C00 20%, #FFED00 40%, #008026 60%, #004DFF 80%, #750787 100%)';
const TRANS_GRADIENT =
  'linear-gradient(180deg, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%, #F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)';
const ARMENIA_GRADIENT =
  'linear-gradient(180deg, #D90012 0%, #D90012 33.33%, #0033A0 33.33%, #0033A0 66.66%, #F2A800 66.66%, #F2A800 100%)';
const NONBINARY_GRADIENT =
  'linear-gradient(180deg, #FCF434 0%, #FCF434 25%, #FFFFFF 25%, #FFFFFF 50%, #9C59D1 50%, #9C59D1 75%, #2C2C2C 75%, #2C2C2C 100%)';

const STATES: LogoState[] = [
  { name: 'original', background: LGBT_GRADIENT },
  { name: 'lgbt',     background: LGBT_GRADIENT },
  { name: 'trans',    background: TRANS_GRADIENT },
  { name: 'armenia',  background: ARMENIA_GRADIENT },
  { name: 'nonbinary', background: NONBINARY_GRADIENT },
];

interface InteractiveLogoProps {
  logoSrc?: string;
  size?: number;
}

export default function InteractiveLogo({
  logoSrc = logoDefault,
  size = 220,
}: InteractiveLogoProps) {
  const [index, setIndex] = useState(0);
  const isOriginal = index === 0;
  const current = STATES[index];

  const cycle = () => setIndex((prev) => (prev + 1) % STATES.length);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycle();
    }
  };

  const maskStyle: React.CSSProperties = useMemo(
    () => ({
      WebkitMaskImage: `url(${logoSrc})`,
      maskImage: `url(${logoSrc})`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
    }),
    [logoSrc]
  );

  return (
    <div
      onClick={cycle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Interactive logo — click to cycle colours"
      style={{
        position: 'relative',
        width: size,
        height: size,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Layer 1: original PNG — visible only at index 0 */}
      <img
        src={logoSrc}
        alt="Logo"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: isOriginal ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />
      {/* Layer 2: gradient masked by PNG alpha — indices 1-4.
          backgroundImage is NEVER "none": only opacity toggles visibility,
          avoiding the browser repaint flicker on the first pride flag click. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: current.background,
          opacity: isOriginal ? 0 : 1,
          transition: 'background-image 0.5s ease, opacity 0.5s ease',
          pointerEvents: 'none',
          ...maskStyle,
        }}
      />
    </div>
  );
}
