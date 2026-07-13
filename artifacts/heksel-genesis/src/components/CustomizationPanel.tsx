import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, MapPin, User, Mail, CreditCard, Info } from 'lucide-react';

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CustomizationPanel({ isOpen, onClose, onCheckout }: CustomizationPanelProps) {
  const [color, setColor] = useState('#000000');
  const [style, setStyle] = useState('Classic');
  const [position, setPosition] = useState('Center');
  const [size, setSize] = useState('G');
  
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const sizes = ['P', 'M', 'G', 'GG', 'EXG'];
  const styles = ['Classic', 'Oversized', 'Hoodie'];
  const positions = ['Center', 'Left Chest', 'Full Back'];

  const handleImageUpload = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (side === 'front') setFrontImage(e.target?.result as string);
        else setBackImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full bg-[#0c0c14] border-y border-purple/30 relative z-30 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-12 relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Product Configuration */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-bold text-2xl text-white mb-2">Configure Your Artifact</h2>
                  <p className="text-sm font-mono text-white/40">SYSTEM: MEO-NAI CUSTOM ENGINE v1.0</p>
                </div>

                {/* Color */}
                <div className="space-y-3">
                  <label className="text-xs font-display uppercase tracking-wider text-white/60">Base Color</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={color} 
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                    />
                    <span className="font-mono text-sm text-white/80 uppercase">{color}</span>
                  </div>
                </div>

                {/* Style */}
                <div className="space-y-3">
                  <label className="text-xs font-display uppercase tracking-wider text-white/60">Silhouette</label>
                  <div className="flex flex-wrap gap-2">
                    {styles.map(s => (
                      <button 
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${style === s ? 'bg-cyan/20 border-cyan text-cyan border' : 'bg-white/5 border-transparent text-white/60 border hover:bg-white/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-display uppercase tracking-wider text-white/60">Size</label>
                    <a href="#" className="text-xs text-cyan hover:underline font-mono">Size Guide</a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(s => (
                      <button 
                        key={s}
                        onClick={() => setSize(s)}
                        className={`w-12 h-12 rounded-lg text-sm font-mono transition-all ${size === s ? 'bg-purple/20 border-purple text-purple border' : 'bg-white/5 border-transparent text-white/60 border hover:bg-white/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Art Upload */}
                <div className="space-y-4">
                  <label className="text-xs font-display uppercase tracking-wider text-white/60">Artwork Upload</label>
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Front Upload */}
                    <div className="relative aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-cyan/50 transition-colors overflow-hidden group flex flex-col items-center justify-center bg-black/20">
                      {frontImage ? (
                        <>
                          <img src={frontImage} alt="Front art" className="absolute inset-0 w-full h-full object-contain p-2" />
                          <button onClick={() => setFrontImage(null)} className="absolute top-2 right-2 p-1 bg-black/80 rounded text-red-400 hover:text-red-300 z-10"><X className="w-4 h-4"/></button>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-white/40 mb-2 group-hover:text-cyan transition-colors" />
                          <span className="text-xs font-mono text-white/40">FRONT ART</span>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload('front', e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </>
                      )}
                    </div>

                    {/* Back Upload */}
                    <div className="relative aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-purple/50 transition-colors overflow-hidden group flex flex-col items-center justify-center bg-black/20">
                      {backImage ? (
                        <>
                          <img src={backImage} alt="Back art" className="absolute inset-0 w-full h-full object-contain p-2" />
                          <button onClick={() => setBackImage(null)} className="absolute top-2 right-2 p-1 bg-black/80 rounded text-red-400 hover:text-red-300 z-10"><X className="w-4 h-4"/></button>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-white/40 mb-2 group-hover:text-purple transition-colors" />
                          <span className="text-xs font-mono text-white/40">BACK ART</span>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload('back', e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </>
                      )}
                    </div>

                  </div>
                </div>

                {/* Position */}
                <div className="space-y-3">
                  <label className="text-xs font-display uppercase tracking-wider text-white/60">Print Position</label>
                  <div className="flex flex-wrap gap-2">
                    {positions.map(p => (
                      <button 
                        key={p}
                        onClick={() => setPosition(p)}
                        className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${position === p ? 'bg-cyan/20 border-cyan text-cyan border' : 'bg-white/5 border-transparent text-white/60 border hover:bg-white/10'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Shipping Form */}
              <div className="bg-black/40 rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan" /> Shipping & Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-white/50">FULL NAME</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-colors" placeholder="John Doe" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-white/50">EMAIL</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-colors" placeholder="nexus@cyber.net" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/50 flex items-center gap-2">
                        CPF
                        <div className="relative group">
                          <Info className="w-3 h-3 text-white/30 cursor-help" />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-black border border-white/20 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                            Required for shipping invoice within Brazil.
                          </div>
                        </div>
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-colors font-mono" placeholder="000.000.000-00" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/50">STREET ADDRESS</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-colors" placeholder="Rua..." />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1 md:col-span-1">
                        <label className="text-xs font-mono text-white/50">CITY</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-colors" />
                      </div>
                      <div className="space-y-1 md:col-span-1">
                        <label className="text-xs font-mono text-white/50">POSTAL CODE</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-colors font-mono" />
                      </div>
                      <div className="space-y-1 col-span-2 md:col-span-1">
                        <label className="text-xs font-mono text-white/50">COUNTRY</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-colors appearance-none">
                          <option value="BR">Brazil</option>
                          <option value="US">United States</option>
                          <option value="EU">Europe</option>
                          <option value="OT">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white/60 font-mono text-sm">TOTAL AMOUNT</span>
                    <span className="text-2xl font-display font-bold text-white">R$ 300,00</span>
                  </div>
                  <button 
                    onClick={onCheckout}
                    className="w-full cyber-btn cyber-purple py-4 rounded-xl text-lg flex items-center justify-center gap-2 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">✦</span>
                    COMPRAR AGORA
                    <span className="group-hover:scale-110 transition-transform">✦</span>
                  </button>
                  <p className="text-center text-xs text-white/30 font-mono mt-3">Pagamento via PIX • Produção em 7-14 dias úteis</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
