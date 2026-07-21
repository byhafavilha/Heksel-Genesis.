import { Mail } from 'lucide-react';
import { FaTiktok, FaInstagram, FaWhatsapp, FaDiscord, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SOCIAL_LINKS = [
  {
    href: 'https://t.me/hafavilha',
    icon: <FaTelegram className="w-4 h-4" />,
    label: 'Telegram',
  },
  {
    href: 'https://x.com/Hafavilha',
    icon: <FaXTwitter className="w-4 h-4" />,
    label: 'X / Twitter',
  },
  {
    href: 'https://www.instagram.com/hafavilha?igsh=MWplbGN6c3V6ejh0dw==',
    icon: <FaInstagram className="w-4 h-4" />,
    label: 'Instagram',
  },
  {
    href: 'https://vm.tiktok.com/ZS9rjcYRgnGKf-kPeU2/',
    icon: <FaTiktok className="w-4 h-4" />,
    label: 'TikTok',
  },
  {
    href: 'https://discord.gg/Y8CNkKFNM',
    icon: <FaDiscord className="w-4 h-4" />,
    label: 'Discord',
  },
  {
    href: `mailto:hafavilhahafy@gmail.com?subject=${encodeURIComponent('Contact — A Hafavilha')}&body=${encodeURIComponent('Hello A Hafavilha team,\n\nI would like to get in touch regarding your services.\n\nBest regards,')}`,
    icon: <Mail className="w-4 h-4" />,
    label: 'Gmail',
  },
  {
    href: `https://wa.me/5553991855262?text=${encodeURIComponent('Hello A Hafavilha! I found you through your website and would love to learn more about your services. 🚀')}`,
    icon: <FaWhatsapp className="w-4 h-4" />,
    label: 'WhatsApp',
  },
];

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo Col */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-6">
              {/* Infinity knot brand mark */}
              <span
                className="font-display font-black text-2xl tracking-widest"
                style={{
                  background: 'linear-gradient(135deg,#c9a84c,#f5d97f,#c9a84c)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: 'none',
                  letterSpacing: '0.12em',
                }}
              >
                ∞ A HAFAVILHA
              </span>
            </a>
            <p className="text-white/50 font-sans text-sm max-w-sm mb-8 leading-relaxed">
              Dubai luxury-grade cyberpunk fashion &amp; digital branding studio.
              Building elite digital identities — from Brazil to the world.
            </p>
            
            {/* Social links — all channels */}
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noreferrer'}
                  title={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:-translate-y-1 hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all"
                >
                  {icon}
                </a>
              ))}
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
            © 2026 A HAFAVILHA — ALL RIGHTS RESERVED.
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
