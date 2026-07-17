import { Instagram, Mail, MessageSquare } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo Col */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <span className="font-display font-black text-3xl tracking-tighter text-white">HEKSEL</span>
              <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#00f0ff]" />
            </a>
            <p className="text-white/50 font-sans text-sm max-w-sm mb-8 leading-relaxed">
              Cyberpunk luxury fashion & digital branding studio. Building the aesthetic of the new internet from Brazil to the world.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/hafavilha" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:-translate-y-1 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://vt.tiktok.com/ZSxbdSUg9/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:-translate-y-1 transition-all">
                <FaTiktok className="w-4 h-4" />
              </a>
              <a href="mailto:hafavilhahafy@gmail.com" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:-translate-y-1 transition-all">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://wa.me/5553991855262" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:-translate-y-1 transition-all">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="font-mono text-sm text-white mb-6 uppercase tracking-wider">Collection</h4>
            <ul className="space-y-4">
              {['Meo-Nai Custom', 'Neo-Kai Series', 'Neo-Wai Series', 'Neo-Mai Series'].map(link => (
                <li key={link}><a href="#collection" className="text-white/50 text-sm hover:text-cyan transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm text-white mb-6 uppercase tracking-wider">Studio</h4>
            <ul className="space-y-4">
              {['Brand Identity', 'Web Development', 'Case Studies'].map(link => (
                <li key={link}><a href="#brand" className="text-white/50 text-sm hover:text-purple transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm text-white mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-4">
              {['Shipping Policy', 'Returns', 'Size Guide', 'Contact Us'].map(link => (
                <li key={link}><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-white/30">
            © 2026 HEKSEL IMPERIUM — ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4 font-mono text-xs text-white/30">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
