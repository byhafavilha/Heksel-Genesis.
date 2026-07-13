import { Bell } from 'lucide-react';

const products = [
  { id: 1, name: "NEO-KAI 01 FOR HIKING", type: "shoes" },
  { id: 2, name: "NEO-KAI 01 FOR RACING", type: "shoes" },
  { id: 3, name: "NEO-KAI 01 FOR ACADEMIC", type: "shoes" },
  { id: 4, name: "NEO-KAI 01 FOR FOOTBALL", type: "shoes" },
  { id: 5, name: "NEO-WAI 01 SLIPPER FOR LEISURE", type: "shoes" },
  { id: 6, name: "NEO-WAI 02 SPORTS FLIP-FLOPS", type: "shoes" },
  { id: 7, name: "NEO-LAI 01 SLIPPER WITH A SHORT BRIM", type: "shoes" },
  { id: 8, name: "NEO-LAI 02 SLIPPER WITH LONG BRIM", type: "shoes" },
  { id: 9, name: "NEO-MAI 01 HIGH HEELS", type: "shoes" },
  { id: 10, name: "NEO-MAI 02 LOW HEELS", type: "shoes" },
  { id: 11, name: "NEO-VAI 01 LEATHER BOOT", type: "shoes" }
];

interface CollectionProps {
  onNotifyMe: () => void;
}

export function Collection({ onNotifyMe }: CollectionProps) {
  return (
    <section id="collection" className="py-32 relative bg-black">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">The Archive</h2>
            <p className="font-mono text-sm text-white/50 max-w-md">Upcoming hardware drops. Manufactured in the physical realm. Authenticated on the network.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="font-mono text-xs text-cyan uppercase">System Updating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-card/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col group hover:-translate-y-2 hover:border-cyan/50 hover:shadow-[0_10px_30px_rgba(0,240,255,0.1)] transition-all duration-300"
            >
              {/* Product Placeholder Image Area */}
              <div className="aspect-[4/3] bg-black/50 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-mono text-xs text-white/20">NO IMAGE DATA</span>
                
                {/* Shortly Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-cyan/10 border border-cyan rounded text-[10px] font-mono text-cyan animate-pulse">
                  SHORTLY
                </div>
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-6 flex-grow leading-tight">
                {product.name}
              </h3>

              <button 
                onClick={onNotifyMe}
                className="w-full py-3 rounded-lg border border-white/20 text-white/70 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-colors group-hover:border-cyan/50"
              >
                <Bell className="w-4 h-4" />
                Notify Me
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
