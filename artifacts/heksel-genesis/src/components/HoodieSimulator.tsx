import { useState } from 'react';

/* ─────────────────────────────────────────────────────
   CREATING MY BRAND — Hoodie Color Simulator
   
   • 5 base hoodie models (thumbnails + big preview)
   • 6 neon color swatches
   • CSS mix-blend-mode overlay simulates how the brand
     identity looks on each fabric/style
   • Fully responsive, dark Heksel design system
───────────────────────────────────────────────────── */

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const MODELS = [
  {
    id: 'winter',
    label: 'Winter Core',
    tag: 'MEO-NAI · Inverno',
    img: `${base}/moletom-winter.png`,
    desc: 'Tecido pesado oversized — identidade forte no frio.',
  },
  {
    id: 'casual',
    label: 'Casual Drop',
    tag: 'MEO-NAI · Casual',
    img: `${base}/moletom-casual.png`,
    desc: 'Corte limpo para uso diário — versátil e marcante.',
  },
  {
    id: 'sports',
    label: 'Esportivo Core',
    tag: 'MEO-NAI · Sports',
    img: `${base}/moletom-sports.png`,
    desc: 'Listras neon nas mangas — movimento com identidade.',
  },
  {
    id: 'fashion',
    label: 'Fashion Cyber',
    tag: 'MEO-NAI · Fashion',
    img: `${base}/moletom-fashion.png`,
    desc: 'Silhueta moda cyber — sua marca no streetwear premium.',
  },
  {
    id: 'special',
    label: 'Special Drop',
    tag: 'MEO-NAI · Special',
    img: `${base}/moletom-special.png`,
    desc: 'Edição limitada — máxima expressão da identidade Heksel.',
  },
];

const COLORS = [
  { id: 'purple',  label: 'Ultravioleta',  hex: '#b45eff', glow: 'rgba(180,94,255,0.55)',  border: 'rgba(180,94,255,0.8)',  blend: 'rgba(140,50,255,0.45)' },
  { id: 'cyan',    label: 'Cyber Cyan',    hex: '#00f0ff', glow: 'rgba(0,240,255,0.55)',   border: 'rgba(0,240,255,0.9)',   blend: 'rgba(0,200,255,0.40)' },
  { id: 'gold',    label: 'Imperial Gold', hex: '#c9a84c', glow: 'rgba(201,168,76,0.55)',  border: 'rgba(201,168,76,0.9)',  blend: 'rgba(201,168,76,0.40)' },
  { id: 'black',   label: 'Void Black',    hex: '#0a0a12', glow: 'rgba(80,80,120,0.4)',    border: 'rgba(255,255,255,0.3)', blend: 'rgba(10,10,20,0.55)'  },
  { id: 'red',     label: 'Crimson',       hex: '#ff2d55', glow: 'rgba(255,45,85,0.55)',   border: 'rgba(255,45,85,0.9)',   blend: 'rgba(220,30,60,0.42)' },
  { id: 'pink',    label: 'Neo Rose',      hex: '#ff6ec7', glow: 'rgba(255,110,199,0.55)', border: 'rgba(255,110,199,0.9)', blend: 'rgba(255,100,180,0.42)'},
];

export function HoodieSimulator() {
  const [activeModel, setActiveModel] = useState(MODELS[0]);
  const [activeColor, setActiveColor] = useState<typeof COLORS[0] | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleModelChange = (model: typeof MODELS[0]) => {
    setActiveModel(model);
    setImgLoaded(false);
  };

  return (
    <section id="create" style={{
      padding: '120px 0 100px',
      background: 'linear-gradient(180deg, rgba(10,10,18,0.98) 0%, rgba(26,11,46,0.95) 100%)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Background grid noise */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(180,94,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180,94,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-tag">⚡ Simulador de Identidade</span>
          <h2 className="section-title">
            Creating My<br />
            <span className="glow-text">Brand.</span>
          </h2>
          <p className="section-sub" style={{ maxWidth: 560, margin: '0 auto' }}>
            Escolha o modelo base, selecione a sua cor de identidade e veja como a Heksel vai materializar a sua marca no tecido.
          </p>
        </div>

        {/* Main layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
          gap: 48,
          alignItems: 'start',
        }}
          className="sim-grid"
        >

          {/* Left: Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

            {/* Model picker */}
            <div>
              <p style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.6rem',
                letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', marginBottom: 16,
              }}>
                01 — Selecione o Modelo Base
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {MODELS.map(model => {
                  const isActive = model.id === activeModel.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => handleModelChange(model)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        padding: '12px 16px', borderRadius: 14,
                        background: isActive ? 'rgba(180,94,255,0.12)' : 'rgba(255,255,255,0.03)',
                        border: isActive
                          ? '1.5px solid rgba(180,94,255,0.6)'
                          : '1px solid rgba(255,255,255,0.07)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'left',
                        boxShadow: isActive ? '0 0 20px rgba(180,94,255,0.15)' : 'none',
                      }}
                    >
                      {/* Thumb */}
                      <div style={{
                        width: 52, height: 52, borderRadius: 10, overflow: 'hidden',
                        background: 'rgba(0,0,0,0.3)', flexShrink: 0,
                        border: isActive ? '1px solid rgba(180,94,255,0.4)' : '1px solid rgba(255,255,255,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <img
                          src={model.img} alt={model.label}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div>
                        <div style={{
                          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '0.82rem',
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                          marginBottom: 2,
                        }}>
                          {model.label}
                        </div>
                        <div style={{
                          fontFamily: "'Space Mono',monospace", fontSize: '0.55rem',
                          color: isActive ? 'rgba(180,94,255,0.9)' : 'rgba(255,255,255,0.25)',
                          letterSpacing: '0.12em', textTransform: 'uppercase',
                        }}>
                          {model.tag}
                        </div>
                      </div>
                      {isActive && (
                        <div style={{ marginLeft: 'auto', color: 'rgba(180,94,255,0.9)', fontSize: '0.8rem' }}>✦</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color picker */}
            <div>
              <p style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.6rem',
                letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', marginBottom: 16,
              }}>
                02 — Identidade Visual (Cor da Marca)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {COLORS.map(color => {
                  const isActive = activeColor?.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setActiveColor(isActive ? null : color)}
                      title={color.label}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: color.hex,
                        boxShadow: isActive
                          ? `0 0 0 3px rgba(255,255,255,0.9), 0 0 18px ${color.glow}, 0 0 36px ${color.glow}`
                          : `0 0 0 2px rgba(255,255,255,0.12), 0 0 8px ${color.glow}`,
                        transition: 'all 0.3s ease',
                        transform: isActive ? 'scale(1.18)' : 'scale(1)',
                        border: `2px solid ${isActive ? color.border : 'rgba(255,255,255,0.1)'}`,
                      }} />
                      <span style={{
                        fontFamily: "'Space Mono',monospace", fontSize: '0.48rem',
                        color: isActive ? color.hex : 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        transition: 'color 0.3s',
                        textShadow: isActive ? `0 0 10px ${color.glow}` : 'none',
                      }}>
                        {color.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* "Sem cor" reset */}
              {activeColor && (
                <button
                  onClick={() => setActiveColor(null)}
                  style={{
                    marginTop: 12, background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.35)', fontSize: '0.62rem', fontFamily: "'Space Mono',monospace",
                    letterSpacing: '0.1em', padding: '6px 14px', borderRadius: 50, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  ✕ Limpar seleção
                </button>
              )}
            </div>

            {/* Feedback card */}
            {activeColor && (
              <div style={{
                padding: '20px 24px', borderRadius: 16,
                background: 'rgba(14,14,24,0.8)',
                border: `1.5px solid ${activeColor.border.replace('0.9)', '0.4)')}`,
                boxShadow: `0 0 24px ${activeColor.glow.replace('0.55)', '0.15)')}`,
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginBottom: 8,
                }}>
                  Prévia da Identidade
                </div>
                <div style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.1rem',
                  color: activeColor.hex,
                  textShadow: `0 0 16px ${activeColor.glow}`,
                  marginBottom: 4,
                }}>
                  {activeColor.label}
                </div>
                <div style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.55)', lineHeight: 1.6,
                }}>
                  {activeModel.desc}
                </div>
                <div style={{
                  marginTop: 14, padding: '8px 14px', borderRadius: 8,
                  background: `${activeColor.hex}18`,
                  border: `1px solid ${activeColor.hex}44`,
                  fontFamily: "'Space Mono',monospace", fontSize: '0.58rem',
                  color: activeColor.hex, letterSpacing: '0.1em',
                }}>
                  ⚡ {activeModel.label} × {activeColor.label} — sua marca no tecido
                </div>
              </div>
            )}
          </div>

          {/* Right: Big preview */}
          <div style={{ position: 'sticky', top: 96 }}>
            <div style={{
              background: 'rgba(14,14,22,0.7)', backdropFilter: 'blur(24px)',
              border: activeColor
                ? `1.5px solid ${activeColor.border.replace('0.9)', '0.5)')}`
                : '1px solid rgba(255,255,255,0.07)',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: activeColor
                ? `0 0 60px ${activeColor.glow.replace('0.55)', '0.2)')}, 0 0 120px ${activeColor.glow.replace('0.55)', '0.08)')}`
                : '0 0 40px rgba(0,0,0,0.4)',
              transition: 'all 0.5s ease',
              minHeight: 520,
              display: 'flex', flexDirection: 'column',
            }}>

              {/* Top label */}
              <div style={{
                padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '0.95rem',
                    color: activeColor ? activeColor.hex : 'white',
                    textShadow: activeColor ? `0 0 12px ${activeColor.glow}` : 'none',
                    transition: 'all 0.4s',
                  }}>
                    {activeModel.label}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono',monospace", fontSize: '0.55rem',
                    color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em',
                    textTransform: 'uppercase', marginTop: 3,
                  }}>
                    {activeModel.tag}
                  </div>
                </div>
                {activeColor && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 12px', borderRadius: 50,
                    background: `${activeColor.hex}18`,
                    border: `1px solid ${activeColor.hex}44`,
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: activeColor.hex,
                      boxShadow: `0 0 8px ${activeColor.glow}`,
                    }} />
                    <span style={{
                      fontFamily: "'Space Mono',monospace", fontSize: '0.55rem',
                      color: activeColor.hex, letterSpacing: '0.1em',
                    }}>
                      {activeColor.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Image + color overlay */}
              <div style={{
                flex: 1, position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '32px', minHeight: 380,
                background: activeColor
                  ? `radial-gradient(ellipse 70% 60% at 50% 50%, ${activeColor.hex}10, transparent 70%)`
                  : 'transparent',
                transition: 'background 0.5s ease',
              }}>
                {/* Hoodie image */}
                <img
                  key={activeModel.id}
                  src={activeModel.img}
                  alt={activeModel.label}
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    maxWidth: '88%', maxHeight: 420, objectFit: 'contain',
                    display: 'block', margin: '0 auto',
                    filter: activeColor
                      ? `drop-shadow(0 0 20px ${activeColor.glow}) drop-shadow(0 0 40px ${activeColor.glow.replace('0.55)', '0.3)')})`
                      : 'drop-shadow(0 0 12px rgba(180,94,255,0.2))',
                    transition: 'filter 0.5s ease, opacity 0.3s',
                    opacity: imgLoaded ? 1 : 0,
                    position: 'relative', zIndex: 1,
                  }}
                />

                {/* Color blend overlay on top of image */}
                {activeColor && imgLoaded && (
                  <div style={{
                    position: 'absolute', inset: '32px',
                    background: activeColor.blend,
                    mixBlendMode: activeColor.id === 'black' ? 'multiply' : 'color',
                    borderRadius: 12,
                    pointerEvents: 'none',
                    transition: 'background 0.4s ease',
                    zIndex: 2,
                  }} />
                )}

                {/* Loading placeholder */}
                {!imgLoaded && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Mono',monospace", fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em',
                  }}>
                    LOADING...
                  </div>
                )}
              </div>

              {/* Bottom strip */}
              <div style={{
                padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em',
                }}>
                  {activeColor ? '✦ IDENTIDADE APLICADA' : '⬅ SELECIONE UMA COR'}
                </span>
                <span style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '0.55rem',
                  color: activeColor ? activeColor.hex : 'rgba(255,255,255,0.15)',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  textShadow: activeColor ? `0 0 10px ${activeColor.glow}` : 'none',
                  transition: 'all 0.4s',
                }}>
                  {activeColor ? `${activeColor.label} PREVIEW` : 'HEKSEL GENESIS'}
                </span>
              </div>
            </div>

            {/* CTA below preview */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                className="btn-order"
                style={{ maxWidth: 420, fontSize: '0.68rem' }}
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ✦ QUERO CRIAR A MINHA MARCA ✦
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 800px) {
          .sim-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
