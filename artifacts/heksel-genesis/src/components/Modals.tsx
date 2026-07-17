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
