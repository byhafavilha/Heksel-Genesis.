import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// ---------------------------------------------------------------------------
// Pride Flag Easter Egg — same set as Navbar
// ---------------------------------------------------------------------------
const HERO_PRIDE_FLAGS = [
  { name: 'default',       gradient: null },
  { name: 'LGBT+ 🏳️‍🌈',      gradient: 'linear-gradient(180deg,#FF0018 16.6%,#FFA52C 16.6% 33.2%,#FFFF41 33.2% 49.8%,#008018 49.8% 66.4%,#0000F9 66.4% 83%,#86007D 83%)' },
  { name: 'Trans 🏳️‍⚧️',      gradient: 'linear-gradient(180deg,#55CDFC 20%,#F7A8B8 20% 40%,#FFFFFF 40% 60%,#F7A8B8 60% 80%,#55CDFC 80%)' },
  { name: 'Armenia 🇦🇲',    gradient: 'linear-gradient(180deg,#D90012 33%,#0033A0 33% 66%,#F2A800 66%)' },
  { name: 'Non-Binary ⚧',   gradient: 'linear-gradient(180deg,#FCF434 25%,#FFFFFF 25% 50%,#9C59D1 50% 75%,#2D2D2D 75%)' },
  { name: 'Bisexual 💗',    gradient: 'linear-gradient(180deg,#D60270 40%,#9B4F96 40% 60%,#0038A8 60%)' },
  { name: 'Lesbian 🧡',     gradient: 'linear-gradient(180deg,#D52D00 20%,#FF9A56 20% 40%,#FFFFFF 40% 60%,#D362A4 60% 80%,#A50062 80%)' },
  { name: 'Pansexual 💛',   gradient: 'linear-gradient(180deg,#FF218C 33%,#FFD800 33% 66%,#21B1FF 66%)' },
];

// ---------------------------------------------------------------------------
// Constantes (Ajustadas com as suas imagens reais!)
// ---------------------------------------------------------------------------

const TAB_KEYS = ["customize", "example"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const IMAGES: Record<TabKey, string> = {
  customize: "/meo-custom-canvas.png", // Imagem do gabarito "Put your image here"
  example: "/meo-example-showcase.png",   // Imagem do moletom com o cachorro
};

// ---------------------------------------------------------------------------
// Partículas / Satélites de fundo
// ---------------------------------------------------------------------------

interface Satellite {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

const generateSatellites = (count: number): Satellite[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2,
    color: Math.random() > 0.5 ? "#00f0ff" : "#b45eff",
  }));

// ---------------------------------------------------------------------------
// Sub-componente: Satélite individual
// ---------------------------------------------------------------------------

const SatelliteParticle = ({ satellite }: { satellite: Satellite }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: satellite.size,
      height: satellite.size,
      backgroundColor: satellite.color,
      boxShadow: `0 0 ${satellite.size * 3}px ${satellite.color}`,
      left: `${satellite.x}%`,
      top: `${satellite.y}%`,
      opacity: satellite.opacity,
    }}
    animate={{
      x: [0, Math.random() * 60 - 30, 0],
      y: [0, Math.random() * 60 - 30, 0],
      opacity: [satellite.opacity, satellite.opacity * 1.5, satellite.opacity],
    }}
    transition={{
      duration: satellite.duration,
      delay: satellite.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// ---------------------------------------------------------------------------
// Sub-componente: Fundo animado com satélites
// ---------------------------------------------------------------------------

const AnimatedBackground = ({ satelliteCount = 40 }: { satelliteCount?: number }) => {
  const [satellites, setSatellites] = useState<Satellite[]>([]);

  useEffect(() => {
    setSatellites(generateSatellites(satelliteCount));
  }, [satelliteCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {satellites.map((sat) => (
        <SatelliteParticle key={sat.id} satellite={sat} />
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Componente principal: Hero (Imagens corrigidas e ordem mobile no topo!)
// ---------------------------------------------------------------------------

interface HeroProps {
  onHelpUs?: () => void;
}

export function Hero({ onHelpUs }: HeroProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("customize");
  const [infoOpen, setInfoOpen] = useState(false);
  const [heroPrideIndex, setHeroPrideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { collectorPack, t } = useLanguage();

  const handleBrandIconClick = () =>
    setHeroPrideIndex(prev => (prev + 1) % HERO_PRIDE_FLAGS.length);
  const heroPrideFlag = HERO_PRIDE_FLAGS[heroPrideIndex];

  const tabs = [
    { key: "customize" as TabKey, label: t.hero.tabCustomize },
    { key: "example"   as TabKey, label: t.hero.tabExample   },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 md:px-8"
    >
      {/* Fundo com satélites animados */}
      <AnimatedBackground satelliteCount={40} />

      {/* Linha de scan horizontal (efeito cyberpunk) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,240,255,0.15), transparent)",
          }}
          animate={{ top: ["-5%", "105%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Coluna da direita (Visualizador do Produto - NO TOPO NO MOBILE) ── */}
        <motion.div
          className="flex justify-center order-first lg:order-last"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full max-w-[550px] bg-[#0e0e16]/70 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] relative">
            {/* Título overlay */}
            <div className="relative z-10 flex items-center justify-center gap-2 py-4 px-6 bg-[#0e0e16]/85 backdrop-blur-sm">
              <span className="font-bold font-['Syne',sans-serif] text-base md:text-lg tracking-[0.12em]" style={{ color: '#ffffff' }}>
                {t.hero.productTitle}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 rounded-full border-2 border-purple-500 bg-purple-500/10 text-purple-400 font-bold font-['Syne',sans-serif] text-sm flex items-center justify-center hover:bg-purple-500/25 hover:shadow-[0_0_16px_rgba(168,85,247,0.5)] transition-all"
                onClick={() => setInfoOpen((v) => !v)}
                title="Collector Pack Details"
              >
                ?
              </motion.button>
            </div>

            {/* ── Collector Pack Info Panel ── */}
            <AnimatePresence>
              {infoOpen && (
                <motion.div
                  key="collector-panel"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 30,
                    background: "rgba(6,4,18,0.97)",
                    backdropFilter: "blur(16px)",
                    display: "flex", flexDirection: "column",
                    overflowY: "auto",
                  }}
                >
                  {/* Close */}
                  <button
                    onClick={() => setInfoOpen(false)}
                    style={{
                      position: "absolute", top: 14, right: 14,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "50%", width: 30, height: 30,
                      color: "rgba(255,255,255,0.5)", fontSize: "1rem",
                      cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      lineHeight: 1, zIndex: 31,
                    }}
                  >
                    ×
                  </button>

                  <div style={{ padding: "28px 24px 24px" }}>
                    {/* Price */}
                    <div style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "0.55rem", letterSpacing: "0.2em",
                      color: "rgba(180,94,255,0.7)",
                      textTransform: "uppercase", marginBottom: 6,
                    }}>
                      {collectorPack.header}
                    </div>
                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800,
                      fontSize: "2rem",
                      background: "linear-gradient(135deg,#b45eff,#00f0ff)",
                      WebkitBackgroundClip: "text", backgroundClip: "text",
                      color: "transparent", marginBottom: 4,
                    }}>
                      {collectorPack.price}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.45)", marginBottom: 22, lineHeight: 1.5,
                    }}>
                      {collectorPack.includes}
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: "rgba(180,94,255,0.15)", marginBottom: 20 }} />

                    {/* Items */}
                    {collectorPack.items.map((item) => (
                      <div
                        key={item.title}
                        style={{
                          display: "flex", gap: 14, marginBottom: 18,
                          padding: "14px 14px",
                          background: "rgba(180,94,255,0.05)",
                          border: "1px solid rgba(180,94,255,0.12)",
                          borderRadius: 12,
                        }}
                      >
                        <div style={{ fontSize: "1.4rem", flexShrink: 0, lineHeight: 1.2 }}>
                          {item.icon}
                        </div>
                        <div>
                          <div style={{
                            fontFamily: "'Syne',sans-serif", fontWeight: 800,
                            fontSize: "0.82rem", color: "#fff", marginBottom: 4,
                          }}>
                            {item.title}
                          </div>
                          <div style={{
                            fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem",
                            color: "rgba(255,255,255,0.45)", lineHeight: 1.55,
                          }}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* CTA reminder */}
                    <div style={{
                      marginTop: 6, padding: "10px 14px", borderRadius: 10,
                      background: "rgba(0,240,255,0.05)",
                      border: "1px solid rgba(0,240,255,0.18)",
                      fontFamily: "'Space Mono',monospace", fontSize: "0.52rem",
                      color: "rgba(0,240,255,0.7)", letterSpacing: "0.1em",
                      textAlign: "center",
                    }}>
                      {collectorPack.badge}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Área da imagem com transição entre abas */}
            <div className="relative w-full aspect-square flex items-center justify-center p-6 bg-[#09090f]/50">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab}
                  src={IMAGES[activeTab]}
                  alt={tabs.find((tab) => tab.key === activeTab)?.label ?? ""}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] rounded-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Botões das abas */}
            <div className="flex gap-4 justify-center px-6 py-4 bg-[#0e0e16]/60 backdrop-blur-md">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2.5 rounded-full border font-['Syne',sans-serif] font-bold text-xs tracking-[0.1em] uppercase transition-all ${
                    activeTab === tab.key
                      ? "border-purple-500 bg-purple-500/15 text-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.3)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-purple-500/40 hover:text-purple-400"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Badge inferior */}
            <div className="flex justify-center pb-4 px-6">
              <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/15 text-purple-400 font-mono text-[0.6rem] md:text-xs tracking-[0.12em] uppercase">
                {t.hero.imageBadge}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Coluna da esquerda (Textos e CTAs) ── */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* ── Brand Identity mark ── */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-3 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Brand icon — click cycles pride flag easter egg */}
            <button
              onClick={handleBrandIconClick}
              title={heroPrideIndex === 0 ? '✨ Easter egg…' : heroPrideFlag.name}
              style={{
                padding: 0, background: 'none', border: 'none',
                cursor: 'pointer', position: 'relative', display: 'inline-flex',
                borderRadius: 8, overflow: 'hidden', flexShrink: 0,
              }}
              aria-label="Heksel logo — click for surprise"
            >
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/heksel-brand-icon.png`}
                alt="Heksel infinity logo"
                style={{
                  height: 72,
                  width: 72,
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                  filter: 'drop-shadow(0 0 14px rgba(0,240,255,0.75)) drop-shadow(0 0 28px rgba(0,240,255,0.35))',
                  display: 'block',
                  borderRadius: 6,
                  transition: 'filter 0.5s ease-in-out',
                }}
              />
              {heroPrideFlag.gradient && (
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: heroPrideFlag.gradient,
                    mixBlendMode: 'color',
                    opacity: 0.85,
                    pointerEvents: 'none',
                    transition: 'opacity 0.5s ease-in-out, background 0.5s ease-in-out',
                    borderRadius: 6,
                  }}
                />
              )}
            </button>

            {/* HAFAVILHA title image */}
            <img
              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/hafavilha-title.png`}
              alt="Hafavilha"
              style={{
                height: 64,
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(0,200,255,0.5)) brightness(1.08) saturate(1.1)',
                maxWidth: 280,
              }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-cyan-400 uppercase">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-['Syne',sans-serif] leading-[0.9] tracking-tight text-white mb-6">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              {t.hero.title2}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base md:text-lg text-white/50 font-light max-w-md mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Botões de ação */}
          <motion.div
            className="flex flex-col gap-4 items-center lg:items-start w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Botão principal - Order Customized Sweatshirt */}
            <motion.button
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold font-['Syne',sans-serif] text-xs md:text-sm tracking-[0.12em] uppercase shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-shadow"
              onClick={() => document.getElementById('interactive-example')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {t.hero.btnOrder}
            </motion.button>

            {/* Botão "Create my brand" — smooth scroll to brand / plans section */}
            <motion.button
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="w-full px-6 py-4 rounded-xl font-black font-['Syne',sans-serif] text-xs md:text-sm tracking-[0.15em] uppercase border border-purple-500/50 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all"
            >
              {t.hero.btnBrand}
            </motion.button>

          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-6 md:gap-10 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { num: "1K+", label: t.hero.statBuilders },
              { num: "3", label: t.hero.statLines },
              { num: "01", label: t.hero.statDrop },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-8 bg-cyan-400/20" />}
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-black font-['Syne',sans-serif] bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {stat.num}
                  </div>
                  <div className="text-[0.5rem] md:text-xs text-white/30 font-mono tracking-[0.2em] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
