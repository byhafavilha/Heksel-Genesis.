import { Zap, Shield, Rocket, Check, Code, Cpu } from 'lucide-react';

interface BrandSectionProps {
  onCreateAdvance: () => void;
  onHirePremium: () => void;
}

export function BrandSection({ onCreateAdvance, onHirePremium }: BrandSectionProps) {
  return (
    <section id="brand" className="py-32 relative bg-[linear-gradient(to_bottom,#08080d,#1a0b2e)]">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple/30 bg-purple/10 backdrop-blur-sm mb-6">
            <span className="text-purple">✦</span>
            <span className="text-xs font-mono text-purple uppercase tracking-widest">Heksel Services</span>
          </div>
          
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-6 tracking-tight">
            <span className="block text-white">Want a website like this?</span>
            <span className="block glow-gold mt-2">Build your brand.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button 
              onClick={onCreateAdvance}
              className="relative px-8 py-4 rounded-xl text-sm font-display font-bold uppercase tracking-wider text-white overflow-hidden group bg-black border border-white/10 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 via-purple/20 to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan via-purple to-cyan rounded-xl opacity-20 group-hover:opacity-50 blur transition-opacity" />
              <span className="relative z-10">Create in Advance ⚡</span>
            </button>
            
            <button 
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="cyber-btn cyber-purple px-8 py-4 rounded-xl text-sm w-full sm:w-auto"
            >
              ✦ Create My Brand ✦
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div id="plans" className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-24">
          
          {/* Freemium Card */}
          <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-cyan/50 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Code className="w-32 h-32" />
            </div>
            
            <div className="mb-8 relative z-10">
              <span className="inline-block px-3 py-1 rounded bg-cyan/10 text-cyan text-xs font-mono mb-4 border border-cyan/20">ENTRY LEVEL</span>
              <h3 className="text-2xl font-display font-bold text-white mb-2">Freemium</h3>
              <div className="text-4xl font-mono text-white">Free</div>
              <p className="text-sm text-white/50 mt-4">Basic digital presence for upcoming builders.</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              {[
                'Standard Notion/Linktree setup',
                'Basic color palette selection',
                'Community Discord access',
                'Standard support (48h)'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <Check className="w-5 h-5 text-cyan shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-4 rounded-xl border border-white/20 text-white font-display uppercase hover:bg-white/5 transition-colors relative z-10">
              Try It Now
            </button>
          </div>

          {/* Premium Card */}
          <div className="bg-black/60 backdrop-blur-xl border-2 border-gold/40 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-gold hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Cpu className="w-32 h-32" />
            </div>
            
            <div className="mb-8 relative z-10">
              <div className="flex justify-between items-start">
                <span className="inline-block px-3 py-1 rounded bg-gold/10 text-gold text-xs font-mono mb-4 border border-gold/30 flex items-center gap-2">
                  <Shield className="w-3 h-3" /> ELITE LEVEL
                </span>
                <span className="animate-pulse flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">Premium</h3>
              <div className="flex items-end gap-2">
                <div className="text-4xl font-mono text-gold glow-gold">$4,996.32</div>
                <div className="text-sm text-white/40 mb-1">/ one-time</div>
              </div>
              <p className="text-sm text-white/50 mt-4">Full bespoke cyberpunk digital identity & web platform.</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              {[
                'Full React/Vite web application',
                'Bespoke visual identity & logo design',
                'Advanced animations & interactions',
                'FÁBRICA DO TROSK·IA Access',
                'Priority VIP support line',
                'Custom hardware welcome package'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="text-gold mt-0.5">✦</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button onClick={onHirePremium} className="cyber-btn cyber-gold w-full py-4 rounded-xl text-lg relative z-10">
              Hire Premium
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
