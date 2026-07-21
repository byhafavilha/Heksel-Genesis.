import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* ─────────────────────────────────────────────────────────────
   TIPOS
───────────────────────────────────────────────────────────── */
interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedModel: string;
  selectedColor: string;
  selectedColorHex: string;
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTES DE PAGAMENTO (mesmas do PixModal)
───────────────────────────────────────────────────────────── */
const CHAVE_PIX        = '3d1b7fde-f1fd-406d-9d36-140751f1af91';
const BENEFICIARIO     = 'HEKSEL GENESIS';
const CIDADE_PIX       = 'SAO PAULO';
const VALOR_COBRANCA   = '300.00';

/* ─────────────────────────────────────────────────────────────
   GERADOR PIX COPIA E COLA
───────────────────────────────────────────────────────────── */
function gerarPix(chave: string, nome: string, cidade: string, valor: string) {
  const f = (id: string, v: string) => `${id}${v.length.toString().padStart(2,'0')}${v}`;
  const mai = f('00','br.gov.bcb.pix') + f('01', chave);
  const payload =
    f('00','01') + f('26', mai) + f('52','0000') + f('53','986') +
    f('54', valor) + f('58','BR') +
    f('59', nome.substring(0,25)) + f('60', cidade.substring(0,15)) +
    f('62', f('05','HEKSELGENESIS')) + '6304';
  let crc = 0xFFFF;
  for (let c = 0; c < payload.length; c++) {
    crc ^= payload.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
  }
  return payload + (crc & 0xFFFF).toString(16).toUpperCase().padStart(4,'0');
}

/* ─────────────────────────────────────────────────────────────
   REDES SOCIAIS / CONTATO
───────────────────────────────────────────────────────────── */
const NETWORKS = [
  { id: 'gmail',     label: 'Gmail',     icon: '📧', placeholder: 'seuemail@gmail.com',   type: 'email' },
  { id: 'whatsapp',  label: 'WhatsApp',  icon: '💬', placeholder: '+55 11 99999-9999',     type: 'tel'   },
  { id: 'discord',   label: 'Discord',   icon: '🎮', placeholder: 'username',              type: 'text'  },
  { id: 'instagram', label: 'Instagram', icon: '📸', placeholder: '@seuusuario',           type: 'text'  },
  { id: 'tiktok',    label: 'TikTok',    icon: '🎵', placeholder: '@seuusuario',           type: 'text'  },
];

const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];

/* ─────────────────────────────────────────────────────────────
   TEXTOS DOS "?"
───────────────────────────────────────────────────────────── */
const TIPS: Record<string, string> = {
  cpf:     'O CPF (Cadastro de Pessoas Físicas) é exigido pelo Asaas/Nubank/Itaú para emissão da cobrança PIX e emissão de nota fiscal.',
  cep:     'O CEP é usado para preencher seu endereço automaticamente e calcular o frete via Printful. Digite os 8 dígitos.',
  address: 'Endereço completo de entrega. A fábrica Printful vai enviar o moletom direto para este endereço.',
  contact: 'Escolha como quer receber a notificação quando o seu moletom estiver pronto e saindo da fábrica Printful.',
};

/* ─────────────────────────────────────────────────────────────
   ESTILOS INLINE COMPARTILHADOS
───────────────────────────────────────────────────────────── */
const S = {
  label: {
    display: 'block',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.55rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.38)',
    marginBottom: 6,
  },
  input: (err?: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(14,14,24,0.9)',
    border: `1.5px solid ${err ? 'rgba(239,68,68,0.7)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 10,
    padding: '10px 13px',
    color: '#fff',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  }),
  err: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem',
    color: 'rgba(239,68,68,0.85)',
    marginTop: 4,
  },
};

/* ─────────────────────────────────────────────────────────────
   COMPONENTE "?" TOOLTIP
───────────────────────────────────────────────────────────── */
function HelpBtn({ tip }: { tip: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: 20, height: 20, borderRadius: '50%',
          border: '1.5px solid rgba(168,85,247,0.6)',
          background: 'rgba(168,85,247,0.1)',
          color: 'rgba(168,85,247,0.9)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.55rem', fontWeight: 800,
          cursor: 'pointer', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', verticalAlign: 'middle',
          marginLeft: 6,
        }}
      >?</button>
      {open && (
        <div style={{
          position: 'absolute', bottom: '130%', left: '50%',
          transform: 'translateX(-50%)',
          width: 220, padding: '10px 13px',
          background: 'rgba(20,10,40,0.97)',
          border: '1px solid rgba(168,85,247,0.4)',
          borderRadius: 10,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.55, zIndex: 999,
          boxShadow: '0 0 24px rgba(168,85,247,0.2)',
        }}>
          {tip}
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid rgba(168,85,247,0.4)',
          }} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────────────────────── */
export function OrderModal({ isOpen, onClose, onSuccess, selectedModel, selectedColor, selectedColorHex }: OrderModalProps) {

  const { lang } = useLanguage();

  /* ── estado do fluxo ── */
  const [step, setStep] = useState<'form' | 'pix'>('form');

  /* ── campos do formulário ── */
  const [nome, setNome]               = useState('');
  const [cpf, setCpf]                 = useState('');
  const [cep, setCep]                 = useState('');
  const [rua, setRua]                 = useState('');
  const [numero, setNumero]           = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade]           = useState('');
  const [estado, setEstado]           = useState('');
  const [tamanho, setTamanho]         = useState('');
  const [network, setNetwork]         = useState('gmail');
  const [contactVal, setContactVal]   = useState('');

  /* ── UI ── */
  const [cepLoading, setCepLoading] = useState(false);
  const [cepErr, setCepErr]         = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});

  /* ── PIX ── */
  const [pixCode, setPixCode] = useState('');
  const [copied, setCopied]   = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  /* ── Formatar CPF ── */
  const formatCpf = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    return d.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  /* ── Formatar CEP ── */
  const formatCep = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 8);
    return d.replace(/(\d{5})(\d)/, '$1-$2');
  };

  /* ── CEP auto-fill ── */
  useEffect(() => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) return;
    setCepLoading(true);
    setCepErr('');
    fetch(`https://viacep.com.br/ws/${clean}/json/`)
      .then(r => r.json())
      .then((d: { erro?: boolean; logradouro?: string; localidade?: string; uf?: string }) => {
        if (d.erro) { setCepErr('CEP não encontrado.'); return; }
        setRua(d.logradouro ?? '');
        setCidade(d.localidade ?? '');
        setEstado(d.uf ?? '');
      })
      .catch(() => setCepErr('Erro ao buscar CEP.'))
      .finally(() => setCepLoading(false));
  }, [cep]);

  /* ── Timer PIX ── */
  useEffect(() => {
    if (step !== 'pix' || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [step, timeLeft]);

  /* ── Reset ao fechar ── */
  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setErrors({});
      setSubmitting(false);
      setCepErr('');
    }
  }, [isOpen]);

  /* ── Validação ── */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!nome.trim())                              e.nome         = 'Nome obrigatório';
    if (lang !== 'English' && !/^\d{11}$/.test(cpf.replace(/\D/g,'')))  e.cpf = 'CPF inválido (11 dígitos)';
    if (!/^\d{8}$/.test(cep.replace(/\D/g,'')))   e.cep          = 'CEP inválido';
    if (!rua.trim())                               e.rua          = 'Rua obrigatória';
    if (!numero.trim())                            e.numero       = 'Número obrigatório';
    if (!cidade.trim())                            e.cidade       = 'Cidade obrigatória';
    if (!estado.trim())                            e.estado       = 'Estado obrigatório';
    if (!tamanho)                                  e.tamanho      = 'Escolha um tamanho';
    if (!contactVal.trim())                        e.contactVal   = 'Informe seu contato';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Submeter ── */
  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    // Gerar PIX estático
    const pix = gerarPix(CHAVE_PIX, BENEFICIARIO, CIDADE_PIX, VALOR_COBRANCA);
    setPixCode(pix);
    setTimeLeft(600);
    setCopied(false);

    // Enviar dados ao backend (não-bloqueante)
    try {
      await fetch('/api-server/api/criar-pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          cpf,
          email: network === 'gmail' ? contactVal : 'cliente@hekselgenesis.com',
          valor: 300,
          produto: `${selectedModel} — ${selectedColor}`,
          tamanho,
          contactNetwork: network,
          contactValue: contactVal,
          endereco: {
            nome, rua: `${rua}, ${numero}`,
            complemento, cidade, estado,
            cep: cep.replace(/\D/g,''), pais: 'BR',
          },
        }),
      });
    } catch { /* silent fallback — PIX funciona offline */ }

    setSubmitting(false);
    setStep('pix');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerStr = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  const timerColor = timeLeft <= 120 ? '#ef4444' : timeLeft <= 300 ? '#f59e0b' : '#00f0ff';

  const net = NETWORKS.find(n => n.id === network) ?? NETWORKS[0];

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.92)',
      backdropFilter: 'blur(8px)',
      padding: '16px',
      overflowY: 'auto',
    }}>
      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%', maxWidth: 540,
              background: 'rgba(10,10,18,0.98)',
              border: '1.5px solid rgba(168,85,247,0.35)',
              borderRadius: 22,
              boxShadow: '0 0 60px rgba(168,85,247,0.15)',
              maxHeight: '90vh', overflowY: 'auto',
              position: 'relative',
            }}
          >
            {/* HEADER */}
            <div style={{
              padding: '22px 24px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              position: 'sticky', top: 0,
              background: 'rgba(10,10,18,0.98)',
              zIndex: 10, borderRadius: '22px 22px 0 0',
            }}>
              <div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.5rem', letterSpacing: '0.22em',
                  color: 'rgba(168,85,247,0.7)', textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                  ✦ Confirmação de Pedido
                </div>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: '1.15rem', color: '#fff',
                }}>
                  {selectedModel}
                </div>
                {selectedColor && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 5 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: selectedColorHex,
                      boxShadow: `0 0 8px ${selectedColorHex}`,
                    }} />
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.58rem', color: selectedColorHex,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>{selectedColor}</span>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.52rem', color: 'rgba(255,255,255,0.3)',
                      marginLeft: 6,
                    }}>R$ 300,00</span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '6px 9px',
                  color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* BODY */}
            <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* NOME */}
              <div>
                <label style={S.label}>Nome Completo</label>
                <input
                  style={S.input(errors.nome)}
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                />
                {errors.nome && <div style={S.err}>{errors.nome}</div>}
              </div>

              {/* CPF — hidden for English-language users */}
              {lang !== 'English' && (
                <div>
                  <label style={S.label}>
                    CPF
                    <HelpBtn tip={TIPS.cpf} />
                  </label>
                  <input
                    style={S.input(errors.cpf)}
                    value={cpf}
                    onChange={e => setCpf(formatCpf(e.target.value))}
                    placeholder="000.000.000-00"
                    inputMode="numeric"
                  />
                  {errors.cpf && <div style={S.err}>{errors.cpf}</div>}
                </div>
              )}

              {/* CEP */}
              <div>
                <label style={S.label}>
                  CEP
                  <HelpBtn tip={TIPS.cep} />
                  {cepLoading && (
                    <span style={{ marginLeft: 8, fontFamily: "'Space Mono',monospace", fontSize: '0.48rem', color: '#00f0ff' }}>
                      buscando...
                    </span>
                  )}
                </label>
                <input
                  style={S.input(errors.cep || cepErr || undefined)}
                  value={cep}
                  onChange={e => setCep(formatCep(e.target.value))}
                  placeholder="00000-000"
                  inputMode="numeric"
                />
                {(errors.cep || cepErr) && <div style={S.err}>{errors.cep || cepErr}</div>}
              </div>

              {/* ADDRESS */}
              <div>
                <label style={S.label}>
                  Endereço de Entrega
                  <HelpBtn tip={TIPS.address} />
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input
                    style={S.input(errors.rua)}
                    value={rua}
                    onChange={e => setRua(e.target.value)}
                    placeholder="Rua / Avenida"
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                      <input
                        style={S.input(errors.numero)}
                        value={numero}
                        onChange={e => setNumero(e.target.value)}
                        placeholder="Número"
                      />
                      {errors.numero && <div style={S.err}>{errors.numero}</div>}
                    </div>
                    <input
                      style={S.input()}
                      value={complemento}
                      onChange={e => setComplemento(e.target.value)}
                      placeholder="Complemento (opcional)"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
                    <div>
                      <input
                        style={S.input(errors.cidade)}
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                        placeholder="Cidade"
                      />
                      {errors.cidade && <div style={S.err}>{errors.cidade}</div>}
                    </div>
                    <div>
                      <input
                        style={{ ...S.input(errors.estado), width: 60 }}
                        value={estado}
                        onChange={e => setEstado(e.target.value.toUpperCase().slice(0,2))}
                        placeholder="UF"
                        maxLength={2}
                      />
                      {errors.estado && <div style={S.err}>{errors.estado}</div>}
                    </div>
                  </div>
                </div>
                {errors.rua && <div style={S.err}>{errors.rua}</div>}
              </div>

              {/* TAMANHO */}
              <div>
                <label style={S.label}>Tamanho do Moletom</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {SIZES.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setTamanho(sz)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: `1.5px solid ${tamanho === sz ? 'rgba(168,85,247,0.8)' : 'rgba(255,255,255,0.1)'}`,
                        background: tamanho === sz ? 'rgba(168,85,247,0.15)' : 'rgba(14,14,24,0.7)',
                        color: tamanho === sz ? '#fff' : 'rgba(255,255,255,0.45)',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.7rem', fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: tamanho === sz ? '0 0 14px rgba(168,85,247,0.3)' : 'none',
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {errors.tamanho && <div style={S.err}>{errors.tamanho}</div>}
              </div>

              {/* CONTACT */}
              <div>
                <label style={S.label}>
                  Contato para Notificação
                  <HelpBtn tip={TIPS.contact} />
                </label>

                {/* Network pills */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                  {NETWORKS.map(n => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => { setNetwork(n.id); setContactVal(''); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '7px 13px', borderRadius: 50,
                        border: `1.5px solid ${network === n.id ? 'rgba(0,240,255,0.7)' : 'rgba(255,255,255,0.1)'}`,
                        background: network === n.id ? 'rgba(0,240,255,0.1)' : 'rgba(14,14,24,0.7)',
                        color: network === n.id ? '#00f0ff' : 'rgba(255,255,255,0.4)',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.58rem', fontWeight: 700,
                        cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: network === n.id ? '0 0 12px rgba(0,240,255,0.2)' : 'none',
                      }}
                    >
                      <span>{n.icon}</span>
                      {n.label}
                    </button>
                  ))}
                </div>

                {/* Contact value input */}
                <input
                  style={S.input(errors.contactVal)}
                  type={net.type}
                  value={contactVal}
                  onChange={e => setContactVal(e.target.value)}
                  placeholder={net.placeholder}
                />
                {errors.contactVal && <div style={S.err}>{errors.contactVal}</div>}

                <div style={{
                  marginTop: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.28)',
                  lineHeight: 1.5,
                }}>
                  Quando a fábrica Printful terminar seu moletom, você vai receber um aviso pelo {net.label} informado acima.
                </div>
              </div>

              {/* SUBMIT */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  marginTop: 4,
                  borderRadius: 12,
                  border: 'none',
                  background: submitting
                    ? 'rgba(100,50,200,0.4)'
                    : 'linear-gradient(135deg, #b45eff 0%, #00f0ff 100%)',
                  color: '#fff',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: submitting ? 'none' : '0 0 30px rgba(180,94,255,0.35)',
                  transition: 'all 0.3s',
                }}
              >
                {submitting ? '⟳ PROCESSANDO...' : '✦ FINALIZAR COM PIX — R$ 300,00 ✦'}
              </motion.button>

              <div style={{
                textAlign: 'center',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.08em',
              }}>
                🔐 SEUS DADOS SÃO CRIPTOGRAFADOS E NÃO COMPARTILHADOS
              </div>
            </div>
          </motion.div>

        ) : (
          /* ─────────── STEP PIX ─────────── */
          <motion.div
            key="pix"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%', maxWidth: 480,
              background: 'rgba(10,10,18,0.98)',
              border: '1.5px solid rgba(0,240,255,0.4)',
              borderRadius: 22,
              boxShadow: '0 0 60px rgba(0,240,255,0.12)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 14, right: 14,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '5px 8px',
                color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', zIndex: 10,
              }}
            >
              <X size={15} />
            </button>

            <div style={{ padding: '28px 26px' }}>
              {/* Title */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.5rem', letterSpacing: '0.2em',
                  color: '#00f0ff', textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  ✓ Pedido registrado
                </div>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: '1.5rem', color: '#fff',
                }}>
                  🎉 R$ 300,00
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)',
                  marginTop: 6,
                }}>
                  {selectedModel}
                  {selectedColor && ` — ${selectedColor}`}
                </div>
              </div>

              {/* QR CODE */}
              <div style={{
                background: '#fff', borderRadius: 14,
                width: 180, height: 180, margin: '0 auto 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0,240,255,0.15)',
              }}>
                {pixCode && (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pixCode)}`}
                    alt="QR Code PIX"
                    style={{ width: 160, height: 160 }}
                  />
                )}
              </div>

              {/* Pix copia e cola */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ ...S.label, marginBottom: 6 }}>PIX COPIA E COLA</label>
                <input
                  readOnly
                  value={pixCode}
                  onClick={handleCopy}
                  style={{
                    ...S.input(),
                    cursor: 'pointer',
                    color: '#00f0ff',
                    fontSize: '0.62rem',
                    letterSpacing: '0.02em',
                  }}
                />
              </div>

              {/* Copy btn */}
              <button
                onClick={handleCopy}
                disabled={timeLeft <= 0}
                style={{
                  width: '100%', padding: '11px',
                  marginBottom: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  color: copied ? '#4ade80' : '#fff',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: '0.78rem',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8,
                }}
              >
                {copied
                  ? <><Check size={14} /> COPIADO!</>
                  : <><Copy size={14} /> COPIAR CÓDIGO PIX</>
                }
              </button>

              {/* Timer */}
              <div style={{
                padding: '10px 14px', borderRadius: 10,
                border: `1px solid ${timerColor}44`,
                background: `${timerColor}08`,
                textAlign: 'center', marginBottom: 14,
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.48rem', letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  ⚡ Tempo restante para pagar
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '1.4rem', fontWeight: 800,
                  color: timerColor,
                  textShadow: `0 0 12px ${timerColor}`,
                }}>
                  {timeLeft > 0 ? timerStr : 'EXPIRADO'}
                </div>
              </div>

              {/* Notification info */}
              <div style={{
                padding: '10px 14px', borderRadius: 10,
                background: 'rgba(180,94,255,0.06)',
                border: '1px solid rgba(180,94,255,0.2)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.55, marginBottom: 12,
              }}>
                📬 Quando seu pagamento for confirmado, vamos acionar a fábrica Printful.
                Você receberá uma notificação pelo <strong style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {NETWORKS.find(n => n.id === network)?.label ?? 'contato informado'}</strong> quando o moletom estiver a caminho.
              </div>

              {/* Simulate success */}
              {timeLeft > 0 && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                  onClick={() => { onClose(); onSuccess(); }}
                  style={{
                    width: '100%', padding: '9px',
                    border: '1px solid rgba(74,222,128,0.4)',
                    borderRadius: 10,
                    background: 'transparent',
                    color: '#4ade80',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.52rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', cursor: 'pointer',
                  }}
                >
                  SIMULAR PAGAMENTO CONFIRMADO
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
