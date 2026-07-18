import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useLanguage, Lang } from '../context/LanguageContext';

interface NavbarProps {
  onNotifyMe: () => void;
  onHelpUs: () => void;
}

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: 'English',   flag: '🇺🇸', label: 'English'   },
  { code: 'Français',  flag: '🇫🇷', label: 'Français'  },
  { code: '中文',      flag: '🇨🇳', label: '中文'      },
  { code: 'Português', flag: '🇧🇷', label: 'Português' },
];

export function Navbar({ onNotifyMe, onHelpUs }: NavbarProps) {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [langOpen, setLangOpen]         = useState(false);
  const { lang, setLang }               = useLanguage();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close lang dropdown when clicking outside */
  useEffect(() => {
    if (!langOpen) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-lang-menu]')) setLangOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [langOpen]);

  const links = [
    { name: 'Home',       href: '#home'       },
    { name: 'Collection', href: '#collection' },
    { name: 'Create',     href: '#create'     },
    { name: 'Manifesto',  href: '#manifesto'  },
  ];

  const currentLang = LANGUAGES.find(l => l.code === lang)!;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
          <img
            src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/heksel-logo.png`}
            alt="Heksel Genesis"
            style={{
              height: 42,
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.5)) drop-shadow(0 0 16px rgba(180,94,255,0.4))',
              transition: 'filter 0.3s ease',
            }}
          />
        </a>

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
                    width: 180,
                    background: 'rgba(10,10,22,0.95)',
                    border: '1px solid rgba(180,94,255,0.3)',
                    borderRadius: 14,
                    padding: '8px 6px',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(180,94,255,0.1)',
                    zIndex: 200,
                  }}
                >
                  {LANGUAGES.map(l => {
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
            💜 Help Us
          </button>

          <button
            onClick={onNotifyMe}
            className="px-4 py-2 rounded-full border border-white/20 text-sm font-display uppercase hover:border-white transition-colors"
          >
            Notify Me
          </button>

          <button
            onClick={() => document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' })}
            className="cyber-btn cyber-gold px-5 py-2 rounded-full text-sm"
          >
            VIP Access
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
                  🌐 Language
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
                Notify Me
              </button>
              <button
                onClick={() => { setMobileMenu(false); document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="w-full py-3 cyber-btn cyber-gold rounded-lg font-display uppercase tracking-wider text-sm"
              >
                VIP Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
