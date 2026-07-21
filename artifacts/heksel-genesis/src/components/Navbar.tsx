import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useLanguage, Lang } from '../context/LanguageContext';

// ── Pride Flag Easter Egg ─────────────────────────────────────────────────
// Clicking the logo cycles through these overlay gradients (mix-blend-mode: color).
// Index 0 = default (no overlay). Click after the last flag resets.
const PRIDE_FLAGS = [
  { name: 'default',       gradient: null                                                                                                                                                                 },
  { name: 'LGBT+ 🏳️‍🌈',      gradient: 'linear-gradient(180deg,#FF0018 16.6%,#FFA52C 16.6% 33.2%,#FFFF41 33.2% 49.8%,#008018 49.8% 66.4%,#0000F9 66.4% 83%,#86007D 83%)'                             },
  { name: 'Trans 🏳️‍⚧️',      gradient: 'linear-gradient(180deg,#55CDFC 20%,#F7A8B8 20% 40%,#FFFFFF 40% 60%,#F7A8B8 60% 80%,#55CDFC 80%)'                                                               },
  { name: 'Armenia 🇦🇲',    gradient: 'linear-gradient(180deg,#D90012 33%,#0033A0 33% 66%,#F2A800 66%)'                                                                                                 },
  { name: 'Non-Binary ⚧',   gradient: 'linear-gradient(180deg,#FCF434 25%,#FFFFFF 25% 50%,#9C59D1 50% 75%,#2D2D2D 75%)'                                                                                 },
  { name: 'Bisexual 💗',    gradient: 'linear-gradient(180deg,#D60270 40%,#9B4F96 40% 60%,#0038A8 60%)'                                                                                                  },
  { name: 'Lesbian 🧡',     gradient: 'linear-gradient(180deg,#D52D00 20%,#FF9A56 20% 40%,#FFFFFF 40% 60%,#D362A4 60% 80%,#A50062 80%)'                                                                 },
  { name: 'Pansexual 💛',   gradient: 'linear-gradient(180deg,#FF218C 33%,#FFD800 33% 66%,#21B1FF 66%)'                                                                                                  },
];

interface NavbarProps {
  onNotifyMe: () => void;
  onHelpUs: () => void;
}

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: 'English',   flag: '🇺🇸', label: 'English'   },
  { code: 'Português', flag: '🇧🇷', label: 'Português' },
];

export function Navbar({ onNotifyMe, onHelpUs }: NavbarProps) {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [langOpen, setLangOpen]         = useState(false);
  const [langSearch, setLangSearch]     = useState('');
  const [prideIndex, setPrideIndex]     = useState(0);
  const { lang, setLang, t }            = useLanguage();

  const currentFlag = PRIDE_FLAGS[prideIndex];

  const handleLogoPrideClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPrideIndex(prev => (prev + 1) % PRIDE_FLAGS.length);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close lang dropdown when clicking outside; clear search on close */
  useEffect(() => {
    if (!langOpen) { setLangSearch(''); return; }
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-lang-menu]')) setLangOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [langOpen]);

  const links = [
    { name: t.nav.home,       href: '#home'       },
    { name: t.nav.collection, href: '#collection' },
    { name: t.nav.create,     href: '#create'     },
    { name: t.nav.manifesto,  href: '#manifesto'  },
  ];

  const filteredLanguages = LANGUAGES.filter(l =>
    l.label.toLowerCase().includes(langSearch.toLowerCase())
  );

  const currentLang = LANGUAGES.find(l => l.code === lang)!;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo + "HEKSEL" wordmark */}
        <div className="flex items-center gap-2 group">
          {/* Logo image — click cycles pride flag easter egg */}
          <button
            onClick={handleLogoPrideClick}
            title={prideIndex === 0 ? '✨ Easter egg…' : currentFlag.name}
            style={{
              padding: 0, background: 'none', border: 'none',
              cursor: 'pointer', position: 'relative', display: 'inline-flex',
              borderRadius: 8, overflow: 'hidden',
            }}
            aria-label="A Hafavilha logo — click for surprise"
          >
            <img
              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/heksel-brand-icon.png`}
              alt="A Hafavilha infinity logo"
              style={{
                height: 42, width: 42, objectFit: 'contain',
                /* screen blend removes the gray background on dark navbars */
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.7)) drop-shadow(0 0 18px rgba(0,240,255,0.4))',
                transition: 'filter 0.5s ease-in-out',
                display: 'block',
                borderRadius: 6,
              }}
            />
            {/* Pride flag color overlay */}
            {currentFlag.gradient && (
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: currentFlag.gradient,
                  mixBlendMode: 'color',
                  opacity: 0.85,
                  pointerEvents: 'none',
                  transition: 'opacity 0.5s ease-in-out, background 0.5s ease-in-out',
                }}
              />
            )}
          </button>

          {/* "HEKSEL" wordmark — navigates to #home */}
          <a
            href="#home"
            style={{ textDecoration: 'none' }}
            aria-label="Go to home"
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #c9a84c 0%, #f5d97f 50%, #c9a84c 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                userSelect: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              HEKSEL
            </span>
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">

          {/* 🌐 Language picker */}
          <div className="relative" data-lang-menu>
            <button
              onClick={() => setLangOpen(v => !v)}
              title="Change language"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 50,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.8)',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{currentLang.flag}</span>
              <span>🌐</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  data-lang-menu
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 210,
                    background: 'rgba(10,10,22,0.97)',
                    border: '1px solid rgba(180,94,255,0.3)',
                    borderRadius: 14,
                    padding: '8px 6px',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(180,94,255,0.1)',
                    zIndex: 200,
                  }}
                >
                  {/* Search input */}
                  <div style={{ padding: '2px 4px 8px 4px' }}>
                    <input
                      type="text"
                      value={langSearch}
                      onChange={e => setLangSearch(e.target.value)}
                      placeholder="Search language…"
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '7px 10px',
                        borderRadius: 8,
                        border: '1px solid rgba(180,94,255,0.2)',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'rgba(255,255,255,0.85)',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        letterSpacing: '0.06em',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(180,94,255,0.55)'; }}
                      onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(180,94,255,0.2)';  }}
                    />
                  </div>
                  {filteredLanguages.length === 0 && (
                    <p style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)',
                      textAlign: 'center', padding: '8px 0 4px',
                      letterSpacing: '0.08em',
                    }}>No results</p>
                  )}
                  {filteredLanguages.map(l => {
                    const active = lang === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 9,
                          border: 'none',
                          background: active ? 'rgba(180,94,255,0.14)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.18s',
                          textAlign: 'left',
                        }}
                        onMouseEnter={e => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                        }}
                        onMouseLeave={e => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{l.flag}</span>
                        <span style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '0.7rem',
                          letterSpacing: '0.08em',
                          color: active ? '#b45eff' : 'rgba(255,255,255,0.65)',
                          fontWeight: active ? 700 : 400,
                        }}>
                          {l.label}
                        </span>
                        {active && (
                          <span style={{
                            marginLeft: 'auto',
                            fontSize: '0.65rem',
                            color: '#b45eff',
                          }}>✓</span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 💜 Help Us button */}
          <button
            onClick={onHelpUs}
            className="px-4 py-2 rounded-full text-sm font-display uppercase transition-all hover:scale-105 active:scale-95"
            style={{
              border: '1px solid rgba(180,94,255,0.55)',
              background: 'rgba(180,94,255,0.08)',
              color: 'rgba(180,94,255,0.95)',
              boxShadow: '0 0 10px rgba(180,94,255,0.18), inset 0 0 8px rgba(180,94,255,0.06)',
              letterSpacing: '0.1em',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(180,94,255,0.45), inset 0 0 12px rgba(180,94,255,0.12)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(180,94,255,0.9)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(180,94,255,0.18), inset 0 0 8px rgba(180,94,255,0.06)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(180,94,255,0.55)';
            }}
          >
            {t.nav.helpUs}
          </button>

          <button
            onClick={onNotifyMe}
            className="px-4 py-2 rounded-full border border-white/20 text-sm font-display uppercase hover:border-white transition-colors"
          >
            {t.nav.notifyMe}
          </button>

          <button
            onClick={() => document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold-premium px-5 py-2 rounded-full text-xs font-display font-black uppercase tracking-wider active:scale-[0.97] transition-all duration-200"
          >
            <div className="gold-shine" />
            <span className="relative z-10">{t.nav.vipAccess}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenu(v => !v)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {links.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="text-lg font-display font-medium text-white/80 hover:text-cyan flex items-center justify-between"
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4" />
                </a>
              ))}

              {/* Mobile language selector */}
              <div className="h-px bg-white/10" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                  {t.nav.langLabel}
                </p>
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileMenu(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: lang === l.code ? '1px solid rgba(180,94,255,0.5)' : '1px solid rgba(255,255,255,0.06)',
                      background: lang === l.code ? 'rgba(180,94,255,0.1)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '1.3rem' }}>{l.flag}</span>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.72rem',
                      color: lang === l.code ? '#b45eff' : 'rgba(255,255,255,0.6)',
                      fontWeight: lang === l.code ? 700 : 400,
                    }}>
                      {l.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/10" />
              {/* 💜 Help Us — mobile */}
              <button
                onClick={() => { setMobileMenu(false); onHelpUs(); }}
                className="w-full py-3 rounded-lg font-display uppercase tracking-wider text-sm min-h-[44px]"
                style={{
                  border: '1px solid rgba(180,94,255,0.55)',
                  background: 'rgba(180,94,255,0.08)',
                  color: 'rgba(180,94,255,0.95)',
                  boxShadow: '0 0 10px rgba(180,94,255,0.18)',
                }}
              >
                💜 Help Us
              </button>
              <button
                onClick={() => { setMobileMenu(false); onNotifyMe(); }}
                className="w-full py-3 border border-white/20 rounded-lg font-display uppercase tracking-wider text-sm"
              >
                {t.nav.notifyMe}
              </button>
              <button
                onClick={() => { setMobileMenu(false); document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-gold-premium w-full py-3 rounded-lg font-display font-black uppercase tracking-wider text-sm active:scale-[0.97] transition-all duration-200"
              >
                <div className="gold-shine" />
                <span className="relative z-10">{t.nav.vipAccess}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
