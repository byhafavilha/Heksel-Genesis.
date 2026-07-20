import { useState, useEffect, useRef } from 'react';
import { Shield, Check, Code, Cpu, Send } from 'lucide-react';
import { FaDiscord, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// ── Contact links ──────────────────────────────────────────────────────────
const DISCORD_LINK    = 'https://discord.gg/Y8CNkKFNM';
const INSTAGRAM_LINK  = 'https://www.instagram.com/hafavilha?igsh=MWplbGN6c3V6ejh0dw==';
const TIKTOK_LINK     = 'https://vm.tiktok.com/ZS9rjcYRgnGKf-kPeU2/';
const WHATSAPP_BASE   = 'https://wa.me/5553991855262';
const GMAIL_ADDRESS   = 'hafavilhahafy@gmail.com';

// ── Social network config ──────────────────────────────────────────────────
const SOCIALS = [
  { id: 'Discord',   Icon: FaDiscord,   color: '#5865F2', label: 'Discord'   },
  { id: 'Instagram', Icon: FaInstagram, color: '#E1306C', label: 'Instagram' },
  { id: 'TikTok',    Icon: FaTiktok,    color: '#ffffff', label: 'TikTok'    },
  { id: 'Gmail',     Icon: SiGmail,     color: '#EA4335', label: 'Gmail'     },
  { id: 'WhatsApp',  Icon: FaWhatsapp,  color: '#25D366', label: 'WhatsApp'  },
] as const;

type SocialId = (typeof SOCIALS)[number]['id'];

interface BrandSectionProps {
  onCreateAdvance: () => void;
  onHirePremium: () => void;
  onTryFreemio?: () => void;
}

export function BrandSection({ onCreateAdvance, onHirePremium, onTryFreemio }: BrandSectionProps) {
  const { t } = useLanguage();
  const { brand } = t;

  // ── Form state ─────────────────────────────────────────────────────────
  const [formName,    setFormName]    = useState('');
  const [formIdea,    setFormIdea]    = useState('');
  const [formError,   setFormError]   = useState('');
  const [toastMsg,    setToastMsg]    = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMsg) return;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 4500);
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, [toastMsg]);

  const buildBrief = () => {
    const name = formName.trim() || 'Anonymous';
    const idea = formIdea.trim() || 'No description provided';
    return `Hi Heksel! My name is ${name}. My project idea: "${idea}"`;
  };

  const validate = () => {
    if (!formName.trim()) { setFormError('Please enter your name.'); return false; }
    if (!formIdea.trim()) { setFormError('Please describe your project idea.'); return false; }
    setFormError('');
    return true;
  };

  const handleContact = (socialId: SocialId) => {
    if (!validate()) return;
    const brief = buildBrief();

    switch (socialId) {
      case 'Discord': {
        window.open(DISCORD_LINK, '_blank', 'noopener,noreferrer');
        break;
      }
      case 'Gmail': {
        const subject = encodeURIComponent('Brand Project Inquiry — Heksel Genesis');
        const body    = encodeURIComponent(
          `${brief}\n\nI am interested in the Heksel Genesis brand-building services.\n\nPlease get back to me at your earliest convenience.`
        );
        window.open(`mailto:${GMAIL_ADDRESS}?subject=${subject}&body=${body}`);
        break;
      }
      case 'Instagram': {
        navigator.clipboard.writeText(brief).then(() => {
          setToastMsg('Project brief copied to clipboard! Paste it directly in the DM to launch your brand.');
          setTimeout(() => window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer'), 900);
        }).catch(() => {
          window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer');
        });
        break;
      }
      case 'TikTok': {
        navigator.clipboard.writeText(brief).then(() => {
          setToastMsg('Project brief copied to clipboard! Paste it directly in the DM to launch your brand.');
          setTimeout(() => window.open(TIKTOK_LINK, '_blank', 'noopener,noreferrer'), 900);
        }).catch(() => {
          window.open(TIKTOK_LINK, '_blank', 'noopener,noreferrer');
        });
        break;
      }
      case 'WhatsApp': {
        const msg = encodeURIComponent(
          `${brief}\n\nI would like to start building my brand with Heksel Genesis. 🚀`
        );
        window.open(`${WHATSAPP_BASE}?text=${msg}`, '_blank', 'noopener,noreferrer');
        break;
      }
    }
  };

  return (
    <section id="brand" className="py-8 md:py-14 relative bg-[linear-gradient(to_bottom,#08080d,#1a0b2e)]">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* ── Toast ── */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            style={{
              position:   'fixed',
              bottom:     '2rem',
              left:       '50%',
              transform:  'translateX(-50%)',
              zIndex:     999,
              maxWidth:   440,
              width:      'calc(100% - 2rem)',
              background: 'rgba(6,4,22,0.96)',
              border:     '1.5px solid rgba(138,43,226,0.7)',
              borderRadius: 16,
              padding:    '14px 20px',
              backdropFilter: 'blur(20px)',
              boxShadow:  '0 0 40px rgba(138,43,226,0.3), 0 8px 32px rgba(0,0,0,0.5)',
              display:    'flex',
              alignItems: 'center',
              gap:        12,
              cursor:     'pointer',
            }}
            onClick={() => setToastMsg(null)}
          >
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>✦</span>
            <p style={{
              fontFamily:    "'Space Mono', monospace",
              fontSize:      '0.68rem',
              letterSpacing: '0.05em',
              color:         'rgba(255,255,255,0.92)',
              lineHeight:    1.55,
            }}>
              {toastMsg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md md:max-w-xl lg:max-w-4xl mx-auto px-4">

        {/* ── Header ── */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple/30 bg-purple/10 backdrop-blur-sm mb-4">
            <span className="text-purple text-xs">✦</span>
            <span className="text-[0.6rem] font-mono text-purple uppercase tracking-widest">{brand.badge}</span>
          </div>

          <h2 className="text-lg md:text-2xl lg:text-3xl font-black font-['Syne',sans-serif] leading-tight tracking-tight uppercase mb-4 break-words px-2">
            <span className="block bg-gradient-to-br from-white to-white/85 bg-clip-text text-transparent">
              {brand.title1}
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mt-0.5">
              {brand.title2}
            </span>
          </h2>

          {/* CTAs rápidos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button
              onClick={onCreateAdvance}
              className="btn-gold-premium px-6 py-3 rounded-xl text-xs font-display font-black uppercase tracking-wider w-full sm:w-auto min-h-[44px] active:scale-[0.97] transition-all duration-200"
            >
              <div className="gold-shine" />
              <span className="relative z-10">{brand.btnAdvance}</span>
            </button>

            <button
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="cyber-btn cyber-purple px-6 py-3 rounded-xl text-xs w-full sm:w-auto min-h-[44px] active:scale-95 transition-all"
            >
              {brand.btnBrand}
            </button>
          </div>
        </div>

        {/* ── Pricing Cards ── */}
        <div id="plans" className="flex flex-col lg:flex-row gap-4">

          {/* ── Freemio Card ── */}
          <div className="flex-1 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-7 flex flex-col relative overflow-hidden group hover:border-cyan/50 transition-colors">
            <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
              <Code className="w-20 h-20" />
            </div>

            <div className="mb-5 relative z-10">
              <span className="inline-block px-2.5 py-0.5 rounded bg-cyan/10 text-cyan text-[0.6rem] font-mono mb-3 border border-cyan/20">
                {brand.freemium.badge}
              </span>
              <h3 className="text-lg font-display font-bold text-white mb-1">{brand.freemium.name}</h3>
              <div className="text-3xl font-mono text-white">{brand.freemium.price}</div>
              <p className="text-xs text-white/50 mt-3 leading-relaxed">{brand.freemium.desc}</p>
            </div>

            <ul className="space-y-2.5 mb-6 flex-grow relative z-10">
              {brand.freemium.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/70">
                  <Check className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={onTryFreemio}
              className="w-full py-3 rounded-xl border border-white/20 text-white text-sm font-display uppercase hover:bg-white/5 active:scale-95 transition-all relative z-10 min-h-[44px]"
            >
              {brand.freemium.cta}
            </button>
          </div>

          {/* ── Preemio Card ── */}
          <div className="flex-1 bg-black/60 backdrop-blur-xl border-2 border-gold/40 rounded-2xl p-5 md:p-7 flex flex-col relative overflow-hidden group hover:border-gold hover:shadow-[0_0_24px_rgba(201,168,76,0.15)] transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none">
              <Cpu className="w-20 h-20" />
            </div>

            <div className="mb-5 relative z-10">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-gold/10 text-gold text-[0.6rem] font-mono mb-3 border border-gold/30">
                  <Shield className="w-2.5 h-2.5" /> {brand.premium.badge}
                </span>
                <span className="animate-pulse flex h-2.5 w-2.5 mt-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-1">{brand.premium.name}</h3>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-mono text-gold glow-gold">{brand.premium.price}</div>
                <div className="text-xs text-white/40 mb-1">{brand.premium.period}</div>
              </div>
              <p className="text-xs text-white/50 mt-3 leading-relaxed">{brand.premium.desc}</p>
            </div>

            <ul className="space-y-2.5 mb-6 flex-grow relative z-10">
              {brand.premium.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/90">
                  <span className="text-gold mt-0.5 shrink-0">✦</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={onHirePremium}
              className="btn-gold-premium w-full py-3 rounded-xl text-sm font-display font-black uppercase tracking-wider relative z-10 min-h-[44px] active:scale-[0.97] transition-all duration-200"
            >
              <div className="gold-shine" />
              <span className="relative z-10">{brand.premium.cta}</span>
            </button>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            ORDER FORM — Start Your Brand Journey
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-10 relative rounded-3xl overflow-hidden"
          style={{
            background:     'rgba(8,6,24,0.85)',
            border:         '1px solid rgba(138,43,226,0.35)',
            backdropFilter: 'blur(24px)',
            boxShadow:      '0 0 60px rgba(138,43,226,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(138,43,226,0.8), rgba(0,240,255,0.5), rgba(138,43,226,0.8), transparent)',
          }} />

          <div className="p-6 md:p-10">
            {/* Form header */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                style={{
                  background: 'rgba(138,43,226,0.1)',
                  border:     '1px solid rgba(138,43,226,0.4)',
                }}
              >
                <span style={{ color: '#8A2BE2', fontSize: '0.6rem', fontFamily: "'Space Mono', monospace", letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  ✦ Start Your Brand Journey
                </span>
              </div>
              <h3
                className="font-black font-['Syne',sans-serif] text-xl md:text-2xl uppercase tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 50%, #8A2BE2 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Tell Us About Your Vision
              </h3>
              <p
                className="text-xs mt-2 font-mono"
                style={{ color: 'rgba(138,43,226,0.7)', letterSpacing: '0.1em' }}
              >
                Fill in the form and choose how you want to reach us
              </p>
            </div>

            {/* Fields */}
            <div className="space-y-5 max-w-lg mx-auto">
              {/* Name */}
              <div>
                <label
                  className="block text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-2"
                  style={{ color: 'rgba(138,43,226,0.8)' }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => { setFormName(e.target.value); if (formError) setFormError(''); }}
                  placeholder="e.g. Alex Supreme"
                  maxLength={60}
                  className="w-full rounded-xl px-4 py-3 font-['DM_Sans',sans-serif] text-sm outline-none transition-all"
                  style={{
                    background:   'rgba(138,43,226,0.07)',
                    border:       '1px solid rgba(138,43,226,0.28)',
                    color:        '#ffffff',
                  }}
                  onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.65)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(138,43,226,0.08)'; }}
                  onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.28)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Project Idea */}
              <div>
                <label
                  className="block text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-2"
                  style={{ color: 'rgba(138,43,226,0.8)' }}
                >
                  Project Idea *
                </label>
                <textarea
                  value={formIdea}
                  onChange={e => { setFormIdea(e.target.value); if (formError) setFormError(''); }}
                  placeholder="Describe your brand idea, style, and goals..."
                  rows={4}
                  maxLength={500}
                  className="w-full rounded-xl px-4 py-3 font-['DM_Sans',sans-serif] text-sm outline-none transition-all resize-none"
                  style={{
                    background:   'rgba(138,43,226,0.07)',
                    border:       '1px solid rgba(138,43,226,0.28)',
                    color:        '#ffffff',
                  }}
                  onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.65)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(138,43,226,0.08)'; }}
                  onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.28)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className="text-[0.55rem] font-mono"
                    style={{ color: formIdea.length > 450 ? 'rgba(255,80,80,0.8)' : 'rgba(255,255,255,0.2)' }}
                  >
                    {formIdea.length}/500
                  </span>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {formError && (
                  <motion.p
                    key="form-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[0.65rem] font-mono"
                    style={{ color: 'rgba(255,70,100,0.95)', letterSpacing: '0.06em' }}
                  >
                    ⚠ {formError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Social Network selector label */}
              <div>
                <label
                  className="block text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-3"
                  style={{ color: 'rgba(138,43,226,0.8)' }}
                >
                  <Send className="inline w-3 h-3 mr-1 -mt-0.5" />
                  Send via — Choose your channel
                </label>

                {/* Social buttons grid */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {SOCIALS.map(({ id, Icon, color, label }) => (
                    <motion.button
                      key={id}
                      type="button"
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => handleContact(id)}
                      title={`Send via ${label}`}
                      className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl transition-all min-h-[70px] relative overflow-hidden group"
                      style={{
                        background: `rgba(${id === 'Discord' ? '88,101,242' : id === 'Instagram' ? '225,48,108' : id === 'TikTok' ? '255,255,255' : id === 'Gmail' ? '234,67,53' : '37,211,102'}, 0.08)`,
                        border:     `1.5px solid rgba(${id === 'Discord' ? '88,101,242' : id === 'Instagram' ? '225,48,108' : id === 'TikTok' ? '255,255,255' : id === 'Gmail' ? '234,67,53' : '37,211,102'}, 0.28)`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px rgba(${id === 'Discord' ? '88,101,242' : id === 'Instagram' ? '225,48,108' : id === 'TikTok' ? '200,200,200' : id === 'Gmail' ? '234,67,53' : '37,211,102'}, 0.35)`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                      }}
                    >
                      {/* Shimmer */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)`,
                        }}
                      />
                      <Icon
                        style={{ color, fontSize: '1.4rem', flexShrink: 0, position: 'relative', zIndex: 1 }}
                      />
                      <span
                        style={{
                          fontFamily:    "'Space Mono', monospace",
                          fontSize:      '0.48rem',
                          letterSpacing: '0.08em',
                          color:         'rgba(255,255,255,0.6)',
                          textTransform: 'uppercase',
                          position:      'relative',
                          zIndex:        1,
                          textAlign:     'center',
                          lineHeight:    1.2,
                        }}
                      >
                        {label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <p
                  className="text-center mt-4 text-[0.58rem] font-mono leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em' }}
                >
                  Instagram & TikTok — your project brief will be auto-copied to clipboard
                </p>
              </div>
            </div>
          </div>

          {/* Bottom glow line */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), rgba(138,43,226,0.5), rgba(0,240,255,0.3), transparent)',
          }} />
        </motion.div>

      </div>
    </section>
  );
}
