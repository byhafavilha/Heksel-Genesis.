import { Shield, Check, Code, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BrandSectionProps {
  onCreateAdvance: () => void;
  onHirePremium: () => void;
  onTryFreemio?: () => void;
}

export function BrandSection({ onCreateAdvance, onHirePremium, onTryFreemio }: BrandSectionProps) {
  const { t } = useLanguage();
  const { brand } = t;

  return (
    <section id="brand" className="py-8 md:py-14 relative bg-[linear-gradient(to_bottom,#08080d,#1a0b2e)]">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md md:max-w-xl lg:max-w-4xl mx-auto px-4">

        {/* ── Header ── */}
        <div className="text-center mb-8 md:mb-12">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple/30 bg-purple/10 backdrop-blur-sm mb-4">
            <span className="text-purple text-xs">✦</span>
            <span className="text-[0.6rem] font-mono text-purple uppercase tracking-widest">{brand.badge}</span>
          </div>

          {/* Title — pequeno e legível no mobile */}
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
              className="relative px-6 py-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-white overflow-hidden group bg-black border border-white/10 w-full sm:w-auto min-h-[44px] active:scale-95 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 via-purple/20 to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
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

        {/* ── Pricing Cards ── empilhados no mobile, lado a lado no desktop */}
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
              className="cyber-btn cyber-gold w-full py-3 rounded-xl text-base relative z-10 min-h-[44px] active:scale-95 transition-all"
            >
              {brand.premium.cta}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
