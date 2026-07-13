import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  "Not just fashion. An artifact.",
  "Digital sovereignty meets physical form.",
  "Engineered for the neon generation.",
  "Code written in cotton and pixel.",
  "Made in Brazil. Built for the Metaverse."
];

export function Manifesto() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="manifesto" className="py-32 relative bg-black overflow-hidden flex items-center justify-center min-h-[50vh]">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-purple/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 text-center z-10">
        <span className="text-sm font-mono text-cyan/70 uppercase tracking-[0.3em] mb-8 block">The Genesis Directive</span>
        
        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold italic glow-text px-4 max-w-4xl leading-tight"
            >
              "{phrases[index]}"
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
