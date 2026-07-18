import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageSquare, Instagram, Copy, Check, Heart, ExternalLink } from 'lucide-react';
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

// 3c. Help Us Modal — Pix + PayPal support
export function HelpUsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const PIX_KEY = '3d1b7fde-f1fd-406d-9d36-140751f1af91';

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="">
      {/* Header com gradiente */}
      <div className="text-center mb-6 -mt-2">
        <div className="text-3xl mb-2">💜</div>
        <h3 className="font-display font-black text-xl text-white tracking-tight">
          Apoie a Heksel Genesis
        </h3>
        <p className="text-xs font-mono text-white/40 tracking-widest uppercase mt-1">
          Support an independent brand
        </p>
      </div>

      {/* Mensagem */}
      <div
        className="rounded-xl p-4 mb-5 text-xs leading-relaxed font-sans text-white/70"
        style={{
          background: 'rgba(180,94,255,0.07)',
          border: '1px solid rgba(180,94,255,0.2)',
        }}
      >
        <Heart className="w-3.5 h-3.5 inline text-purple-400 mr-1.5 -mt-0.5" />
        A Heksel é uma marca autoral 100% independente, construída do zero com amor,
        arte e tecnologia. Cada contribuição ajuda diretamente na produção de novas
        peças, no desenvolvimento da plataforma e na manutenção do ecossistema digital.
        <span className="block mt-2 text-purple-400/80 font-mono">
          Obrigado por fazer parte desta jornada. 🚀
        </span>
      </div>

      {/* Pix */}
      <div className="mb-4">
        <p
          className="text-[0.6rem] font-mono text-white/40 uppercase tracking-widest mb-2"
        >
          🇧🇷 Pix — Apoio Nacional
        </p>
        <div
          className="flex items-center gap-2 rounded-xl p-3"
          style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)' }}
        >
          <code className="flex-1 text-[0.65rem] text-cyan-300/90 font-mono break-all leading-relaxed">
            {PIX_KEY}
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-lg transition-all active:scale-90 min-h-[36px] min-w-[36px] flex items-center justify-center"
            style={{
              background: copied ? 'rgba(0,200,100,0.15)' : 'rgba(0,240,255,0.1)',
              border: copied ? '1px solid rgba(0,200,100,0.4)' : '1px solid rgba(0,240,255,0.25)',
            }}
            title="Copiar chave Pix"
          >
            {copied
              ? <Check className="w-4 h-4 text-green-400" />
              : <Copy className="w-4 h-4 text-cyan-400" />
            }
          </button>
        </div>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.6rem] text-green-400 font-mono mt-1.5 text-center"
          >
            ✓ Chave copiada! Abra o app do banco e cole no Pix.
          </motion.p>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[0.58rem] font-mono text-white/30 uppercase tracking-widest">ou</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Stripe — International */}
      <div className="mb-2">
        {/* Label */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-[0.6rem] font-mono text-white/40 uppercase tracking-widest">
            🌍 Stripe — Global Checkout
          </p>
          {/* Accepted methods badges */}
          <div className="flex items-center gap-1">
            {['💳', '🍎', '支付宝'].map(badge => (
              <span
                key={badge}
                className="text-[0.6rem] px-1.5 py-0.5 rounded font-mono"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Stripe button */}
        {/* ⚙️  To activate: replace STRIPE_PAYMENT_LINK below with your real Stripe Payment Link URL */}
        {/* e.g. "https://buy.stripe.com/xxxxxxxxxxxxxxxx"                                          */}
        {(() => {
          const STRIPE_PAYMENT_LINK = ''; // TODO: paste your Stripe Payment Link here
          const isReady = STRIPE_PAYMENT_LINK.startsWith('https://');

          return (
            <a
              href={isReady ? STRIPE_PAYMENT_LINK : undefined}
              onClick={!isReady ? (e) => e.preventDefault() : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!isReady}
              className="group relative flex items-center justify-between w-full px-4 py-3.5 rounded-xl min-h-[52px] overflow-hidden transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #0a0a14 0%, #12102a 100%)',
                border: '1px solid rgba(99,91,255,0.45)',
                boxShadow: '0 0 18px rgba(99,91,255,0.15), inset 0 1px 0 rgba(255,255,255,0.04)',
                cursor: isReady ? 'pointer' : 'default',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                if (!isReady) return;
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,91,255,0.8)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(99,91,255,0.35), inset 0 1px 0 rgba(255,255,255,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,91,255,0.45)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(99,91,255,0.15), inset 0 1px 0 rgba(255,255,255,0.04)';
              }}
            >
              {/* Glow sweep on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,91,255,0.08), transparent)' }}
              />

              {/* Left: Stripe wordmark + description */}
              <div className="flex items-center gap-3 relative z-10">
                {/* Stripe "S" icon — inline SVG matches Stripe's official mark */}
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <rect width="28" height="28" rx="6" fill="#635BFF"/>
                  <path d="M13.26 10.8c0-.78.64-1.08 1.7-1.08 1.52 0 3.44.46 4.96 1.28V7.06A13.18 13.18 0 0 0 14.96 6C11.3 6 8.8 7.88 8.8 11.04c0 4.84 6.66 4.06 6.66 6.14 0 .92-.8 1.22-1.92 1.22-1.66 0-3.78-.68-5.46-1.6V20.9c1.86.8 3.74 1.14 5.46 1.14C17.3 22 20 20.2 20 16.98c-.02-5.22-6.74-4.3-6.74-6.18Z" fill="white"/>
                </svg>
                <div>
                  <div className="text-xs font-display font-bold text-white tracking-wider leading-none mb-0.5">
                    {isReady ? 'Support via Stripe' : 'Stripe Checkout'}
                  </div>
                  <div className="text-[0.55rem] font-mono tracking-wide leading-none" style={{ color: 'rgba(99,91,255,0.85)' }}>
                    {isReady
                      ? 'Credit card · Apple Pay · Alipay · Global'
                      : 'Link coming soon — Pix disponível acima'}
                  </div>
                </div>
              </div>

              {/* Right: arrow or lock */}
              <div className="relative z-10 shrink-0">
                {isReady
                  ? <ExternalLink className="w-4 h-4" style={{ color: 'rgba(99,91,255,0.8)' }} />
                  : <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>🔒</span>
                }
              </div>
            </a>
          );
        })()}

        {/* Accepted methods — fine print */}
        <p className="text-[0.55rem] font-mono text-white/25 mt-2 text-center tracking-wide">
          Visa · Mastercard · Amex · Apple Pay · Google Pay · Alipay · WeChat Pay
        </p>
      </div>

      <p className="text-center text-[0.55rem] text-white/20 font-mono mt-4 tracking-widest uppercase">
        Heksel Genesis · Made with 💜 in Brazil
      </p>
    </ModalWrapper>
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
