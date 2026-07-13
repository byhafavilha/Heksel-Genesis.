import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, Search, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onNotifyMe: () => void;
}

export function Navbar({ onNotifyMe }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Collection', href: '#collection' },
    { name: 'Create', href: '#create' },
    { name: 'Manifesto', href: '#manifesto' }
  ];

  const languages = ['Português', 'English', 'Español', '日本語', 'Français'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
          <img
            src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/heksel-logo.png`}
            alt="Heksel Genesis"
            style={{
              height: 42,
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.5)) drop-shadow(0 0 16px rgba(180,94,255,0.4))',
              transition: 'filter 0.3s ease',
            }}
            className="nav-logo"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.name} href={link.href} className="font-sans text-sm font-medium text-white/70 hover:text-white transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <Globe className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-card border border-white/10 rounded-xl shadow-2xl p-2"
                >
                  <div className="relative mb-2">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
                    <input type="text" placeholder="Search..." className="w-full bg-black/50 border border-white/5 rounded-lg py-1.5 pl-8 pr-2 text-sm text-white focus:outline-none focus:border-cyan/50" />
                  </div>
                  <div className="flex flex-col">
                    {languages.map(lang => (
                      <button key={lang} className="text-left px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                        {lang}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button onClick={onNotifyMe} className="px-4 py-2 rounded-full border border-white/20 text-sm font-display uppercase hover:border-white transition-colors">
            Notify Me
          </button>
          
          <button onClick={() => document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' })} className="cyber-btn cyber-gold px-5 py-2 rounded-full text-sm">
            VIP Access
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {links.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-display font-medium text-white/80 hover:text-cyan flex items-center justify-between">
                  {link.name}
                  <ChevronRight className="w-4 h-4" />
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <button onClick={() => { setMobileMenuOpen(false); onNotifyMe(); }} className="w-full py-3 border border-white/20 rounded-lg font-display uppercase tracking-wider text-sm">
                Notify Me
              </button>
              <button onClick={() => { setMobileMenuOpen(false); document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full py-3 cyber-btn cyber-gold rounded-lg font-display uppercase tracking-wider text-sm">
                VIP Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
