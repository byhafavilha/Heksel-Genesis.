import { useState } from 'react';

// Layout
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggleFAB } from './components/ThemeToggleFAB';
import { Footer } from './components/Footer';

// ── SEÇÕES (ordem sagrada do spec) ──────────────────────────
// 1. HoodieSimulator + SafeSpace
import { HoodieSimulator } from './components/HoodieSimulator';
import { SafeSpace } from './components/SafeSpace';

// 2. Hero — "From beginning to infinity"
import { Hero } from './components/Hero';

// 3. A Diretiva Gênesis (Manifesto)
import { Manifesto } from './components/Manifesto';

// 4. See an interactive example (HoodieSimulator inline — full interactive)
// (same component, independent state instance)

// 5. Want a website like this? Build your brand. (BrandSection)
import { BrandSection } from './components/BrandSection';

// 6. See what the future holds (Collection — tênis)
import { Collection } from './components/Collection';

// Modais
import { NotifyModal, CreateBrandModal, CreateAdvanceModal } from './components/Modals';
import { PixModal } from './components/PixModal';
import { CustomizationPanel } from './components/CustomizationPanel';
import { OrderModal } from './components/OrderModal';

export default function App() {
  // ── Estado dos modais ────────────────────────────────────
  const [notifyOpen, setNotifyOpen]               = useState(false);
  const [createBrandOpen, setCreateBrandOpen]     = useState(false);
  const [createAdvanceOpen, setCreateAdvanceOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [pixOpen, setPixOpen]                     = useState(false);
  const [paymentSuccess, setPaymentSuccess]       = useState(false);

  // ── OrderModal (fluxo do moletom) ────────────────────────
  const [orderOpen, setOrderOpen]         = useState(false);
  const [orderModel, setOrderModel]       = useState('');
  const [orderColor, setOrderColor]       = useState('');
  const [orderColorHex, setOrderColorHex] = useState('#b45eff');

  const openOrder = (model: string, color: string, colorHex: string) => {
    setOrderModel(model);
    setOrderColor(color);
    setOrderColorHex(colorHex);
    setOrderOpen(true);
  };

  // Abre o PixModal (usado pelos tênis via Collection)
  const openPix = () => setPixOpen(true);

  const handleCheckout = () => {
    setCustomizationOpen(false);
    setPixOpen(true);
  };

  return (
    <>
      {/* Fundo animado global */}
      <div className="animated-bg" aria-hidden="true" />

      {/* Cursor customizado */}
      <CustomCursor />

      {/* ── NAVBAR ── */}
      <Navbar onNotifyMe={() => setNotifyOpen(true)} />

      <main>

        {/* ══════════════════════════════════════════════
            SEÇÃO 1 — "From beginning to infinity" (PRIMEIRA)
        ══════════════════════════════════════════════ */}
        <Hero />

        {/* ══════════════════════════════════════════════
            SEÇÃO 2 — HoodieSimulator + SafeSpace
        ══════════════════════════════════════════════ */}
        <section style={{ position: 'relative' }}>
          {/* Safe Space — mensagem de acolhimento */}
          <SafeSpace />
        </section>

        {/* ══════════════════════════════════════════════
            SEÇÃO 3 — A Diretiva Gênesis (Manifesto)
        ══════════════════════════════════════════════ */}
        <Manifesto />

        {/* ══════════════════════════════════════════════
            SEÇÃO 4 — See an interactive example
        ══════════════════════════════════════════════ */}
        <div id="interactive-example">
          <HoodieSimulator />
        </div>

        {/* ══════════════════════════════════════════════
            SEÇÃO 5 — Want a website like this?
                       Build your brand. (Planos)
        ══════════════════════════════════════════════ */}
        <BrandSection
          onCreateAdvance={() => setCreateAdvanceOpen(true)}
          onHirePremium={() => setCreateBrandOpen(true)}
        />

        {/* ══════════════════════════════════════════════
            SEÇÃO 6 — See what the future holds (Tênis)
        ══════════════════════════════════════════════ */}
        <Collection onNotifyMe={openPix} />

      </main>

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── FAB de tema ── */}
      <ThemeToggleFAB />

      {/* ── MODAIS ── */}
      <NotifyModal         isOpen={notifyOpen}        onClose={() => setNotifyOpen(false)} />
      <CreateBrandModal    isOpen={createBrandOpen}   onClose={() => setCreateBrandOpen(false)} />
      <CreateAdvanceModal  isOpen={createAdvanceOpen} onClose={() => setCreateAdvanceOpen(false)} />

      {/* PixModal — abre para hoodies (via CustomizationPanel) E tênis (via Collection) */}
      <PixModal
        isOpen={pixOpen}
        onClose={() => setPixOpen(false)}
        onSimulateSuccess={() => {
          setPixOpen(false);
          setPaymentSuccess(true);
        }}
      />

      {/* Toast de pagamento confirmado */}
      {paymentSuccess && (
        <div
          role="alert"
          onClick={() => setPaymentSuccess(false)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            background: 'rgba(0,200,100,0.12)',
            border: '1px solid rgba(0,200,100,0.55)',
            color: '#00c864',
            padding: '14px 28px',
            borderRadius: '12px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 30px rgba(0,200,100,0.18)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          ✓ PAGAMENTO CONFIRMADO — Obrigado pela sua compra!
        </div>
      )}
    </>
  );
}
