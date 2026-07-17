import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';

// Layout
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggleFAB } from './components/ThemeToggleFAB';
import { Footer } from './components/Footer';

// ── SEÇÕES (ordem sagrada do spec) ──────────────────────────
// 1. Hero (Simulador Principal — produto visual) + SafeSpace
import { Hero } from './components/Hero';
import { SafeSpace } from './components/SafeSpace';

// 2. "From beginning to infinity" — declaração visual autônoma
import { BeginningToInfinity } from './components/BeginningToInfinity';

// 3. A Diretiva Gênesis (Genesis Directive — Manifesto)
import { Manifesto } from './components/Manifesto';

// 4. See an interactive example (Printful 4-área stamp simulator)
import { HoodieSimulator } from './components/HoodieSimulator';

// 5. Planos: Freemio & Preemio (BrandSection)
import { BrandSection } from './components/BrandSection';

// 6. Footer — Coleção NEO'S "See what the future holds"
import { Collection } from './components/Collection';

// Modais
import { NotifyModal, CreateBrandModal, CreateAdvanceModal } from './components/Modals';
import { PixModal } from './components/PixModal';

export default function App() {
  // ── Estado dos modais ────────────────────────────────────
  const [notifyOpen, setNotifyOpen]               = useState(false);
  const [createBrandOpen, setCreateBrandOpen]     = useState(false);
  const [createAdvanceOpen, setCreateAdvanceOpen] = useState(false);
  const [pixOpen, setPixOpen]                     = useState(false);
  const [paymentSuccess, setPaymentSuccess]       = useState(false);

  // Abre o PixModal
  const openPix = () => setPixOpen(true);

  return (
    <LanguageProvider>
    <>
      {/* Fundo animado global */}
      <div className="animated-bg" aria-hidden="true" />

      {/* Cursor customizado */}
      <CustomCursor />

      {/* ── NAVBAR ── */}
      <Navbar onNotifyMe={() => setNotifyOpen(true)} />

      <main>

        {/* ══════════════════════════════════════════════
            SEÇÃO 1 — Hero (Simulador Principal de Moletons)
                       + SafeSpace logo abaixo
        ══════════════════════════════════════════════ */}
        <Hero />
        <SafeSpace />

        {/* ══════════════════════════════════════════════
            SEÇÃO 2 — "From beginning to infinity"
        ══════════════════════════════════════════════ */}
        <BeginningToInfinity />

        {/* ══════════════════════════════════════════════
            SEÇÃO 3 — A Diretiva Gênesis (Genesis Directive)
        ══════════════════════════════════════════════ */}
        <Manifesto />

        {/* ══════════════════════════════════════════════
            SEÇÃO 4 — See an interactive example
                       Printful · 4 stamp areas · Front Y-lock
        ══════════════════════════════════════════════ */}
        <div id="interactive-example">
          <HoodieSimulator onOrder={openPix} />
        </div>

        {/* ══════════════════════════════════════════════
            SEÇÃO 5 — Planos: Freemio & Preemio
        ══════════════════════════════════════════════ */}
        <BrandSection
          onCreateAdvance={() => setCreateAdvanceOpen(true)}
          onHirePremium={() => setCreateBrandOpen(true)}
        />

        {/* ══════════════════════════════════════════════
            SEÇÃO 6 — NEO'S Collection — See what the future holds
        ══════════════════════════════════════════════ */}
        <Collection onNotifyMe={openPix} />

      </main>

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── FAB de tema 🎨 ── */}
      <ThemeToggleFAB />

      {/* ── MODAIS ── */}
      <NotifyModal         isOpen={notifyOpen}        onClose={() => setNotifyOpen(false)} />
      <CreateBrandModal    isOpen={createBrandOpen}   onClose={() => setCreateBrandOpen(false)} />
      <CreateAdvanceModal  isOpen={createAdvanceOpen} onClose={() => setCreateAdvanceOpen(false)} />

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
    </LanguageProvider>
  );
}
