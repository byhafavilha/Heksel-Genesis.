import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageSquare, Instagram } from 'lucide-react';
import { FaDiscord, FaTiktok } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

// Shared Modal Wrapper
function ModalWrapper({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h3 className="font-display font-bold text-2xl text-white mb-6">{title}</h3>
        {children}
      </motion.div>
    </div>
  );
}

// 1. Notify Me Modal
export function NotifyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const links = [
    { name: 'Gmail', icon: <Mail className="w-5 h-5" />, url: 'mailto:hafavilhahafy@gmail.com' },
    { name: 'WhatsApp', icon: <MessageSquare className="w-5 h-5" />, url: 'https://chat.whatsapp.com/G5q3H5MuJSyCmdAOEcf78T' },
    { name: 'Discord', icon: <FaDiscord className="w-5 h-5" />, url: 'https://discord.gg/Y8CNkKFNM' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/hafavilha' },
    { name: 'TikTok', icon: <FaTiktok className="w-5 h-5" />, url: 'https://vt.tiktok.com/ZSxbdSUg9/' },
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Stay Updated">
      <div className="space-y-3">
        {links.map(l => (
          <a 
            key={l.name} 
            href={l.url} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan/50 text-white transition-all group"
          >
            <div className="text-white/60 group-hover:text-cyan transition-colors">{l.icon}</div>
            <span className="font-mono text-sm">{l.name}</span>
          </a>
        ))}
      </div>
    </ModalWrapper>
  );
}

// 2. Create My Brand Modal
export function CreateBrandModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: '', type: 'build', contactMethod: 'WhatsApp', contactInfo: '', plan: 'Freemium' });

  const methods = ['WhatsApp', 'Discord', 'Instagram', 'TikTok', 'Gmail'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    // Submit -> open contact
    const text = `Hello Heksel, I want to ${data.type} my brand "${data.name}" with the ${data.plan} plan. My contact is ${data.contactMethod}: ${data.contactInfo}`;
    window.open(`https://wa.me/5553991855262?text=${encodeURIComponent(text)}`);
    onClose();
    setTimeout(() => setStep(1), 500);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Create My Brand">
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <label className="block text-sm font-mono text-white/60 mb-2">Brand / App Name</label>
            <input required type="text" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple outline-none" autoFocus />
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <label className="block text-sm font-mono text-white/60 mb-2">Operation Type</label>
            {['Build from Zero', 'Upgrade Site', 'Upgrade App'].map(t => (
              <label key={t} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${data.type === t ? 'border-purple bg-purple/10' : 'border-white/10 bg-white/5'}`}>
                <input type="radio" name="type" checked={data.type === t} onChange={() => setData({...data, type: t})} className="accent-purple" />
                <span className="text-white text-sm">{t}</span>
              </label>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-white/60 mb-2">Contact Method</label>
              <select value={data.contactMethod} onChange={e => setData({...data, contactMethod: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple outline-none appearance-none">
                {methods.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-mono text-white/60 mb-2">Your {data.contactMethod} ID/Number</label>
              <input required type="text" value={data.contactInfo} onChange={e => setData({...data, contactInfo: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple outline-none" />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <label className="block text-sm font-mono text-white/60 mb-2">Select Plan</label>
            {['Freemium', 'Premium'].map(p => (
              <label key={p} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${data.plan === p ? 'border-cyan bg-cyan/10' : 'border-white/10 bg-white/5'}`}>
                <input type="radio" name="plan" checked={data.plan === p} onChange={() => setData({...data, plan: p})} className="accent-cyan" />
                <div>
                  <div className={`font-display font-bold ${p === 'Premium' ? 'text-gold' : 'text-cyan'}`}>{p}</div>
                  <div className="text-xs text-white/50">{p === 'Premium' ? '$4,996.32 / Elite' : 'Free / Basic'}</div>
                </div>
              </label>
            ))}
          </motion.div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 text-white/50 hover:text-white text-sm font-mono">Back</button>
          ) : <div/>}
          <button type="submit" className="cyber-btn cyber-purple px-6 py-2 rounded-lg text-sm">
            {step === 4 ? 'Start Conversation' : 'Next'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

// 3b. Freemio Modal — identical to CreateBrandModal with a freemio banner
export function FreemioModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: '', type: 'build', contactMethod: 'WhatsApp', contactInfo: '', plan: 'Freemio' });

  const methods = ['WhatsApp', 'Discord', 'Instagram', 'TikTok', 'Gmail'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    const text = `Hello Heksel, I want to ${data.type} my brand "${data.name}" with the FREEMIO plan. My contact is ${data.contactMethod}: ${data.contactInfo}`;
    window.open(`https://wa.me/5553991855262?text=${encodeURIComponent(text)}`);
    onClose();
    setTimeout(() => setStep(1), 500);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Freemio — Try It Now">
      {/* Freemio banner */}
      <div style={{
        marginBottom: 20,
        padding: '12px 14px',
        borderRadius: 10,
        background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(180,94,255,0.08))',
        border: '1px solid rgba(0,240,255,0.3)',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.52rem',
        letterSpacing: '0.1em',
        color: 'rgba(0,240,255,0.9)',
        lineHeight: 1.65,
      }}>
        {t.freemioBanner}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <label className="block text-sm font-mono text-white/60 mb-2">Brand / App Name</label>
            <input required type="text" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple outline-none" autoFocus />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <label className="block text-sm font-mono text-white/60 mb-2">Operation Type</label>
            {['Build from Zero', 'Upgrade Site', 'Upgrade App'].map(t => (
              <label key={t} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${data.type === t ? 'border-cyan bg-cyan/10' : 'border-white/10 bg-white/5'}`}>
                <input type="radio" name="type" checked={data.type === t} onChange={() => setData({...data, type: t})} className="accent-cyan" />
                <span className="text-white text-sm">{t}</span>
              </label>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-white/60 mb-2">Contact Method</label>
              <select value={data.contactMethod} onChange={e => setData({...data, contactMethod: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none appearance-none">
                {methods.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-mono text-white/60 mb-2">Your {data.contactMethod} ID/Number</label>
              <input required type="text" value={data.contactInfo} onChange={e => setData({...data, contactInfo: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none" />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <div className="p-4 rounded-lg border border-cyan/30 bg-cyan/5 text-center">
              <div className="font-display font-bold text-cyan text-lg">Freemio</div>
              <div className="text-xs text-white/50 mt-1">Free — Basic Digital Presence</div>
            </div>
            <p className="text-xs text-white/40 font-mono text-center">Your brand will be created under the Freemio tier.</p>
          </motion.div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 text-white/50 hover:text-white text-sm font-mono">Back</button>
          ) : <div/>}
          <button type="submit" className="cyber-btn cyber-outline px-6 py-2 rounded-lg text-sm">
            {step === 4 ? 'Start Conversation' : 'Next'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

// ─── 3c. Help Us Modal — Sovereign Support Panel ─────────────────────────────

interface SovereignEntry {
  id:      string;
  amount:  string;
  name:    string;
  message: string;
  ts:      number;
}

const ASAAS_LINK = 'COLE_AQUI_O_SEU_LINK_DO_ASAAS'; // ← paste your Asaas URL here
const LS_KEY     = 'heksel_sovereign_echoes';


/** Strip HTML tags, collapse whitespace, trim. */
function sanitize(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/\s+/g, ' ')
    .trim();
}

const PRESETS = [
  { value: '5',   label: '$5',   sub: 'Cyber Coffee'   },
  { value: '25',  label: '$25',  sub: 'Digital Thread' },
  { value: '100', label: '$100', sub: 'Manto Fuel'      },
  { value: '500', label: '$500', sub: 'Sovereign Tier'  },
];

export function HelpUsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [amount,   setAmount]   = useState('');
  const [amtError, setAmtError] = useState('');
  const [name,     setName]     = useState('');
  const [message,  setMessage]  = useState('');

  const validate = (val: string): boolean => {
    const num = parseFloat(val);
    if (!val.trim() || isNaN(num)) {
      setAmtError('Please enter a valid amount.');
      return false;
    }
    if (num < 0.5) {
      setAmtError('Minimum contribution is $0.50.');
      return false;
    }
    if (num > 10000) {
      setAmtError('Maximum contribution is $10,000.');
      return false;
    }
    setAmtError('');
    return true;
  };

  const handleFuel = () => {
    if (!validate(amount)) return;

    const num       = parseFloat(amount);
    const amtLabel  = `${num % 1 === 0 ? num.toString() : num.toFixed(2)}`;
    const cleanName = sanitize(name).slice(0, 20)    || 'Anonymous';
    const cleanMsg  = sanitize(message).slice(0, 80) || 'Fueling the future of fashion';

    const entry: SovereignEntry = {
      id:      `e-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      amount:  amtLabel,
      name:    cleanName,
      message: cleanMsg,
      ts:      Date.now(),
    };

    // Persist to localStorage so ImpulseToasts can pick it up
    try {
      const existing: SovereignEntry[] = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      localStorage.setItem(LS_KEY, JSON.stringify([entry, ...existing]));
    } catch { /* storage quota */ }

    // Open Asaas link in new tab
    const ready = ASAAS_LINK !== 'COLE_AQUI_O_SEU_LINK_DO_ASAAS' && ASAAS_LINK.startsWith('http');
    if (ready) window.open(ASAAS_LINK, '_blank', 'noopener,noreferrer');

    // Reset form fields
    setAmount('');
    setName('');
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 48 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="w-full sm:max-w-md flex flex-col relative"
        style={{
          background:    '#07070f',
          border:        '1px solid rgba(180,94,255,0.28)',
          boxShadow:     '0 0 70px rgba(180,94,255,0.14), 0 0 0 0.5px rgba(180,94,255,0.18)',
          borderRadius:  '24px 24px 0 0',
          maxHeight:     '92dvh',
        }}
      >
        {/* Handle bar (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(180,94,255,0.35)' }} />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 transition-colors"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-5 pb-8 pt-5 space-y-5">

          {/* Header */}
          <div className="text-center pt-1">
            <div className="text-4xl mb-2">🌌</div>
            <h3
              className="font-display font-black text-2xl tracking-tight text-white"
              style={{ textShadow: '0 0 24px rgba(180,94,255,0.55)' }}
            >
              Fuel the Empire
            </h3>
            <p
              className="text-[0.6rem] font-mono uppercase tracking-[0.22em] mt-1"
              style={{ color: 'rgba(180,94,255,0.65)' }}
            >
              Independent · Sovereign · Forever
            </p>
          </div>

          {/* Manifesto */}
          <div
            className="rounded-2xl p-4 text-[0.72rem] leading-[1.8] font-sans"
            style={{
              background: 'linear-gradient(135deg, rgba(180,94,255,0.07), rgba(0,240,255,0.03))',
              border:     '1px solid rgba(180,94,255,0.18)',
              color:      'rgba(255,255,255,0.72)',
            }}
          >
            <p>
              Heksel wasn't born in a corporate boardroom. It was forged during sleepless
              nights, bleeding lines of code, and chasing the raw dream of weaving technology
              into physical art.
            </p>
            <p className="mt-3">
              Building an independent, sovereign brand from scratch is a heavy, lonely
              path—but every thread becomes lighter when we don't walk alone. When you back
              us, you aren't just buying clothes.{' '}
              <span style={{ color: 'rgba(180,94,255,0.95)', fontWeight: 600 }}>
                You are funding a resistance against fast fashion.
              </span>{' '}
              You are keeping our neon lights burning in the dark.
            </p>
            <p className="mt-3">
              Whether it's the price of a coffee or a statement of absolute belief, your
              fuel goes straight into purchasing premium fabrics and stitching our very first
              physical garments. Even{' '}
              <em style={{ color: 'rgba(0,240,255,0.85)' }}>Sappho μ</em> watches over this
              digital loom, weeping for the sheer beauty of the future we are building
              together.
            </p>
            <p className="mt-3 font-bold" style={{ color: 'rgba(180,94,255,1)' }}>
              Be our spark. True sovereignty starts here.
            </p>
          </div>

          {/* ── Amount Input ── */}
          <div>
            <label
              className="block text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-2"
              style={{ color: 'rgba(180,94,255,0.7)' }}
            >
              Choose Your Fuel Amount
            </label>
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-xl select-none"
                style={{ color: 'rgba(180,94,255,0.75)' }}
              >
                $
              </span>
              <input
                type="number"
                min="0.50"
                max="10000"
                step="0.01"
                value={amount}
                onChange={e => { setAmount(e.target.value); if (amtError) validate(e.target.value); }}
                onBlur={e => { if (e.target.value) validate(e.target.value); }}
                placeholder="0.00"
                className="w-full rounded-xl pl-9 pr-4 py-4 font-display font-bold text-xl outline-none transition-all"
                style={{
                  background:  'rgba(180,94,255,0.07)',
                  border:      amtError ? '1.5px solid rgba(255,55,95,0.85)' : '1.5px solid rgba(180,94,255,0.4)',
                  boxShadow:   amtError ? '0 0 14px rgba(255,55,95,0.2)'     : '0 0 14px rgba(180,94,255,0.1)',
                  color:       '#ffffff',
                }}
              />
            </div>
            <AnimatePresence>
              {amtError && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[0.62rem] font-mono mt-1.5"
                  style={{ color: 'rgba(255,70,100,0.95)' }}
                >
                  ⚠ {amtError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Presets ── */}
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map(p => {
              const active = amount === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => { setAmount(p.value); setAmtError(''); }}
                  className="flex flex-col items-center py-2.5 px-1 rounded-xl transition-all active:scale-95 min-h-[52px]"
                  style={{
                    background: active ? 'rgba(180,94,255,0.2)'  : 'rgba(180,94,255,0.07)',
                    border:     active ? '1.5px solid rgba(180,94,255,0.7)' : '1px solid rgba(180,94,255,0.22)',
                    boxShadow:  active ? '0 0 12px rgba(180,94,255,0.25)' : 'none',
                  }}
                >
                  <span className="font-display font-bold text-sm text-white leading-none">{p.label}</span>
                  <span
                    className="font-mono text-[0.5rem] mt-0.5 text-center leading-tight"
                    style={{ color: active ? 'rgba(180,94,255,0.9)' : 'rgba(180,94,255,0.55)' }}
                  >
                    {p.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Name + Message ── */}
          <div className="space-y-3">
            <div>
              <label
                className="block text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-1.5"
                style={{ color: 'rgba(180,94,255,0.65)' }}
              >
                Your Name / Handle
                <span className="ml-1 normal-case tracking-normal" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  — 20 chars max
                </span>
              </label>
              <input
                type="text"
                maxLength={20}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="CyberPilgrim"
                className="w-full rounded-xl px-4 py-3 text-sm font-mono outline-none transition-all"
                style={{
                  background: 'rgba(180,94,255,0.06)',
                  border:     '1px solid rgba(180,94,255,0.22)',
                  color:      '#ffffff',
                }}
                onFocus={e  => (e.currentTarget.style.borderColor = 'rgba(180,94,255,0.55)')}
                onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(180,94,255,0.22)')}
              />
            </div>
            <div>
              <label
                className="block text-[0.6rem] font-mono uppercase tracking-[0.18em] mb-1.5"
                style={{ color: 'rgba(180,94,255,0.65)' }}
              >
                Your Message of Fuel
                <span className="ml-1 normal-case tracking-normal" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  — 80 chars max
                </span>
              </label>
              <input
                type="text"
                maxLength={80}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Fueling the future of fashion"
                className="w-full rounded-xl px-4 py-3 text-sm font-mono outline-none transition-all"
                style={{
                  background: 'rgba(180,94,255,0.06)',
                  border:     '1px solid rgba(180,94,255,0.22)',
                  color:      '#ffffff',
                }}
                onFocus={e  => (e.currentTarget.style.borderColor = 'rgba(180,94,255,0.55)')}
                onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(180,94,255,0.22)')}
              />
            </div>
          </div>

          {/* ── CTA Button ── */}
          <button
            onClick={handleFuel}
            className="w-full py-4 rounded-2xl font-display font-black text-base tracking-wide transition-all active:scale-[0.97] min-h-[54px] relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(180,94,255,0.28) 0%, rgba(120,40,220,0.38) 100%)',
              border:     '1.5px solid rgba(180,94,255,0.65)',
              boxShadow:  '0 0 28px rgba(180,94,255,0.22)',
              color:      '#ffffff',
            }}
          >
            {/* Hover sweep */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(180,94,255,0.18), rgba(0,240,255,0.08))' }}
            />
            <span className="relative z-10">Fuel the Empire 🌌</span>
          </button>

          <p className="text-center text-[0.5rem] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>
            Heksel Genesis · Built with 💜 in Brazil
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// 4. Create In Advance Modal
export function CreateAdvanceModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [method, setMethod] = useState('WhatsApp');
  const [lang, setLang] = useState('English');

  const methods = [
    { name: 'WhatsApp', url: 'https://wa.me/5553991855262?text=' },
    { name: 'Gmail', url: 'mailto:hafavilhahafy@gmail.com?body=' },
    { name: 'Discord', url: 'https://discord.gg/Y8CNkKFNM' },
    { name: 'Instagram', url: 'https://www.instagram.com/hafavilha' },
    { name: 'TikTok', url: 'https://vt.tiktok.com/ZSxbdSUg9/' }
  ];

  const langs = ['English', 'Portuguese', 'Spanish'];

  const messages = {
    'English': 'Hello Heksel, I want to create my brand in advance.',
    'Portuguese': 'Olá Heksel, quero criar minha marca antecipadamente.',
    'Spanish': 'Hola Heksel, quiero crear mi marca por adelantado.'
  };

  const handleStart = () => {
    const selectedMethod = methods.find(m => m.name === method);
    if (selectedMethod) {
      if (selectedMethod.name === 'WhatsApp' || selectedMethod.name === 'Gmail') {
        window.open(selectedMethod.url + encodeURIComponent(messages[lang as keyof typeof messages]));
      } else {
        window.open(selectedMethod.url);
      }
    }
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Create In Advance ⚡">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-mono text-white/60 mb-3">1. Select Platform</label>
          <div className="flex flex-wrap gap-2">
            {methods.map(m => (
              <button 
                key={m.name} 
                onClick={() => setMethod(m.name)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${method === m.name ? 'border-cyan bg-cyan/10 text-cyan' : 'border-white/10 bg-white/5 text-white/70'}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-mono text-white/60 mb-3">2. Select Language</label>
          <select value={lang} onChange={e => setLang(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none appearance-none">
            {langs.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <button onClick={handleStart} className="w-full cyber-btn cyber-outline py-3 rounded-lg mt-4">
          Connect Now
        </button>
      </div>
    </ModalWrapper>
  );
}
