import React, { useState, useMemo } from 'react';

// A logo vive em /public — acesso via BASE_URL em vez de import direto.
const logoDefault = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/heksel-brand-icon.png`;

type LogoState = {
  name: string;
  /** null = estado original (mostra o PNG normalmente, sem máscara) */
  background: string | null;
};

// Ordem exata do ciclo de cliques, com as cores oficiais de cada bandeira.
const STATES: LogoState[] = [
  { name: 'original', background: null },
  {
    // Estado 1 — LGBT+: gradiente suave do arco-íris
    name: 'lgbt',
    background:
      'linear-gradient(180deg, #E40303 0%, #FF8C00 20%, #FFED00 40%, #008026 60%, #004DFF 80%, #750787 100%)',
  },
  {
    // Estado 2 — Transgênero: azul claro, rosa, branco, rosa, azul claro
    name: 'trans',
    background:
      'linear-gradient(180deg, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%, #F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)',
  },
  {
    // Estado 3 — Armênia: vermelho, azul, laranja (faixas proporcionais)
    name: 'armenia',
    background:
      'linear-gradient(180deg, #D90012 0%, #D90012 33.33%, #0033A0 33.33%, #0033A0 66.66%, #F2A800 66.66%, #F2A800 100%)',
  },
  {
    // Estado 4 — Não-binário: amarelo, branco, roxo, preto
    name: 'nonbinary',
    background:
      'linear-gradient(180deg, #FCF434 0%, #FCF434 25%, #FFFFFF 25%, #FFFFFF 50%, #9C59D1 50%, #9C59D1 75%, #2C2C2C 75%, #2C2C2C 100%)',
  },
  // O próximo clique depois deste volta ao índice 0 (original) automaticamente.
];

interface InteractiveLogoProps {
  /** Caminho/URL do PNG da logo (precisa ter fundo transparente) */
  logoSrc?: string;
  /** Tamanho do lado do componente, em px */
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
      aria-label="Logo interativa. Clique para trocar de cor."
      style={{
        position: 'relative',
        width: size,
        height: size,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .interactive-logo__original,
          .interactive-logo__mask {
            transition: none !important;
          }
        }
      `}</style>

      {/* Camada 1: PNG original — visível apenas no estado 0 */}
      <img
        src={logoSrc}
        alt="Logo"
        draggable={false}
        className="interactive-logo__original"
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

      {/* Camada 2: cor mascarada pelo formato exato do PNG — estados 1 a 4 */}
      <div
        className="interactive-logo__mask"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: current.background ?? 'transparent',
          opacity: isOriginal ? 0 : 1,
          transition: 'background 0.5s ease, opacity 0.5s ease',
          pointerEvents: 'none',
          ...maskStyle,
        }}
      />
    </div>
  );
}
