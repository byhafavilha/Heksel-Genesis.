import { motion } from 'framer-motion';

const emojis = [
  { icon: '❤️', color: 'rgba(255, 59, 48, 0.5)' },
  { icon: '🧡', color: 'rgba(255, 149, 0, 0.5)' },
  { icon: '💛', color: 'rgba(255, 204, 0, 0.5)' },
  { icon: '💚', color: 'rgba(52, 199, 89, 0.5)' },
  { icon: '💙', color: 'rgba(0, 122, 255, 0.5)' },
  { icon: '💜', color: 'rgba(175, 82, 222, 0.5)' }
];

export function SafeSpace() {
  return (
    <section className="py-24 relative border-y border-white/5 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
        
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
          {emojis.map((emoji, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }}
              className="text-3xl md:text-5xl cursor-default transition-all duration-300 hover:scale-125"
              style={{
                textShadow: `0 0 0 transparent`
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textShadow = `0 0 20px ${emoji.color}`;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textShadow = `0 0 0 transparent`;
              }}
            >
              {emoji.icon}
            </motion.div>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Safe Space
        </h2>
        
        <p className="text-white/60 font-sans max-w-lg mx-auto leading-relaxed">
          Heksel Genesis is an inclusive zone. We build for everyone regardless of gender, orientation, or origin. In the digital frontier, we are all just nodes in the network. Respect the code.
        </p>
      </div>
    </section>
  );
}
