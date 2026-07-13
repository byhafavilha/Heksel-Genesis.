import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onOrderClick: () => void;
}

export function Hero({ onOrderClick }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'customize' | 'live'>('customize');
  const [showCollectorInfo, setShowCollectorInfo] = useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <section className="hero" id="hero">
      <div className="scanline" />
      <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', minHeight: '100vh', paddingTop: '88px', paddingBottom: '48px' }}>

        {/* Left */}
        <div className="hero-left">
          <div className="badge">
            <span className="badge-dot" />
            <span>The NEO Collection 2026</span>
          </div>

          <h1>
            <span>From beginning</span>
            <br />
            <span className="glow-text">to infinity</span>
          </h1>

          <p>
            Three lines. One empire. Performance, home wear and digital luxury — every step is a statement of power.
          </p>

          <div className="hero-actions">
            <button className="btn-order" onClick={onOrderClick}>
              ✦ ORDER MY CUSTOMIZED SWEATSHIRT ✦
            </button>
            <div className="hero-actions-inner">
              <button
                className="btn-primary"
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Explore All</span> <span>→</span>
              </button>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Explore Our Genesis</span> <span>→</span>
              </button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">1K+</span>
              <span className="stat-label">Builders</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">3</span>
              <span className="stat-label">Lines</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">01</span>
              <span className="stat-label">Drop</span>
            </div>
          </div>
        </div>

        {/* Right – Product Viewer */}
        <div className="hero-right">
          <div className="product-viewer">
            {/* Slides */}
            <div className="viewer-slides">
              <div className="viewer-title-overlay">
                <span>MEO-NAI SWEATSHIRT</span>
                <button
                  className="info-trigger-btn"
                  title="Collector Pack Details"
                  onClick={() => setShowCollectorInfo(v => !v)}
                >
                  ?
                </button>
              </div>

              <div className={`viewer-slide ${activeTab === 'customize' ? 'active' : ''}`}>
                <img src={`${base}/meo-custom-canvas.png`} alt="Customize Canvas" />
              </div>
              <div className={`viewer-slide ${activeTab === 'live' ? 'active' : ''}`}>
                <img src={`${base}/meo-example-showcase.png`} alt="Live Example" />
              </div>

              {/* Collector info overlay */}
              <AnimatePresence>
                {showCollectorInfo && (
                  <motion.div
                    id="collector-info-modal"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(8,8,13,0.97)',
                      backdropFilter: 'blur(24px)',
                      borderRadius: 'inherit',
                      padding: '28px 24px',
                      zIndex: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <button
                      onClick={() => setShowCollectorInfo(false)}
                      style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.4rem', cursor: 'pointer' }}
                    >
                      &times;
                    </button>
                    <div className="price-large" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '2rem', color: 'var(--gold)' }}>
                      R$ 300,00
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                      Inclui: Carta Personalizada 🃏 + Adesivo Exclusivo Heksel + Fragrância Especial Imperium 🧪
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        ['🟪', 'Premium Custom Sweatshirt', 'Dual-print (Bone Front / Furry Back) engineered heavyweight cotton.'],
                        ['🔑', 'Heksel Genesis Keychain', 'Perfect accessory for your backpack, bag, or car mirror.'],
                        ['💎', 'Official Genesis Sticker Pack', 'High-fidelity vinyl stickers to customize your laptop or gear.'],
                        ['✉️', 'Handcrafted Serialized Letter', 'Custom thank-you card with your unique serial number, locking your collector position.'],
                      ].map(([icon, title, desc]) => (
                        <li key={title} style={{ display: 'flex', gap: 10, fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>
                          <span>{icon}</span>
                          <span><strong style={{ color: '#fff' }}>{title}</strong> – {desc}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tab nav */}
            <div className="viewer-nav">
              <button
                className={activeTab === 'customize' ? 'active-view' : ''}
                onClick={() => setActiveTab('customize')}
              >
                Customize Canvas
              </button>
              <button
                className={activeTab === 'live' ? 'active-view' : ''}
                onClick={() => setActiveTab('live')}
              >
                Live Example
              </button>
            </div>

            <div className="viewer-badge-bottom">YOUR SELECTED IMAGES WILL LOOK LIKE THIS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
