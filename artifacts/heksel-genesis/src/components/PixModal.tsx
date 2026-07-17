import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, ExternalLink, ChevronRight, User, CreditCard, Mail, Phone } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateSuccess: () => void;
}

// ==========================================================
// ⚙️ CONFIGURAÇÃO DE PAGAMENTO REAL DA HEKSEL GENESIS
// ==========================================================
const LINK_PAGAMENTO_ASAAS = "https://www.asaas.com/c/pene9j40zamre2ci";
const SUA_CHAVE_PIX_REAL = "3d1b7fde-f1fd-406d-9d36-140751f1af91";
const NOME_DO_BENEFICIARIO = "HEKSEL GENESIS";
const CIDADE_DO_BENEFICIARIO = "SAO PAULO";
const VALOR_DA_COBRANCA = "300.00";
// ==========================================================

const logs = [
  "💸 [FINANCIAL INBOUND] Validating transaction...",
  "🔐 [ENCRYPTION] Securing payload...",
  "🏭 [HEKSEL FACTORY] Spinning production...",
  "🧵 [MATERIAL] Picking premium cotton...",
  "🖨️ [PRINT HEAD] Calibrating...",
];

// Gerador Real de Pix Estático com CRC16 CCITT
function gerarPixCopiaECola(chave: string, nome: string, cidade: string, valor: string) {
  const formatField = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  };
  const gui = formatField('00', 'br.gov.bcb.pix');
  const key = formatField('01', chave);
  const merchantAccountInfo = gui + key;
  const payloadFormat = formatField('00', '01');
  const categoryCode = formatField('52', '0000');
  const currencyCode = formatField('53', '986');
  const transactionAmount = formatField('54', valor);
  const countryCode = formatField('58', 'BR');
  const merchantName = formatField('59', nome.substring(0, 25));
  const merchantCity = formatField('60', cidade.substring(0, 15));
  const additionalData = formatField('62', formatField('05', 'HEKSELGENESIS'));
  const payload =
    payloadFormat +
    formatField('26', merchantAccountInfo) +
    categoryCode + currencyCode + transactionAmount +
    countryCode + merchantName + merchantCity + additionalData + "6304";
  let crc = 0xFFFF;
  for (let c = 0; c < payload.length; c++) {
    crc ^= payload.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return payload + (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// CPF/CNPJ mask helper
function maskDoc(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  // CNPJ: 00.000.000/0000-00
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim().replace(/-$/, '');
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim().replace(/-$/, '');
}

type ModalStep = 'form' | 'loading' | 'qr';

interface FormData {
  nome: string;
  doc: string;
  email: string;
  phone: string;
}

interface FieldErrors {
  nome?: string;
  doc?: string;
  email?: string;
  phone?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '12px 14px',
  fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem',
  color: '#fff', outline: 'none', transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Space Mono',monospace", fontSize: '0.58rem',
  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em',
  textTransform: 'uppercase', marginBottom: 6, display: 'block',
};

export function PixModal({ isOpen, onClose, onSimulateSuccess }: PixModalProps) {
  const [step, setStep] = useState<ModalStep>('form');
  const [form, setForm] = useState<FormData>({ nome: '', doc: '', email: '', phone: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [loadingStep, setLoadingStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState('');

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setForm({ nome: '', doc: '', email: '', phone: '' });
      setErrors({});
      setFocusedField(null);
      setCopied(false);
    }
  }, [isOpen]);

  // Loading animation → QR
  useEffect(() => {
    if (step !== 'loading') return;
    setLoadingStep(0);
    setTimeLeft(600);
    const realPix = gerarPixCopiaECola(SUA_CHAVE_PIX_REAL, NOME_DO_BENEFICIARIO, CIDADE_DO_BENEFICIARIO, VALOR_DA_COBRANCA);
    setPixCode(realPix);
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= logs.length - 1) {
          clearInterval(interval);
          setTimeout(() => setStep('qr'), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [step]);

  // QR countdown
  useEffect(() => {
    if (step !== 'qr' || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!form.nome.trim() || form.nome.trim().split(' ').length < 2)
      newErrors.nome = 'Informe nome e sobrenome';
    const docDigits = form.doc.replace(/\D/g, '');
    if (docDigits.length !== 11 && docDigits.length !== 14)
      newErrors.doc = 'CPF (11 dígitos) ou CNPJ (14 dígitos)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'E-mail inválido';
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11)
      newErrors.phone = 'Telefone inválido (DDD + número)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) setStep('loading');
  };

  const handleCopy = () => {
    if (timeLeft <= 0) return;
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  let timerColor = '#00f0ff';
  if (timeLeft <= 300) timerColor = '#c9a84c';
  if (timeLeft <= 120) timerColor = '#ff2d55';

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <AnimatePresence mode="wait">

        {/* ── STEP: FORM ── */}
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{
              width: '100%', maxWidth: 480,
              background: '#08080f',
              border: '1.5px solid rgba(180,94,255,0.35)',
              borderRadius: 24, padding: '32px 32px 28px',
              boxShadow: '0 0 60px rgba(180,94,255,0.15), 0 0 120px rgba(0,0,0,0.6)',
              maxHeight: '90vh', overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button onClick={onClose} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s',
            }}>
              <X size={20} />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.58rem',
                color: 'rgba(180,94,255,0.8)', letterSpacing: '0.22em',
                textTransform: 'uppercase', marginBottom: 10,
              }}>
                🔐 Checkout Seguro — Heksel Genesis
              </div>
              <div style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.6rem',
                background: 'linear-gradient(135deg,#b45eff,#00f0ff)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                marginBottom: 8,
              }}>
                R$ 300,00
              </div>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.5,
              }}>
                Preencha seus dados para gerar o Pix dinâmico seguro via Asaas.
              </p>
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Nome */}
              <div>
                <label style={labelStyle}>
                  <User size={10} style={{ display: 'inline', marginRight: 6 }} />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ana Souza"
                  value={form.nome}
                  onChange={(e) => setForm(f => ({ ...f, nome: e.target.value }))}
                  onFocus={() => setFocusedField('nome')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle,
                    borderColor: errors.nome
                      ? 'rgba(255,45,85,0.7)'
                      : focusedField === 'nome'
                      ? 'rgba(180,94,255,0.7)'
                      : 'rgba(255,255,255,0.1)',
                  }}
                />
                {errors.nome && (
                  <span style={{
                    fontFamily: "'Space Mono',monospace", fontSize: '0.5rem',
                    color: '#ff2d55', marginTop: 5, display: 'block',
                  }}>
                    ⚠ {errors.nome}
                  </span>
                )}
              </div>

              {/* CPF/CNPJ */}
              <div>
                <label style={labelStyle}>
                  <CreditCard size={10} style={{ display: 'inline', marginRight: 6 }} />
                  CPF ou CNPJ *
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={form.doc}
                  onChange={(e) => setForm(f => ({ ...f, doc: maskDoc(e.target.value) }))}
                  onFocus={() => setFocusedField('doc')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={18}
                  style={{
                    ...inputStyle,
                    fontFamily: "'Space Mono',monospace",
                    borderColor: errors.doc
                      ? 'rgba(255,45,85,0.7)'
                      : focusedField === 'doc'
                      ? 'rgba(180,94,255,0.7)'
                      : 'rgba(255,255,255,0.1)',
                  }}
                />
                {errors.doc && (
                  <span style={{
                    fontFamily: "'Space Mono',monospace", fontSize: '0.5rem',
                    color: '#ff2d55', marginTop: 5, display: 'block',
                  }}>
                    ⚠ {errors.doc}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>
                  <Mail size={10} style={{ display: 'inline', marginRight: 6 }} />
                  E-mail *
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle,
                    borderColor: errors.email
                      ? 'rgba(255,45,85,0.7)'
                      : focusedField === 'email'
                      ? 'rgba(180,94,255,0.7)'
                      : 'rgba(255,255,255,0.1)',
                  }}
                />
                {errors.email && (
                  <span style={{
                    fontFamily: "'Space Mono',monospace", fontSize: '0.5rem',
                    color: '#ff2d55', marginTop: 5, display: 'block',
                  }}>
                    ⚠ {errors.email}
                  </span>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label style={labelStyle}>
                  <Phone size={10} style={{ display: 'inline', marginRight: 6 }} />
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={form.phone}
                  onChange={(e) => setForm(f => ({ ...f, phone: maskPhone(e.target.value) }))}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={15}
                  style={{
                    ...inputStyle,
                    fontFamily: "'Space Mono',monospace",
                    borderColor: errors.phone
                      ? 'rgba(255,45,85,0.7)'
                      : focusedField === 'phone'
                      ? 'rgba(180,94,255,0.7)'
                      : 'rgba(255,255,255,0.1)',
                  }}
                />
                {errors.phone && (
                  <span style={{
                    fontFamily: "'Space Mono',monospace", fontSize: '0.5rem',
                    color: '#ff2d55', marginTop: 5, display: 'block',
                  }}>
                    ⚠ {errors.phone}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleSubmit}
              style={{
                marginTop: 24, width: '100%', padding: '14px 20px',
                background: 'linear-gradient(135deg, #b45eff, #6b21a8)',
                border: 'none', borderRadius: 12, cursor: 'pointer',
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '0.82rem',
                color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 0 30px rgba(180,94,255,0.35)',
                transition: 'all 0.3s',
              }}
            >
              Gerar Pix Seguro
              <ChevronRight size={16} />
            </button>

            {/* Alt: card payment */}
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.48rem',
                color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
                marginBottom: 10,
              }}>
                — OU PAGUE DIRETO —
              </div>
              <a
                href={LINK_PAGAMENTO_ASAAS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '0.7rem',
                  color: '#00f0ff', letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  border: '1px solid rgba(0,240,255,0.3)',
                  borderRadius: 10,
                  background: 'rgba(0,240,255,0.06)',
                  transition: 'all 0.2s',
                }}
              >
                <ExternalLink size={12} />
                Cartão / Boleto via Asaas
              </a>
            </div>

            <p style={{
              marginTop: 16, textAlign: 'center',
              fontFamily: "'Space Mono',monospace", fontSize: '0.46rem',
              color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em',
            }}>
              🔒 Dados protegidos · Pagamento processado por Asaas
            </p>
          </motion.div>
        )}

        {/* ── STEP: LOADING ── */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'left', fontFamily: "'Space Mono',monospace", fontSize: '0.85rem', maxWidth: 440, width: '100%', padding: '2rem' }}
          >
            {logs.slice(0, loadingStep + 1).map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                style={{ color: i === loadingStep ? '#00f0ff' : 'rgba(255,255,255,0.35)', marginBottom: 10 }}
              >
                {log}
              </motion.div>
            ))}
            <div style={{ marginTop: 16, display: 'flex', gap: 4, color: '#00f0ff' }}>
              <span style={{ animation: 'bounce 0.8s infinite' }}>.</span>
              <span style={{ animation: 'bounce 0.8s 0.1s infinite' }}>.</span>
              <span style={{ animation: 'bounce 0.8s 0.2s infinite' }}>.</span>
            </div>
          </motion.div>
        )}

        {/* ── STEP: QR CODE ── */}
        {step === 'qr' && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{
              width: '100%', maxWidth: 480,
              background: '#08080f',
              border: '1.5px solid rgba(0,240,255,0.35)',
              borderRadius: 24, padding: '28px',
              boxShadow: '0 0 60px rgba(0,240,255,0.12)',
              maxHeight: '90vh', overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button onClick={onClose} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)',
            }}>
              <X size={20} />
            </button>

            {/* Customer summary */}
            <div style={{
              marginBottom: 20, padding: '12px 16px', borderRadius: 12,
              background: 'rgba(180,94,255,0.07)', border: '1px solid rgba(180,94,255,0.2)',
            }}>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.5rem',
                color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginBottom: 6,
              }}>
                Comprador
              </div>
              <div style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#fff',
              }}>
                {form.nome}
              </div>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.4)', marginTop: 4,
              }}>
                {form.doc} · {form.email}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <h2 style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.6rem',
                background: 'linear-gradient(135deg,#00f0ff,#b45eff)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                marginBottom: 4,
              }}>
                🎉 R$ 300,00
              </h2>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.45)',
              }}>
                Escaneie o QR Code ou copie o código Pix
              </p>
            </div>

            {/* Direct Asaas button */}
            <a
              href={LINK_PAGAMENTO_ASAAS}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '14px', marginBottom: 20,
                background: 'linear-gradient(135deg,#00f0ff,#b45eff)',
                border: 'none', borderRadius: 12, cursor: 'pointer',
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '0.78rem',
                color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(0,240,255,0.3)',
              }}
            >
              <ExternalLink size={14} />
              💳 PAGAR COM CARTÃO / PIX / BOLETO
            </a>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.48rem',
                color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
              }}>
                OU PIX DIRETO
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {/* QR Code */}
            <div style={{
              background: '#fff', padding: 12, borderRadius: 16,
              width: 180, height: 180, margin: '0 auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0,240,255,0.15)',
            }}>
              {pixCode && (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=155x155&data=${encodeURIComponent(pixCode)}`}
                  alt="QR Code Pix"
                  style={{ width: 155, height: 155 }}
                />
              )}
            </div>

            {/* Pix code */}
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>PIX COPIA E COLA</label>
              <input
                type="text" readOnly value={pixCode}
                onClick={handleCopy}
                style={{
                  ...inputStyle,
                  fontFamily: "'Space Mono',monospace", fontSize: '0.55rem',
                  color: '#00f0ff', cursor: 'pointer',
                }}
              />
            </div>

            <button
              onClick={handleCopy}
              disabled={timeLeft <= 0}
              style={{
                width: '100%', padding: '12px', marginBottom: 16,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, cursor: timeLeft > 0 ? 'pointer' : 'not-allowed',
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '0.78rem',
                color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s', opacity: timeLeft > 0 ? 1 : 0.4,
              }}
            >
              {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
              {copied ? 'COPIADO!' : 'COPIAR CÓDIGO PIX'}
            </button>

            {/* Timer */}
            <div style={{
              padding: '12px', borderRadius: 12, border: `1px solid ${timerColor}55`,
              textAlign: 'center', marginBottom: 14, transition: 'border-color 0.4s',
            }}>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: '0.48rem',
                color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', marginBottom: 4,
              }}>
                ⚡ TEMPO RESTANTE
              </div>
              {timeLeft > 0 ? (
                <div style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '1.8rem',
                  fontWeight: 700, color: timerColor, transition: 'color 0.4s',
                }}>
                  {timeString}
                </div>
              ) : (
                <div style={{
                  fontFamily: "'Space Mono',monospace", fontSize: '0.72rem',
                  color: '#ff2d55',
                }}>
                  ⏰ EXPIRADO — Volte ao início para um novo código
                </div>
              )}
            </div>

            {/* Simulate success */}
            {timeLeft > 0 && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                onClick={() => { onSimulateSuccess(); onClose(); }}
                style={{
                  width: '100%', padding: '10px',
                  background: 'none', border: '1px solid rgba(74,222,128,0.4)',
                  borderRadius: 10, cursor: 'pointer',
                  fontFamily: "'Space Mono',monospace", fontSize: '0.52rem',
                  color: '#4ade80', letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}
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
