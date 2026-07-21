import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageSquare, Instagram, Send } from 'lucide-react';
import { FaDiscord, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
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
    { name: 'TikTok', icon: <FaTiktok className="w-5 h-5" />, url: 'https://vm.tiktok.com/ZS9rjcYRgnGKf-kPeU2/' },
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

const ASAAS_LINK = 'https://www.asaas.com/c/fiz1h1txwm6dwdlg';
const LS_KEY     = 'heksel_sovereign_echoes';
const LB_KEY     = 'heksel_sovereign_leaderboard';

interface LeaderEntry { name: string; total: number; lastTs: number; }

const LB_SEEDS: LeaderEntry[] = [
  { name: 'Valentyna', total: 50, lastTs: 0 },
  { name: 'CyberSam',  total: 25, lastTs: 0 },
  { name: 'Merly',     total: 10, lastTs: 0 },
  { name: 'Billy',     total: 5,  lastTs: 0 },
];

/** Format a dollar total cleanly: $50, $12.50 */
const fmtTotal = (n: number) =>
  `${n % 1 === 0 ? n.toString() : n.toFixed(2)}`;


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

interface SovereignFueledEntry {
  id: string;
  amount: string;
  name: string;
  message: string;
  ts: number;
}

// ── Donation-feed helpers ────────────────────────────────────────────────
function groupEchoes(entries: SovereignEntry[]): Array<{ count: number; entry: SovereignEntry }> {
  const groups: Array<{ count: number; entry: SovereignEntry }> = [];
  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (last && last.entry.name === entry.name && last.entry.amount === entry.amount && last.entry.message === entry.message) {
      last.count++;
    } else {
      groups.push({ count: 1, entry });
    }
  }
  return groups;
}

function formatEchoDate(ts: number): string {
  const now  = Date.now();
  const diff = now - ts;
  const date = new Date(ts);
  const hh   = date.getHours().toString().padStart(2, '0');
  const mm   = date.getMinutes().toString().padStart(2, '0');
  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayName   = DAYS[date.getDay()];
  const monthName = MONTHS[date.getMonth()];
  const d       = date.getDate();
  const suffix  = d === 1 || d === 21 || d === 31 ? 'st' : d === 2 || d === 22 ? 'nd' : d === 3 || d === 23 ? 'rd' : 'th';
  const dateStr = `On ${dayName}, ${monthName} ${d}${suffix}`;

  if (diff < 60_000)       return `Right now — At ${hh}:${mm}`;
  if (diff < 3_600_000)    return `${Math.floor(diff / 60_000)} min ago — At ${hh}:${mm}`;
  if (diff < 86_400_000)   return `${Math.floor(diff / 3_600_000)}h ago — At ${hh}:${mm}`;
  const days = Math.floor(diff / 86_400_000);
  if (days === 1)          return `Yesterday — ${dateStr}`;
  if (days < 7)            return `${days} days ago — ${dateStr}`;
  if (days < 14)           return `Last week — ${dateStr}`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? 's' : ''} ago — ${dateStr}`;
}

export function HelpUsModal({
  isOpen,
  onClose,
  onFueled,
}: {
  isOpen: boolean;
  onClose: () => void;
  onFueled?: (entry: SovereignFueledEntry) => void;
}) {
  const [amount,      setAmount]      = useState('');
  const [amtError,    setAmtError]    = useState('');
  const [name,        setName]        = useState('');
  const [message,     setMessage]     = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [echoes,      setEchoes]      = useState<SovereignEntry[]>([]);

  // Load leaderboard from localStorage; seed with competition data if empty.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LB_KEY);
      if (raw) {
        const parsed: LeaderEntry[] = JSON.parse(raw);
        setLeaderboard(parsed.length ? parsed : LB_SEEDS);
      } else {
        setLeaderboard(LB_SEEDS);
        localStorage.setItem(LB_KEY, JSON.stringify(LB_SEEDS));
      }
    } catch {
      setLeaderboard(LB_SEEDS);
    }
  }, []);

  // Load echo feed (most-recent-first order from localStorage)
  const loadEchoes = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      setEchoes(raw ? (JSON.parse(raw) as SovereignEntry[]) : []);
    } catch { /* storage quota */ }
  };

  useEffect(() => { loadEchoes(); }, []);

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

    // ── 1. Persist echo feed so ImpulseToasts picks it up ────
    try {
      const existing: SovereignEntry[] = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      localStorage.setItem(LS_KEY, JSON.stringify([entry, ...existing]));
    } catch { /* quota */ }

    // ── 2. Update Sovereign Leaderboard ──────────────────────
    const nameKey = cleanName.toLowerCase();
    const draft   = leaderboard.map(e => ({ ...e }));
    const lbIdx   = draft.findIndex(e => e.name.toLowerCase() === nameKey);
    if (lbIdx >= 0) {
      draft[lbIdx].total  += num;
      draft[lbIdx].lastTs  = Date.now();
    } else {
      draft.push({ name: cleanName, total: num, lastTs: Date.now() });
    }
    // Sort: highest total first; ties broken by who donated earlier
    const sorted = draft.sort((a, b) => b.total - a.total || a.lastTs - b.lastTs);
    setLeaderboard([...sorted]);
    try { localStorage.setItem(LB_KEY, JSON.stringify(sorted)); } catch { /* quota */ }

    // ── 3. Dispatch fueled callback (triggers toast in parent) ──
    onFueled?.({ id: entry.id, amount: amtLabel, name: cleanName, message: cleanMsg, ts: entry.ts });

    // ── 4. Open Asaas link in new tab ─────────────────────────
    window.open(ASAAS_LINK, '_blank', 'noopener,noreferrer');

    // ── 4. Reload echo feed so Wall of Believers updates live ──
    loadEchoes();

    // ── 5. Reset form ─────────────────────────────────────────
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

          {/* Header image placeholder */}
          <div
            className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              minHeight: 140,
              background: 'linear-gradient(135deg, rgba(180,94,255,0.12), rgba(0,240,255,0.06))',
              border: '1px solid rgba(180,94,255,0.28)',
            }}
          >
            {/* Decorative neon lines */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(180,94,255,0.6), transparent)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)',
            }} />
            <div className="text-center px-6 py-8">
              <div className="text-3xl mb-3">🧵✦🌌</div>
              <p
                className="font-display font-black text-sm tracking-[0.08em] leading-snug uppercase"
                style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 0 20px rgba(180,94,255,0.6)' }}
              >
                FROM PIXELS TO FABRIC
              </p>
              <p
                className="font-mono text-[0.6rem] tracking-[0.18em] mt-1"
                style={{ color: 'rgba(180,94,255,0.7)' }}
              >
                Fueling the first physical drop.
              </p>
            </div>
          </div>

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

          {/* ── Sovereign Leaderboard ─────────────────────────────── */}
          <div>
            {/* Section divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(180,94,255,0.18)' }} />
              <span
                className="text-[0.58rem] font-mono uppercase tracking-[0.2em] whitespace-nowrap"
                style={{ color: 'rgba(180,94,255,0.55)' }}
              >
                👑 Sovereign Leaderboard
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(180,94,255,0.18)' }} />
            </div>

            {/* Board */}
            <div
              className="rounded-2xl overflow-hidden mt-3"
              style={{ border: '1px solid rgba(180,94,255,0.22)', background: 'rgba(0,0,0,0.45)' }}
            >
              {/* Column headers */}
              <div
                className="grid items-center px-4 py-2"
                style={{
                  gridTemplateColumns: '36px 1fr auto',
                  gap: '8px',
                  borderBottom: '1px solid rgba(180,94,255,0.12)',
                  background:   'rgba(180,94,255,0.06)',
                }}
              >
                <span className="text-[0.52rem] font-mono uppercase tracking-[0.2em] text-center" style={{ color: 'rgba(180,94,255,0.45)' }}>#</span>
                <span className="text-[0.52rem] font-mono uppercase tracking-[0.2em]"              style={{ color: 'rgba(180,94,255,0.45)' }}>Believer</span>
                <span className="text-[0.52rem] font-mono uppercase tracking-[0.2em]"              style={{ color: 'rgba(180,94,255,0.45)' }}>Total Fuel</span>
              </div>

              {/* Animated rows */}
              <div>
                <AnimatePresence initial={false}>
                  {leaderboard.map((lb, idx) => {
                    const MEDALS   = ['👑', '🥈', '🥉'] as const;
                    const isPodium = idx < 3;

                    const rowBg   = idx === 0 ? 'rgba(255,195,0,0.07)'
                                  : idx === 1 ? 'rgba(192,210,230,0.05)'
                                  : idx === 2 ? 'rgba(200,120,40,0.05)'
                                  : 'transparent';
                    const rowBdr  = idx === 0 ? 'rgba(255,195,0,0.15)'
                                  : idx === 1 ? 'rgba(192,210,230,0.1)'
                                  : idx === 2 ? 'rgba(200,130,50,0.1)'
                                  : 'rgba(180,94,255,0.07)';
                    const nameClr = idx === 0 ? '#FFD700'
                                  : idx === 1 ? 'rgba(208,220,235,1)'
                                  : idx === 2 ? 'rgba(210,145,70,1)'
                                  : 'rgba(255,255,255,0.72)';
                    const amtClr  = idx === 0 ? 'rgba(255,215,0,0.95)'
                                  : idx === 1 ? 'rgba(180,200,220,0.9)'
                                  : idx === 2 ? 'rgba(205,140,65,0.9)'
                                  : 'rgba(180,94,255,0.75)';

                    return (
                      <motion.div
                        key={lb.name}
                        layout
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          layout:   { type: 'spring', damping: 30, stiffness: 320 },
                          duration: 0.25,
                        }}
                        className="grid items-center px-4 py-2.5"
                        style={{
                          gridTemplateColumns: '36px 1fr auto',
                          gap:          '8px',
                          background:   rowBg,
                          borderBottom: `1px solid ${rowBdr}`,
                        }}
                      >
                        {/* Rank badge */}
                        <div className="flex justify-center">
                          {isPodium
                            ? <span className="text-base leading-none">{MEDALS[idx]}</span>
                            : <span className="font-mono text-[0.6rem]" style={{ color: 'rgba(180,94,255,0.38)' }}>{idx + 1}</span>
                          }
                        </div>

                        {/* Name */}
                        <span
                          className="font-display font-bold text-sm truncate"
                          style={{
                            color:      nameClr,
                            textShadow: idx === 0 ? '0 0 12px rgba(255,200,0,0.45)' : 'none',
                          }}
                        >
                          {lb.name}
                        </span>

                        {/* Total */}
                        <span
                          className="font-display font-black text-sm tabular-nums"
                          style={{ color: amtClr }}
                        >
                          {fmtTotal(lb.total)}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Competitive hint */}
            <p
              className="text-center text-[0.58rem] font-mono mt-2 tracking-wider"
              style={{ color: 'rgba(180,94,255,0.42)' }}
            >
              ✦ Fuel more to climb the ranks ✦
            </p>
          </div>

          {/* ── Wall of Believers (donation echo feed) ─────── */}
          {echoes.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px" style={{ background: 'rgba(180,94,255,0.18)' }} />
                <span className="text-[0.58rem] font-mono uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: 'rgba(180,94,255,0.55)' }}>
                  🔥 Wall of Believers
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(180,94,255,0.18)' }} />
              </div>

              <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: 200, scrollbarWidth: 'thin', scrollbarColor: 'rgba(180,94,255,0.25) transparent' }}
              >
                {groupEchoes(echoes).map(({ count, entry }, idx) => (
                  <div
                    key={`${entry.id}-${idx}`}
                    className="rounded-xl px-3 py-2.5"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(180,94,255,0.15)' }}
                  >
                    <div
                      className="text-xs font-display font-bold"
                      style={{ color: '#fff', lineHeight: 1.4 }}
                    >
                      {count > 1 ? `${count}x ` : ''}
                      <span style={{ color: 'rgba(200,150,255,1)' }}>${entry.amount}</span>
                      {entry.message ? ` — ${entry.message}` : ''}
                      <span
                        className="ml-1"
                        style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}
                      >
                        :{entry.name} 👤
                      </span>
                    </div>
                    <div
                      className="mt-0.5 font-mono"
                      style={{ fontSize: '0.52rem', color: 'rgba(180,94,255,0.55)', letterSpacing: '0.05em' }}
                    >
                      ° {formatEchoDate(entry.ts)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
    { name: 'TikTok', url: 'https://vm.tiktok.com/ZS9rjcYRgnGKf-kPeU2/' }
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

// ────────────────────────────────────────────────────────────────────────────
// ORDER FORM MODAL — "Tell Us About Your Vision"
// Triggered by "ORDER MY CUSTOMIZED SWEATSHIRT" and "💎 Create my brand"
// ────────────────────────────────────────────────────────────────────────────

const DISCORD_LINK   = 'https://discord.gg/Y8CNkKFNM';
const INSTAGRAM_LINK = 'https://www.instagram.com/hafavilha?igsh=MWplbGN6c3V6ejh0dw==';
const TIKTOK_LINK    = 'https://vm.tiktok.com/ZS9rjcYRgnGKf-kPeU2/';
const XTWITTER_LINK  = 'https://x.com/Hafavilha';
const WHATSAPP_BASE  = 'https://wa.me/5553991855262';
const GMAIL_ADDRESS  = 'hafavilhahafy@gmail.com';

// X / Twitter SVG inline (avoids extra package dependency)
function XTwitterSVG({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.35rem', height: '1.35rem', flexShrink: 0, position: 'relative', zIndex: 1, ...style }} className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.262 5.636 5.902-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const ORDER_SOCIALS = [
  { id: 'XTwitter',  Icon: XTwitterSVG, color: '#ffffff', label: 'X'         },
  { id: 'Discord',   Icon: FaDiscord,   color: '#5865F2', label: 'Discord'   },
  { id: 'Instagram', Icon: FaInstagram, color: '#E1306C', label: 'Instagram' },
  { id: 'TikTok',    Icon: FaTiktok,    color: '#ffffff', label: 'TikTok'    },
  { id: 'Gmail',     Icon: SiGmail,     color: '#EA4335', label: 'Gmail'     },
  { id: 'WhatsApp',  Icon: FaWhatsapp,  color: '#25D366', label: 'WhatsApp'  },
] as const;

type OrderSocialId = (typeof ORDER_SOCIALS)[number]['id'];

export function OrderFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name,    setName]    = useState('');
  const [idea,    setIdea]    = useState('');
  const [error,   setError]   = useState('');
  const [toast,   setToast]   = useState<string | null>(null);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) { setName(''); setIdea(''); setError(''); setToast(null); }
  }, [isOpen]);

  useEffect(() => {
    if (!toast) return;
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 4500);
    return () => { if (toastRef.current) clearTimeout(toastRef.current); };
  }, [toast]);

  const buildBrief = () => {
    const n = name.trim() || 'Anonymous';
    const i = idea.trim() || 'No description provided';
    return `Hi Heksel! My name is ${n}. My project idea: "${i}"`;
  };

  const validate = () => {
    if (!name.trim()) { setError('Please enter your name.'); return false; }
    if (!idea.trim()) { setError('Please describe your project idea.'); return false; }
    setError('');
    return true;
  };

  const handleContact = (socialId: OrderSocialId) => {
    if (!validate()) return;
    const brief = buildBrief();

    switch (socialId) {
      case 'XTwitter':
        window.open(XTWITTER_LINK, '_blank', 'noopener,noreferrer');
        break;
      case 'Discord':
        window.open(DISCORD_LINK, '_blank', 'noopener,noreferrer');
        break;
      case 'Gmail': {
        const subject = encodeURIComponent('Brand Project Inquiry — Heksel Genesis');
        const body    = encodeURIComponent(`${brief}\n\nI am interested in the Heksel Genesis brand-building services.\n\nPlease get back to me at your earliest convenience.`);
        window.open(`mailto:${GMAIL_ADDRESS}?subject=${subject}&body=${body}`);
        break;
      }
      case 'Instagram':
        navigator.clipboard.writeText(brief).then(() => {
          setToast('Project brief copied! Paste it in the DM to launch your brand. 🚀');
          setTimeout(() => window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer'), 900);
        }).catch(() => window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer'));
        break;
      case 'TikTok':
        navigator.clipboard.writeText(brief).then(() => {
          setToast('Project brief copied! Paste it in the DM to launch your brand. 🚀');
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="order-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="order-panel"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-lg relative rounded-3xl overflow-hidden"
              style={{
                background:     'rgba(8,6,24,0.97)',
                border:         '1px solid rgba(138,43,226,0.45)',
                backdropFilter: 'blur(32px)',
                boxShadow:      '0 0 80px rgba(138,43,226,0.18), 0 24px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
                maxHeight:      '90dvh',
                overflowY:      'auto',
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(138,43,226,0.9), rgba(0,240,255,0.6), rgba(138,43,226,0.9), transparent)',
              }} />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-7">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                    style={{ background: 'rgba(138,43,226,0.12)', border: '1px solid rgba(138,43,226,0.4)' }}
                  >
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(138,43,226,0.9)', textTransform: 'uppercase' }}>
                      ✦ Start Your Brand Journey
                    </span>
                  </div>
                  <h3
                    className="font-black font-['Syne',sans-serif] text-xl md:text-2xl uppercase tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.75) 50%,#8A2BE2 100%)',
                      WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Tell Us About Your Vision
                  </h3>
                  <p className="text-[0.67rem] mt-1.5 font-mono" style={{ color: 'rgba(138,43,226,0.65)', letterSpacing: '0.08em' }}>
                    Fill in the form, then choose how you want to reach us
                  </p>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[0.58rem] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: 'rgba(138,43,226,0.8)' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => { setName(e.target.value); if (error) setError(''); }}
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
                      value={idea}
                      onChange={e => { setIdea(e.target.value); if (error) setError(''); }}
                      placeholder="Describe your brand idea, style, and goals..."
                      rows={3}
                      maxLength={500}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                      style={{ background: 'rgba(138,43,226,0.07)', border: '1px solid rgba(138,43,226,0.28)', color: '#fff', fontFamily: "'DM Sans',sans-serif" }}
                      onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.7)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(138,43,226,0.1)'; }}
                      onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(138,43,226,0.28)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                    <div className="flex justify-end mt-0.5">
                      <span className="text-[0.52rem] font-mono" style={{ color: idea.length > 450 ? 'rgba(255,80,80,0.8)' : 'rgba(255,255,255,0.18)' }}>
                        {idea.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Validation error */}
                  <AnimatePresence>
                    {error && (
                      <motion.p key="err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-[0.63rem] font-mono" style={{ color: 'rgba(255,70,100,0.95)', letterSpacing: '0.06em' }}>
                        ⚠ {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Social channel selector */}
                  <div>
                    <label className="block text-[0.58rem] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: 'rgba(138,43,226,0.8)' }}>
                      <Send className="inline w-3 h-3 mr-1 -mt-0.5" />
                      Send via — Choose your channel
                    </label>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {ORDER_SOCIALS.map(({ id, Icon, color, label }) => {
                        const rgb = id === 'XTwitter' ? '255,255,255' : id === 'Discord' ? '88,101,242' : id === 'Instagram' ? '225,48,108' : id === 'TikTok' ? '220,220,220' : id === 'Gmail' ? '234,67,53' : '37,211,102';
                        return (
                          <motion.button
                            key={id}
                            type="button"
                            whileHover={{ scale: 1.09, y: -3 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleContact(id)}
                            title={`Send via ${label}`}
                            className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl relative overflow-hidden group"
                            style={{
                              background: `rgba(${rgb},0.08)`,
                              border:     `1.5px solid rgba(${rgb},0.3)`,
                              minHeight:   68,
                              cursor:     'pointer',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 18px rgba(${rgb},0.35)`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}
                          >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                              style={{ background: 'linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.05) 50%,transparent 70%)' }} />
                            <Icon style={{ color, fontSize: '1.35rem', flexShrink: 0, position: 'relative', zIndex: 1 }} />
                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.46rem', letterSpacing: '0.07em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', position: 'relative', zIndex: 1, textAlign: 'center', lineHeight: 1.2 }}>
                              {label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    <p className="text-center mt-3 text-[0.55rem] font-mono leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
                      Instagram &amp; TikTok — your brief will be auto-copied to clipboard
                    </p>
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

          {/* In-modal clipboard toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                key="order-toast"
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{ opacity: 0, y: 12, scale: 0.94 }}
                transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                onClick={() => setToast(null)}
                style={{
                  position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                  zIndex: 200, maxWidth: 420, width: 'calc(100% - 2rem)',
                  background: 'rgba(6,4,22,0.97)', border: '1.5px solid rgba(138,43,226,0.7)',
                  borderRadius: 16, padding: '14px 20px', backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 40px rgba(138,43,226,0.3), 0 8px 32px rgba(0,0,0,0.5)',
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>✦</span>
                <p style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.66rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)', lineHeight: 1.55 }}>
                  {toast}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
