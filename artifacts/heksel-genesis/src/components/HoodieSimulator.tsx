import { useState } from 'react';

/* ─────────────────────────────────────────────────────
   SEE AN INTERACTIVE EXAMPLE — Hoodie Color Simulator
   Layout: modelo-cards grandes em cima (scroll horizontal
   no mobile) + preview central com sobreposição de cor
───────────────────────────────────────────────────── */

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const MODELS = [
  {
    id: 'winter',
    label: 'MEO-NAI Classic',
    sub: 'Classic',
    img: `${base}/moletom-winter.png`,
    desc: 'Heavy oversized fabric — strong identity, built for the cold.',
  },
  {
    id: 'casual',
    label: 'MEO-NAI Street',
    sub: 'Street',
    img: `${base}/moletom-casual.png`,
    desc: 'Clean cut for daily wear — versatile and unmistakable.',
  },
  {
    id: 'sports',
    label: 'MEO-NAI Sport',
    sub: 'Sports',
    img: `${base}/moletom-sports.png`,
    desc: 'Movement meets identity — neon energy on every stitch.',
  },
  {
    id: 'fashion',
    label: 'MEO-NAI Cyber',
    sub: 'Fashion',
    img: `${base}/moletom-fashion.png`,
    desc: 'Cyber silhouette — your mark on premium streetwear.',
  },
  {
    id: 'special',
    label: 'MEO-NAI Limited',
    sub: 'Limited',
    img: `${base}/moletom-special.png`,
    desc: 'Limited drop — the ultimate expression of Heksel identity.',
  },
];

const COLORS = [
  { id: 'purple', label: 'Ultravioleta', hex: '#b45eff', glow: 'rgba(180,94,255,0.55)', border: 'rgba(180,94,255,0.9)', blend: 'rgba(140,50,255,0.45)' },
  { id: 'cyan',   label: 'Cyber Cyan',   hex: '#00f0ff', glow: 'rgba(0,240,255,0.55)',   border: 'rgba(0,240,255,0.9)',   blend: 'rgba(0,200,255,0.40)' },
  { id: 'gold',   label: 'Imperial Gold',hex: '#c9a84c', glow: 'rgba(201,168,76,0.55)',  border: 'rgba(201,168,76,0.9)',  blend: 'rgba(201,168,76,0.42)' },
  { id: 'black',  label: 'Void Black',   hex: '#6b7280', glow: 'rgba(80,80,120,0.4)',    border: 'rgba(255,255,255,0.3)', blend: 'rgba(10,10,20,0.58)'  },
  { id: 'red',    label: 'Crimson',      hex: '#ff2d55', glow: 'rgba(255,45,85,0.55)',   border: 'rgba(255,45,85,0.9)',   blend: 'rgba(220,30,60,0.42)' },
  { id: 'pink',   label: 'Neo Rose',     hex: '#ff6ec7', glow: 'rgba(255,110,199,0.55)', border: 'rgba(255,110,199,0.9)', blend: 'rgba(255,100,180,0.42)'},
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
      background: 'linear-gradient(180deg,rgba(10,10,18,0.98) 0%,rgba(26,11,46,0.95) 100%)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(180,94,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(180,94,255,0.03) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header (Texto alterado e com degradê neon pulsante!) */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-tag">⚡ Simulador de Identidade</span>
          <h2 className="section-title" style={{ lineHeight: '1.1', textTransform: 'none' }}>
            See an
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse" style={{ display: 'inline-block' }}>
              interactive example
            </span>
          </h2>
          <p className="section-sub" style={{ maxWidth: 540, margin: '0 auto' }}>
            Escolha o modelo base, selecione a cor da sua identidade e veja como vai ficar.
          </p>
        </div>

        {/* ── STEP 1: Model cards ── */}
        <div style={{ marginBottom: 52 }}>
          <p className="sim-step-label" style={{
            fontFamily: "'Space Mono',monospace", fontSize: '0.6rem',
            letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase', marginBottom: 20, textAlign: 'center',
          }}>
            01 — Escolha o Modelo Base
          </p>

          {/* Horizontal scroll strip */}
          <div className="sim-model-strip" style={{
            display: 'flex', gap: 16,
            overflowX: 'auto', paddingBottom: 8,
            scrollSnapType: 'x mandatory',
            /* hide scrollbar */
            msOverflowStyle: 'none', scrollbarWidth: 'none',
          }}>
            {MODELS.map(model => {
              const active = model.id === activeModel.id;
              return (
                <button
                  key={model.id}
                  onClick={() => handleModelChange(model)}
                  style={{
                    flexShrink: 0, scrollSnapAlign: 'start',
                    width: 200, cursor: 'pointer',
                    background: active ? 'rgba(180,94,255,0.1)' : 'rgba(14,14,22,0.8)',
                    border: active
                      ? '2px solid rgba(180,94,255,0.7)'
                      : '1.5px solid rgba(255,255,255,0.07)',
                    borderRadius: 20, overflow: 'hidden',
                    padding: 0,
                    boxShadow: active
                      ? '0 0 28px rgba(180,94,255,0.25), 0 0 60px rgba(180,94,255,0.08)'
                      : '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.35s ease',
                    transform: active ? 'translateY(-6px)' : 'translateY(0)',
                  }}
                >
                  {/* Image area */}
                  <div style={{
                    width: '100%', height: 190,
                    background: 'rgba(0,0,0,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', position: 'relative',
                    borderBottom: active
                      ? '1px solid rgba(180,94,255,0.3)'
                      : '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <img
                      src={model.img}
                      alt={model.label}
                      style={{
                        width: '90%', height: '90%', objectFit: 'contain',
                        filter: active
                          ? 'drop-shadow(0 0 12px rgba(180,94,255,0.5))'
                          : 'none',
                        transition: 'filter 0.3s, transform 0.3s',
                        transform: active ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                    {active && (
                      <div style={{
                        position: 'absolute', top: 10, right: 10,
                        background: 'rgba(180,94,255,0.9)', borderRadius: '50%',
                        width: 22, height: 22, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', color: '#fff',
                        boxShadow: '0 0 12px rgba(180,94,255,0.8)',
                      }}>✓</div>
                    )}
                  </div>
                  {/* Label */}
                  <div style={{ padding: '12px 14px', textAlign: 'left' }}>
                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '0.82rem',
                      color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                      marginBottom: 3,
                    }}>
                      {model.label}
                    </div>
                    <div style={{
                      fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                      color: active ? 'rgba(180,94,255,0.9)' : 'rgba(255,255,255,0.25)',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                    }}>
                      MEO-NAI · {model.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* hide scrollbar + mobile overrides */}
          <style>{`
            #create div::-webkit-scrollbar { display: none; }

            @media (max-width: 800px) {
              /* Section spacing */
              #create { padding: 72px 0 56px !important; }

              /* Model strip: padding so first/last card aren't clipped */
              .sim-model-strip {
                padding: 0 16px 12px !important;
                scroll-padding-left: 16px;
              }

              /* Step labels: center on mobile */
              .sim-step-label {
                text-align: center !important;
              }

              /* Bottom grid: single column, preview on top */
              .sim-bottom {
                grid-template-columns: 1fr !important;
                gap: 24px !important;
              }

              /* Preview (right) appears first on mobile */
              .sim-right {
                order: -1 !important;
                position: static !important;
              }

              /* Color swatches: center */
              .sim-colors {
                justify-content: center !important;
              }

              /* Left column: center step label, clear button */
              .sim-left { align-items: center; }
              .sim-left > div:first-child { width: 100%; }

              /* Preview image area shorter on mobile */
              .sim-right [style*='minHeight: 420'] {
                min-height: 260px !important;
                padding: 20px 16px !important;
              }

              /* Feedback card full width */
              .sim-left > div:nth-child(2) {
                width: 100%;
              }
            }
          `}</style>
        </div>

        {/* ── STEP 2 + Preview ── */}
        <div className="sim-bottom" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: 40, alignItems: 'start',
        }}>

          {/* Left: color picker + feedback */}
          <div className="sim-left" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <p className="sim-step-label" style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.6rem',
                letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', marginBottom: 20,
              }}>
                02 — Cor da Identidade Visual
              </p>
              <div className="sim-colors" style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                {COLORS.map(color => {
                  const active = activeColor?.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setActiveColor(active ? null : color)}
                      title={color.label}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      }}
                    >
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: color.hex,
                        boxShadow: active
                          ? `0 0 0 3px #fff, 0 0 20px ${color.glow}, 0 0 40px ${color.glow}`
                          : `0 0 0 2px rgba(255,255,255,0.12), 0 0 8px ${color.glow}`,
                        transition: 'all 0.3s ease',
                        transform: active ? 'scale(1.2)' : 'scale(1)',
                        border: `2px solid ${active ? color.border : 'rgba(255,255,255,0.1)'}`,
                      }} />
                      <span style={{
                        fontFamily: "'Space Mono',monospace", fontSize: '0.48rem',
                        color: active ? color.hex : 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        textShadow: active ? `0 0 10px ${color.glow}` : 'none',
                        transition: 'all 0.3s',
                      }}>
                        {color.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {activeColor && (
                <button onClick={() => setActiveColor(null)} style={{
                  marginTop: 14, background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem',
                  fontFamily: "'Space Mono',monospace", letterSpacing: '0.1em',
                  padding: '6px 14px', borderRadius: 50, cursor: 'pointer',
                }}>
                  ✕ Limpar cor
                </button>
              )}
            </div>

            {/* Feedback card */}
            <div style={{
              padding: '22px 24px', borderRadius: 18,
              background: 'rgba(14,14,24,0.85)',
              border: activeColor
                ? `1.5px solid ${activeColor.hex}55`
                : '1px solid rgba(255,255,255,0.07)',
              boxShadow: activeColor ? `0 0 24px ${activeColor.glow.replace('0.55)','0.12)')}` : 'none',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.4s ease',
              minHeight: 120,
            }}>
              {activeColor ? (
                <>
                  <div style={{
                    fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                    color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em',
                    textTransform: 'uppercase', marginBottom: 8,
                  }}>
                    Prévia da Identidade
                  </div>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.2rem',
                    color: activeColor.hex,
                    textShadow: `0 0 16px ${activeColor.glow}`,
                    marginBottom: 6,
                  }}>
                    {activeColor.label}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 14,
                  }}>
                    {activeModel.desc}
                  </div>
                  <div style={{
                    padding: '8px 14px', borderRadius: 8,
                    background: `${activeColor.hex}15`,
                    border: `1px solid ${activeColor.hex}40`,
                    fontFamily: "'Space Mono',monospace", fontSize: '0.56rem',
                    color: activeColor.hex, letterSpacing: '0.1em',
                  }}>
                    ⚡ {activeModel.label} × {activeColor.label}
                  </div>
                </>
              ) : (
                <div style={{
                  height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Space Mono',monospace", fontSize: '0.58rem',
                  color: 'rgba(255,255,255,0.18)', letterSpacing: '0.15em',
                  textAlign: 'center', lineHeight: 2,
                }}>
                  SELECIONE UMA COR<br />PARA VER A PRÉVIA
                </div>
              )}
            </div>

            <button
              className="btn-order"
              style={{ fontSize: '0.68rem' }}
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ✦ I WANT TO SECURE MY SWEATSHIRT ✦
            </button>
          </div>

          {/* Right: Big preview */}
          <div className="sim-right" style={{ position: 'sticky', top: 88 }}>
            <div style={{
              background: 'rgba(14,14,22,0.75)', backdropFilter: 'blur(24px)',
              border: activeColor
                ? `1.5px solid ${activeColor.hex}55`
                : '1px solid rgba(255,255,255,0.07)',
              borderRadius: 28, overflow: 'hidden',
              boxShadow: activeColor
                ? `0 0 60px ${activeColor.glow.replace('0.55)','0.18)')}`
                : '0 0 40px rgba(0,0,0,0.4)',
              transition: 'all 0.5s ease',
            }}>
              {/* Header bar */}
              <div style={{
                padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '0.9rem',
                    color: activeColor ? activeColor.hex : '#fff',
                    textShadow: activeColor ? `0 0 12px ${activeColor.glow}` : 'none',
                    transition: 'all 0.4s',
                  }}>
                    {activeModel.label}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                    color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em',
                    textTransform: 'uppercase', marginTop: 3,
                  }}>
                    MEO-NAI · {activeModel.sub}
                  </div>
                </div>
                {activeColor && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '5px 12px', borderRadius: 50,
                    background: `${activeColor.hex}18`,
                    border: `1px solid ${activeColor.hex}44`,
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: activeColor.hex,
                      boxShadow: `0 0 8px ${activeColor.glow}`,
                    }} />
                    <span style={{
                      fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                      color: activeColor.hex, letterSpacing: '0.1em',
                    }}>
                      {activeColor.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Image + overlay */}
              <div style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '36px 32px', minHeight: 420,
                background: activeColor
                  ? `radial-gradient(ellipse 70% 60% at 50% 55%,${activeColor.hex}12,transparent 72%)`
                  : 'transparent',
                transition: 'background 0.5s ease',
              }}>
                <img
                  key={activeModel.id}
                  src={activeModel.img}
                  alt={activeModel.label}
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    maxWidth: '86%', maxHeight: 400, objectFit: 'contain',
                    display: 'block', margin: '0 auto',
                    filter: activeColor
                      ? `drop-shadow(0 0 22px ${activeColor.glow}) drop-shadow(0 0 44px ${activeColor.glow.replace('0.55)','0.28)')})`
                      : 'drop-shadow(0 0 14px rgba(180,94,255,0.2))',
                    transition: 'filter 0.5s ease',
                    opacity: imgLoaded ? 1 : 0,
                    position: 'relative', zIndex: 1,
                  }}
                />

                {/* Colour blend overlay */}
                {activeColor && imgLoaded && (
                  <div style={{
                    position: 'absolute',
                    top: '36px', left: '32px', right: '32px', bottom: '0',
                    background: activeColor.blend,
                    mixBlendMode: activeColor.id === 'black' ? 'multiply' : 'color',
                    borderRadius: 12, pointerEvents: 'none', zIndex: 2,
                    transition: 'background 0.4s ease',
                  }} />
                )}

                {!imgLoaded && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Mono',monospace", fontSize: '0.58rem',
                    color: 'rgba(255,255,255,0.18)', letterSpacing: '0.15em',
                  }}>
                    CARREGANDO...
                  </div>
                )}
              </div>

              {/* Footer strip */}
              <div style={{
                padding: '13px 22px', borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                  color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em',
                }}>
                  {activeColor ? '✦ IDENTIDADE APLICADA' : '← SELECIONE UMA COR'}
                </span>
                <span style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                  color: activeColor ? activeColor.hex : 'rgba(255,255,255,0.15)',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  textShadow: activeColor ? `0 0 10px ${activeColor.glow}` : 'none',
                  transition: 'all 0.4s',
                }}>
                  {activeColor ? `${activeColor.label} PREVIEW` : 'HEKSEL GENESIS'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
