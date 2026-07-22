import React, { useState, useMemo } from 'react';

// Ajuste o caminho abaixo para onde a logo estiver no seu projeto.
// Este arquivo assume que o PNG está na mesma pasta do componente.
import logoDefault from './5047b2b3-4101-4759-ada8-08b923614333.png';

type LogoState = {
  name: string;
  /** Gradiente CSS válido (nunca "transparent"/null — ver nota abaixo) */
  background: string;
};

// Gradientes de cada bandeira, extraídos em constantes para reaproveitar
// o mesmo valor no estado "original" (ver comentário no array STATES).
const LGBT_GRADIENT =
  'linear-gradient(180deg, #E40303 0%, #FF8C00 20%, #FFED00 40%, #008026 60%, #004DFF 80%, #750787 100%)';
const TRANS_GRADIENT =
  'linear-gradient(180deg, #5BCEFA 0%, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%, #F5A9B8 80%, #5BCEFA 80%, #5BCEFA 100%)';
const ARMENIA_GRADIENT =
  'linear-gradient(180deg, #D90012 0%, #D90012 33.33%, #0033A0 33.33%, #0033A0 66.66%, #F2A800 66.66%, #F2A800 100%)';
const NONBINARY_GRADIENT =
  'linear-gradient(180deg, #FCF434 0%, #FCF434 25%, #FFFFFF 25%, #FFFFFF 50%, #9C59D1 50%, #9C59D1 75%, #2C2C2C 75%, #2C2C2C 100%)';

// Ordem exata do ciclo de cliques.
// O estado "original" reaproveita o gradiente do LGBT+ como valor "dummy":
// como a opacidade dele fica em 0 nesse estado, essa cor nunca é vista.
// Isso evita que o background-image precise alternar entre "nenhuma imagem"
// e "um gradiente" — troca que o navegador às vezes não repinta direito
// quando combinada com mask-image, e era a causa da bandeira LGBT+ (o
// primeiro estado depois do original) não aparecer.
const STATES: LogoState[] = [
  { name: 'original', background: LGBT_GRADIENT },
  { name: 'lgbt', background: LGBT_GRADIENT },
  { name: 'trans', background: TRANS_GRADIENT },
  { name: 'armenia', background: ARMENIA_GRADIENT },
  { name: 'nonbinary', background: NONBINARY_GRADIENT },
];

interface InteractiveLogoProps {
  /** Import/caminho do PNG da logo (precisa ter fundo transparente) */
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

  // O mask-image usa o CANAL ALFA do PNG, não a cor dele.
  // Onde o PNG é opaco (o traço ciano da logo) -> o background abaixo aparece.
  // Onde o PNG é transparente (fundo + os dois "buracos" do infinito) -> nada aparece.
  // Por isso a cor nunca vaza para um quadrado/retângulo: ela segue o contorno exato do desenho.
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

      {/* Camada 2: cor mascarada pelo formato exato do PNG — estados 1 a 4.
          backgroundImage NUNCA vira "none": só a opacidade muda pra mostrar/esconder. */}
      <div
        className="interactive-logo__mask"
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
