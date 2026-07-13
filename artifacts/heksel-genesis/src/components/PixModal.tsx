import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, QrCode } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateSuccess: () => void;
}

const logs = [
  "💸 [FINANCIAL INBOUND] Validating transaction...",
  "🔐 [ENCRYPTION] Securing payload...",
  "🏭 [HEKSEL FACTORY] Spinning production...",
  "🧵 [MATERIAL] Picking premium cotton...",
  "🖨️ [PRINT HEAD] Calibrating..."
];

// Simple UUID generator for demo
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function fakeCRC() {
  return Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
}

export function PixModal({ isOpen, onClose, onSimulateSuccess }: PixModalProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState("");

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setLoadingStep(0);
      setIsLoading(true);
      setTimeLeft(600);
      setCopied(false);
      setPixCode(`00020126580014br.gov.bcb.pix0136${generateUUID()}5204000053039865802BR5913HekselGenesis6008SaoPaulo62290525HEKSEL${Date.now().toString(36).toUpperCase()}6304${fakeCRC()}`);
      
      // Sequence logs
      const interval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev >= logs.length - 1) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Timer
  useEffect(() => {
    if (!isOpen || isLoading || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen, isLoading, timeLeft]);

  const handleCopy = () => {
    if (timeLeft <= 0) return;
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  let timerColor = 'border-cyan text-cyan';
  if (timeLeft <= 300) timerColor = 'border-gold text-gold';
  if (timeLeft <= 120) timerColor = 'border-red-500 text-red-500 animate-pulse';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-left font-mono text-sm max-w-md w-full p-8"
          >
            {logs.slice(0, loadingStep + 1).map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className={i === loadingStep ? "text-cyan" : "text-white/40"}
              >
                {log}
              </motion.div>
            ))}
            <div className="mt-4 flex gap-1 items-center h-4 text-cyan">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="receipt"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-lg bg-[#0a0a0f] border border-cyan/50 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,240,255,0.15)] relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl text-cyan mb-2">🎉 ORDER CONFIRMED</h2>
              <p className="text-white/60 font-sans text-sm">Escaneie o QR Code ou use o código Pix abaixo para pagar</p>
            </div>

            {/* Fake QR Code */}
            <div className="bg-white p-4 rounded-xl w-[200px] h-[200px] mx-auto mb-8 relative">
              <div className="absolute inset-4 grid grid-cols-[repeat(21,1fr)] grid-rows-[repeat(21,1fr)] gap-[1px]">
                {/* Generated deterministic pattern based on time/render */}
                {Array.from({ length: 441 }).map((_, i) => {
                  const row = Math.floor(i / 21);
                  const col = i % 21;
                  // Finder patterns
                  const isTL = row < 7 && col < 7;
                  const isTR = row < 7 && col > 13;
                  const isBL = row > 13 && col < 7;
                  
                  if (isTL || isTR || isBL) {
                    if (row === 0 || row === 6 || col === 0 || col === 6 || (isTR && (row === 0 || row===6 || col===14 || col===20)) || (isBL && (row===14 || row===20 || col===0 || col===6))) return <div key={i} className="bg-black"></div>;
                    if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return <div key={i} className="bg-black"></div>;
                    if (isTR && row >= 2 && row <= 4 && col >= 16 && col <= 18) return <div key={i} className="bg-black"></div>;
                    if (isBL && row >= 16 && row <= 18 && col >= 2 && col <= 4) return <div key={i} className="bg-black"></div>;
                    return <div key={i} className="bg-white"></div>;
                  }
                  
                  // Random-ish data
                  const isBlack = (row * 3 + col * 7) % 2 === 0;
                  return <div key={i} className={isBlack ? "bg-black" : "bg-white"}></div>;
                })}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-mono text-white/50 mb-2 block">PIX COPIA E COLA</label>
              <input 
                type="text" 
                readOnly 
                value={pixCode}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 font-mono text-xs text-cyan focus:outline-none"
              />
            </div>

            <button 
              onClick={handleCopy}
              disabled={timeLeft <= 0}
              className="w-full py-3 mb-8 bg-white/5 border border-white/20 hover:bg-white/10 text-white rounded-xl font-display uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              {copied ? "✅ COPIADO!" : "📋 COPIAR CÓDIGO PIX"}
            </button>

            {/* Timer */}
            <div className={`p-4 border rounded-xl text-center mb-6 transition-colors ${timerColor}`}>
              <div className="text-[10px] font-mono uppercase tracking-wider mb-1">⚡ TEMPO RESTANTE PARA PAGAMENTO</div>
              {timeLeft > 0 ? (
                <div className="font-mono text-3xl font-bold">{timeString}</div>
              ) : (
                <div className="font-mono text-sm text-red-500">⏰ TEMPO EXPIRADO — Gere um novo código</div>
              )}
            </div>

            {/* Sim Button */}
            {timeLeft > 0 && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                onClick={() => {
                  onSimulateSuccess();
                  onClose();
                }}
                className="w-full py-2 border border-green-500/50 text-green-400 hover:bg-green-500/10 rounded-lg text-xs font-mono uppercase transition-colors"
              >
                SIMULAR PAGAMENTO CONFIRMADO
              </motion.button>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
