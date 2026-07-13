import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, HelpCircle, Eye, Sliders, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
}

export function Hero({ onOrderClick }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'customize' | 'live'>('customize');
  const [showCollectorInfo, setShowCollectorInfo] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="scanline" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      {/* Dark gradient radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,8,13,0.8)_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/30 bg-cyan/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-mono text-cyan uppercase tracking-wider">The Neo Collection 2026</span>
          </div>
          
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.1] tracking-tight">
            <span className="block text-white">From beginning</span>
            <span className="block glow-text">to infinity</span>
          </h1>
          
          <p className="text-lg text-white/60 font-sans max-w-md leading-relaxed">
            Engineered in Brazil for global dominance. Premium custom sweatshirts and elite digital branding services. Step into the new era of cyber-luxury.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <button onClick={onOrderClick} className="cyber-btn cyber-purple px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-sm">
              <ShoppingBag className="w-4 h-4" />
              Order My Customized Sweatshirt
            </button>
            <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="cyber-btn cyber-outline px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              Explore All
            </button>
          </div>
          
          <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10 w-full">
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-white">1K+</span>
              <span className="text-xs font-mono text-white/40 uppercase">Builders</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-white">3</span>
              <span className="text-xs font-mono text-white/40 uppercase">Lines</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-white">01</span>
              <span className="text-xs font-mono text-white/40 uppercase">Drop</span>
            </div>
          </div>
        </div>

        {/* Right Content - Product Viewer */}
        <div className="relative flex flex-col items-center">
          <div className="w-full max-w-md bg-card/40 backdrop-blur-xl border border-purple/30 rounded-3xl p-6 shadow-[0_0_50px_rgba(180,94,255,0.1)]">
            
            {/* Tabs */}
            <div className="flex bg-black/40 rounded-full p-1 mb-6 border border-white/5">
              <button 
                onClick={() => setActiveTab('customize')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-display uppercase tracking-wider transition-all ${activeTab === 'customize' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}
              >
                <Sliders className="w-3 h-3" /> Customize Canvas
              </button>
              <button 
                onClick={() => setActiveTab('live')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-display uppercase tracking-wider transition-all ${activeTab === 'live' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}
              >
                <Star className="w-3 h-3" /> Live Example
              </button>
            </div>

            {/* Product Display Area */}
            <div className="aspect-[4/5] w-full bg-[#0a0a0f] rounded-2xl border border-white/5 overflow-hidden relative flex flex-col items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-t from-purple/10 to-transparent opacity-50" />
              
              {activeTab === 'customize' ? (
                <div className="text-center p-8 z-10">
                  <div className="text-cyan mb-4 opacity-70 group-hover:opacity-100 transition-opacity font-mono text-xs whitespace-pre">
                    {`
   _____
  /     \\
 /_______\\
 |       |
 |  [ ]  |
 |       |
 \\_______/
                    `}
                  </div>
                  <p className="font-mono text-xs text-white/40">MEO-NAI BASE CANVAS<br/>READY FOR UPLOAD</p>
                </div>
              ) : (
                <div className="text-center p-8 z-10">
                  <div className="text-purple mb-4 opacity-80 group-hover:opacity-100 transition-opacity font-mono text-xs whitespace-pre">
                    {`
   _____
  /  _  \\
 /_ / \\ _\\
 | (   ) |
 |  \\_/  |
 |       |
 \\_______/
                    `}
                  </div>
                  <p className="font-mono text-xs text-white/40">MEO-NAI "TOKYO DRIFT"<br/>LIMITED EDITION</p>
                </div>
              )}
              
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30" />
              <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30" />
              <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/30" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30" />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-mono text-white/50">STARTING AT</span>
                <span className="text-xl font-display font-bold text-white">R$ 300,00</span>
              </div>
              <button 
                onClick={() => setShowCollectorInfo(!showCollectorInfo)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan/50 transition-colors group"
              >
                <HelpCircle className="w-5 h-5 text-white/60 group-hover:text-cyan" />
              </button>
            </div>
          </div>

          {/* Expandable Collector Pack Info */}
          <AnimatePresence>
            {showCollectorInfo && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 16, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-full left-0 right-0 z-20 bg-black/90 backdrop-blur-xl border border-cyan/30 rounded-2xl p-6 shadow-2xl"
              >
                <h3 className="font-display font-bold text-cyan mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4" /> THE COLLECTOR'S PACK
                </h3>
                <ul className="space-y-3 font-mono text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-purple mt-0.5">✦</span>
                    Heavyweight premium cotton base
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple mt-0.5">✦</span>
                    High-definition custom DTG print
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple mt-0.5">✦</span>
                    Personalized sealed authentic letter
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple mt-0.5">✦</span>
                    Heksel Genesis exclusive sticker pack
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple mt-0.5">✦</span>
                    Signature sensory fragrance infused
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
