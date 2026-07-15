import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, ExternalLink } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateSuccess: () => void;
}

// ==========================================================
// ⚙️ CONFIGURAÇÃO DE PAGAMENTO REAL DA HEKSEL GENESIS
// ==========================================================
const LINK_PAGAMENTO_ASAAS = "https://www.asaas.com/c/pene9j40zamre2ci";
const SUA_CHAVE_PIX_REAL = "9ef8eb7f-94d7-4009-8fe0-c971038cbece"; // Sua chave aleatória do Asaas
const NOME_DO_BENEFICIARIO = "HEKSEL GENESIS"; 
const CIDADE_DO_BENEFICIARIO = "SAO PAULO"; 
const VALOR_DA_COBRANCA = "300.00"; 
// ==========================================================

const logs = [
  "💸 [FINANCIAL INBOUND] Validating transaction...",
  "🔐 [ENCRYPTION] Securing payload...",
  "🏭 [HEKSEL FACTORY] Spinning production...",
  "🧵 [MATERIAL] Picking premium cotton...",
  "🖨️ [PRINT HEAD] Calibrating..."
];

function gerarPixCopiaECola(chave: string, nome: string, cidade: string, valor: string) {
  const formatField = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  };

  const merchantAccountInfo = formatField('01', '36') + formatField('01', chave);
  const payloadFormat = formatField('00', '01');
  const categoryCode = formatField('52', '0000');
  const currencyCode = formatField('53', '986');
  const transactionAmount = formatField('54', valor);
  const countryCode = formatField('58', 'BR');
  const merchantName = formatField('59', nome.slice(0, 25));
  const merchantCity = formatField('60', cidade.slice(0, 15));
  const additionalData = formatField('62', formatField('05', 'HEKSELGENESIS'));

  const payload = payloadFormat + 
                  formatField('26', merchantAccountInfo) + 
                  categoryCode + 
                  currencyCode + 
                  transactionAmount + 
                  countryCode + 
                  merchantName + 
                  merchantCity + 
                  additionalData + 
                  "6304"; 

  let crc = 0xFFFF;
  for (let c = 0; c < payload.length; c++) {
    crc ^= payload.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  const crcHex = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return payload + crcHex;
}

export function PixModal({ isOpen, onClose, onSimulateSuccess }: PixModalProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); 
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLoadingStep(0);
      setIsLoading(true);
      setTimeLeft(600);
      setCopied(false);

      const realPix = gerarPixCopiaECola(
        SUA_CHAVE_PIX_REAL, 
        NOME_DO_BENEFICIARIO, 
        CIDADE_DO_BENEFICIARIO, 
        VALOR_DA_COBRANCA
      );
      setPixCode(realPix);

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
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0network')}`;

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

            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-3xl text-cyan mb-2">🎉 VALOR DA COMPRA: R$ 300,00</h2>
              <p className="text-white/60 font-sans text-sm">Escolha a sua forma de pagamento preferida:</p>
            </div>

            {/* 💳 BOTÃO DE PAGAMENTO DIRETO DO ASAAS (MÉTODO PREMIUM) */}
            <a 
              href={LINK_PAGAMENTO_ASAAS} 
              target="_bin" 
              rel="noopener noreferrer"
              className="w-full py-4 mb-6 bg-gradient-to-r from-cyan to-purple-600 hover:from-cyan/80 hover:to-purple-700 text-white rounded-xl font-display font-bold uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transform hover:-translate-y-0.5"
            >
              <ExternalLink className="w-5 h-5" />
              💳 PAGAR COM CARTÃO / PIX / BOLETO
            </a>

            <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-white/40 font-mono text-xs">OU SE PREFERIR PIX DIRETO</span>
                <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-xl w-[190px] h-[190px] mx-auto mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {pixCode && (
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pixCode)}`} 
                  alt="QR Code Pix" 
                  className="w-[160px] h-[160px]"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="text-[10px] font-mono text-white/50 mb-1.5 block uppercase">PIX COPIA E COLA</label>
              <input 
                type="text" 
                readOnly 
                value={pixCode}
                onClick={handleCopy}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 font-mono text-[10px] text-cyan focus:outline-none cursor-pointer"
              />
            </div>

            <button 
              onClick={handleCopy}
              disabled={timeLeft <= 0}
              className="w-full py-2.5 mb-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-display text-sm uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "COPIADO!" : "COPIAR CÓDIGO PIX"}
            </button>

            {/* Timer */}
            <div className={`p-3 border rounded-xl text-center mb-6 transition-colors text-xs ${timerColor}`}>
              <div className="text-[9px] font-mono uppercase tracking-wider mb-0.5">⚡ TEMPO RESTANTE PARA PAGAMENTO</div>
              {timeLeft > 0 ? (
                <div className="font-mono text-2xl font-bold">{timeString}</div>
              ) : (
                <div className="font-mono text-xs text-red-500">⏰ TEMPO EXPIRADO — Gere um novo código</div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
