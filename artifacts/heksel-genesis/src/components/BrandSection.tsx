import { useState, useRef, useEffect } from 'react';
import { Shield, Check, Code, Cpu, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDiscord, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';

// ── Contact constants ──────────────────────────────────────────────────────
const DISCORD_LINK   = 'https://discord.gg/Y8CNkKFNM';
const INSTAGRAM_LINK = 'https://www.instagram.com/hafavilha?igsh=MWplbGN6c3V6ejh0dw==';
const TIKTOK_LINK    = 'https://vm.tiktok.com/ZS9rjcYRgnGKf-kPeU2/';
const TWITTER_LINK   = 'https://x.com/Hafavilha';
const WHATSAPP_BASE  = 'https://wa.me/5553991855262';
const GMAIL_ADDRESS  = 'hafavilhahafy@gmail.com';

// ── Social channels ──────────────────────────────────────────────────────
const SOCIALS = [
  { id: 'Discord',   Icon: FaDiscord,   color: '#5865F2', rgb: '88,101,242',  label: 'Discord'   },
  { id: 'Twitter',   Icon: FaXTwitter,  color: '#e7e9ea', rgb: '231,233,234', label: 'X'         },
  { id: 'Instagram', Icon: FaInstagram, color: '#E1306C', rgb: '225,48,108',  label: 'Instagram' },
  { id: 'TikTok',    Icon: FaTiktok,    color: '#ffffff', rgb: '220,220,220', label: 'TikTok'    },
  { id: 'Gmail',     Icon: SiGmail,     color: '#EA4335', rgb: '234,67,53',   label: 'Gmail'     },
  { id: 'WhatsApp',  Icon: FaWhatsapp,  color: '#25D366', rgb: '37,211,102',  label: 'WhatsApp'  },
] as const;

type SocialId = (typeof SOCIALS)[number]['id'];

interface BrandSectionProps {
  onCreateAdvance: () => void;
  onHirePremium?:  () => void;
  onTryFreemio?:   () => void;
}

export function BrandSection({ onCreateAdvance }: BrandSectionProps) {
  const { t } = useLanguage();
  const { brand } = t;

  // ── Plan selection state ───────────────────────────────────────────────
  const [selectedPlan, setSelectedPlan] = useState<'freemio' | 'preemio' | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // ── Form state ─────────────────────────────────────────────────────────
  const [formName,  setFormName]  = useState('');
  const [formIdea,  setFormIdea]  = useState('');
  const [formError, setFormError] = useState('');
  const [toastMsg,  setToastMsg]  = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelectPlan = (plan: 'freemio' | 'preemio') => {
    setSelectedPlan(plan);
    // Scroll to form after state update renders
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMsg) return;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 4500);
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, [toastMsg]);

  const buildBrief = () => {
    const plan = selectedPlan === 'freemio' ? 'Freemio (free tier)' : 'Preemio (elite tier)';
    const name = formName.trim() || 'Anonymous';
    const idea = formIdea.trim() || 'No description provided';
    return `Hi Heksel! My name is ${name}. I selected the ${plan}. My project idea: "${idea}"`;
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
      case 'Discord':
        window.open(DISCORD_LINK, '_blank', 'noopener,noreferrer');
        break;
      case 'Twitter':
        window.open(TWITTER_LINK, '_blank', 'noopener,noreferrer');
        break;
      case 'Gmail': {
        const subject = encodeURIComponent('Brand Project Inquiry — Heksel Genesis');
        const body    = encodeURIComponent(`${brief}\n\nI am interested in the Heksel Genesis brand-building services. Please reach out at your earliest convenience.`);
        window.open(`mailto:${GMAIL_ADDRESS}?subject=${subject}&body=${body}`);
        break;
      }
      case 'Instagram':
        navigator.clipboard.writeText(brief).then(() => {
          setToastMsg('Project brief copied! Paste it in the DM to launch your brand. 🚀');
          setTimeout(() => window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer'), 900);
        }).catch(() => window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer'));
        break;
      case 'TikTok':
        navigator.clipboard.writeText(brief).then(() => {
          setToastMsg('Project brief copied! Paste it in the DM to launch your brand. 🚀');
          setTimeout(() => window.open(TIKTOK_LINK, '_blank', 'noopener,noreferrer'), 900);
        }).catch(() => window.open(TIKTOK_LINK, '_blank', 'noopener,noreferrer'));
        break;
      case 'WhatsApp': {
        const msg = encodeURIComponent(`${brief}\n\nI would like to start building my brand with Heksel Genesis. 🚀`);
        window.open(`${WHATSAPP_BASE}?text=${msg}`, '_blank', 'noopener,noreferrer');
        break;
      }
    }
  };

  return (
    <section id="brand" className="py-8 md:py-14 relative bg-[linear-gradient(to_bottom,#08080d,#1a0b2e)]">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* ── Clipboard toast ── */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            key="brand-toast"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            onClick={() => setToastMsg(null)}
            style={{
              position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              zIndex: 999, maxWidth: 440, width: 'calc(100% - 2rem)',
              background: 'rgba(6,4,22,0.97)', border: '1.5px solid rgba(138,43,226,0.7)',
              borderRadius: 16, padding: '14px 20px', backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(138,43,226,0.3), 0 8px 32px rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>✦</span>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.66rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.92)', lineHeight: 1.55 }}>
              {toastMsg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md md:max-w-xl lg:max-w-4xl mx-auto px-4">

        {/* ── Section Header ── */}
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            {/* Gold shimmer — Create in Advance */}
            <button
              onClick={onCreateAdvance}
              className="btn-gold-premium px-6 py-3 rounded-xl text-xs font-display font-black uppercase tracking-wider w-full sm:w-auto min-h-[44px] active:scale-[0.97] transition-all duration-200"
            >
              <div className="gold-shine" />
              <span className="relative z-10">{brand.btnAdvance}</span>
            </button>

            {/* Scroll to plans */}
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

          {/* Freemio */}
          <div className="flex-1 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-7 flex flex-col relative overflow-hidden group hover:border-cyan/50 transition-colors">
            <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none"><Code className="w-20 h-20" /></div>
            <div className="mb-5 relative z-10">
              <span className="inline-block px-2.5 py-0.5 rounded bg-cyan/10 text-cyan text-[0.6rem] font-mono mb-3 border border-cyan/20">{brand.freemium.badge}</span>
              <h3 className="text-lg font-display font-bold text-white mb-1">{brand.freemium.name}</h3>
              <div className="text-3xl font-mono text-white">{brand.freemium.price}</div>
              <p className="text-xs text-white/50 mt-3 leading-relaxed">{brand.freemium.desc}</p>
            </div>
            <ul className="space-y-2.5 mb-6 flex-grow relative z-10">
              {brand.freemium.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/70">
                  <Check className="w-4 h-4 text-cyan shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan('freemio')}
              className={`w-full py-3 rounded-xl border text-sm font-display uppercase transition-all relative z-10 min-h-[44px] active:scale-95 ${
                selectedPlan === 'freemio'
                  ? 'border-cyan/60 bg-cyan/15 text-cyan shadow-[0_0_16px_rgba(0,240,255,0.2)]'
                  : 'border-white/20 text-white hover:bg-white/5'
              }`}
            >
              {selectedPlan === 'freemio' ? '✓ Selected' : brand.freemium.cta}
            </button>
          </div>

          {/* Preemio */}
          <div className="flex-1 bg-black/60 backdrop-blur-xl border-2 border-gold/40 rounded-2xl p-5 md:p-7 flex flex-col relative overflow-hidden group hover:border-gold hover:shadow-[0_0_24px_rgba(201,168,76,0.15)] transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 p-5 opacity-5 pointer-events-none"><Cpu className="w-20 h-20" /></div>
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
              {brand.premium.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/90">
                  <span className="text-gold mt-0.5 shrink-0">✦</span>{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan('preemio')}
              className={`btn-gold-premium w-full py-3 rounded-xl text-sm font-display font-black uppercase tracking-wider relative z-10 min-h-[44px] active:scale-[0.97] transition-all duration-200 ${
                selectedPlan === 'preemio' ? 'ring-2 ring-gold/60 ring-offset-1 ring-offset-black' : ''
              }`}
            >
              <div className="gold-shine" />
              <span className="relative z-10">{selectedPlan === 'preemio' ? '✓ Selected' : brand.premium.cta}</span>
            </button>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            INLINE ORDER FORM — revealed only after plan selection
        ══════════════════════════════════════════════════════════ */}
        <div ref={formRef} />

        <AnimatePresence>
          {selectedPlan !== null && (
            <motion.div
              key="order-form"
              initial={{ opacity: 0, y: 32, height: 0 }}
              animate={{ opacity: 1, y: 0,  height: 'auto' }}
              exit={{ opacity: 0, y: 16, height: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="mt-10 relative rounded-3xl overflow-hidden"
                style={{
                  background:     'rgba(8,6,24,0.92)',
                  border:         '1px solid rgba(138,43,226,0.4)',
                  backdropFilter: 'blur(28px)',
                  boxShadow:      '0 0 70px rgba(138,43,226,0.13), inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                {/* Top glow line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg,transparent,rgba(138,43,226,0.85),rgba(0,240,255,0.5),rgba(138,43,226,0.85),transparent)',
                }} />

                <div className="p-6 md:p-10">
                  {/* Form header */}
                  <div className="text-center mb-8">
                    {/* Selected plan badge */}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[0.6rem] font-mono uppercase tracking-[0.18em]"
                      style={{
                        background: selectedPlan === 'preemio' ? 'rgba(201,168,76,0.12)' : 'rgba(0,240,255,0.08)',
                        border:     selectedPlan === 'preemio' ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(0,240,255,0.3)',
                        color:      selectedPlan === 'preemio' ? 'rgba(201,168,76,0.95)' : 'rgba(0,240,255,0.9)',
                      }}
                    >
                      {selectedPlan === 'preemio' ? '✦ Preemio — Elite Level Selected' : '◆ Freemio — Free Tier Selected'}
                    </div>

                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ml-2"
                      style={{ background: 'rgba(138,43,226,0.1)', border: '1px solid rgba(138,43,226,0.4)' }}
                    >
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(138,43,226,0.9)', textTransform: 'uppercase' }}>
                        ✦ Start Your Brand Journey
                      </span>
                    </div>

                    <h3
                      className="font-black font-['Syne',sans-serif] text-xl md:text-2xl uppercase tracking-tight mt-2"
                      style={{
                        background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.75) 50%,#8A2BE2 100%)',
                        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Tell Us About Your Vision
                    </h3>
                    <p className="text-[0.65rem] mt-1.5 font-mono" style={{ color: 'rgba(138,43,226,0.65)', letterSpacing: '0.08em' }}>
                      Fill in the form, then tap your preferred channel to reach us
                    </p>
                  </div>

                  {/* Fields */}
                  <div className="space-y-5 max-w-lg mx-auto">

                    {/* Name */}
                    <div>
                      <label className="block text-[0.58rem] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: 'rgba(138,43,226,0.8)' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={e => { setFormName(e.target.value); if (formError) setFormError(''); }}
                        placeholder="e.g. Alex Supreme"
                        maxLength={60}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        style={{ background: 'rgba(138,43,226,0.07)', border: '1px solid rgba(138,43,226,0.28)', color: '#fff', fontFamily: "'DM Sans',sans-serif" }}
                        onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.7)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(138,43,226,0.1)'; }}
                        onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.28)'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Project Idea */}
                    <div>
                      <label className="block text-[0.58rem] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: 'rgba(138,43,226,0.8)' }}>
                        Project Idea *
                      </label>
                      <textarea
                        value={formIdea}
                        onChange={e => { setFormIdea(e.target.value); if (formError) setFormError(''); }}
                        placeholder="Describe your brand idea, aesthetic, and goals..."
                        rows={3}
                        maxLength={500}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                        style={{ background: 'rgba(138,43,226,0.07)', border: '1px solid rgba(138,43,226,0.28)', color: '#fff', fontFamily: "'DM Sans',sans-serif" }}
                        onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.7)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(138,43,226,0.1)'; }}
                        onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.28)'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                      <div className="flex justify-end mt-0.5">
                        <span className="text-[0.52rem] font-mono" style={{ color: formIdea.length > 450 ? 'rgba(255,80,80,0.8)' : 'rgba(255,255,255,0.18)' }}>
                          {formIdea.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Validation error */}
                    <AnimatePresence>
                      {formError && (
                        <motion.p key="form-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="text-[0.63rem] font-mono" style={{ color: 'rgba(255,70,100,0.95)', letterSpacing: '0.06em' }}>
                          ⚠ {formError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Social channel selector */}
                    <div>
                      <label className="block text-[0.58rem] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: 'rgba(138,43,226,0.8)' }}>
                        <Send className="inline w-3 h-3 mr-1 -mt-0.5" />
                        Send via — Choose your channel
                      </label>

                      <div className="grid grid-cols-6 gap-2">
                        {SOCIALS.map(({ id, Icon, color, rgb, label }) => (
                          <motion.button
                            key={id}
                            type="button"
                            whileHover={{ scale: 1.09, y: -3 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleContact(id)}
                            title={`Contact via ${label}`}
                            className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl relative overflow-hidden group"
                            style={{
                              background: `rgba(${rgb},0.09)`,
                              border:     `1.5px solid rgba(${rgb},0.3)`,
                              minHeight:   70,
                              cursor:     'pointer',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 18px rgba(${rgb},0.38)`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}
                          >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                              style={{ background: 'linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.05) 50%,transparent 70%)' }} />
                            <Icon style={{ color, fontSize: '1.25rem', flexShrink: 0, position: 'relative', zIndex: 1 }} />
                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.44rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', position: 'relative', zIndex: 1, textAlign: 'center', lineHeight: 1.2 }}>
                              {label}
                            </span>
                          </motion.button>
                        ))}
                      </div>

                      <p className="text-center mt-3 text-[0.53rem] font-mono leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
                        Instagram &amp; TikTok — your brief will be auto-copied to clipboard · Discord &amp; X open direct
                      </p>
                    </div>

                    {/* Change plan */}
                    <div className="flex justify-center pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan(null)}
                        className="text-[0.58rem] font-mono uppercase tracking-[0.1em] transition-colors"
                        style={{ color: 'rgba(255,255,255,0.22)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.22)'; }}
                      >
                        ← Change plan selection
                      </button>
                    </div>

                  </div>
                </div>

                {/* Bottom glow line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg,transparent,rgba(0,240,255,0.3),rgba(138,43,226,0.5),rgba(0,240,255,0.3),transparent)',
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
