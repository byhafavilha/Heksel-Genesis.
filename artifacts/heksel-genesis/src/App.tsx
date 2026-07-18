import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';

// Layout
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggleFAB } from './components/ThemeToggleFAB';
import { CosmosCanvas } from './components/CosmosCanvas';
import { Footer } from './components/Footer';

// ── SEÇÕES (ordem sagrada do spec) ──────────────────────────
// 1. Hero (Simulador Principal — produto visual) + SafeSpace
import { Hero } from './components/Hero';
import { SafeSpace } from './components/SafeSpace';

// 2. A Diretiva Gênesis (Genesis Directive — Manifesto)
import { Manifesto } from './components/Manifesto';

// 4. See an interactive example (Printful 4-área stamp simulator)
import { HoodieSimulator } from './components/HoodieSimulator';

// 5. Planos: Freemio & Preemio (BrandSection)
import { BrandSection } from './components/BrandSection';

// 6. Footer — Coleção NEO'S "See what the future holds"
import { Collection } from './components/Collection';

// Modais
import { NotifyModal, CreateBrandModal, CreateAdvanceModal, FreemioModal, HelpUsModal } from './components/Modals';
import { PixModal } from './components/PixModal';
import { ImpulseToasts } from './components/ImpulseToasts';

export default function App() {
  // ── Estado dos modais ────────────────────────────────────
  const [notifyOpen, setNotifyOpen]               = useState(false);
  const [createBrandOpen, setCreateBrandOpen]     = useState(false);
  const [createAdvanceOpen, setCreateAdvanceOpen] = useState(false);
  const [freemioOpen, setFreemioOpen]             = useState(false);
  const [helpOpen, setHelpOpen]                   = useState(false);
  const [pixOpen, setPixOpen]                     = useState(false);
  const [paymentSuccess, setPaymentSuccess]       = useState(false);

  // Abre o PixModal
  const openPix = () => setPixOpen(true);

  return (
    <LanguageProvider>
    <>
      {/* Fundo animado global (CSS base) */}
      <div className="animated-bg" aria-hidden="true" />

      {/* Canvas cósmico animado — dark: estrelas brancas / light: nebulosa ciano */}
      <CosmosCanvas />

      {/* Cursor customizado */}
      <CustomCursor />

      {/* ── NAVBAR ── */}
      <Navbar onNotifyMe={() => setNotifyOpen(true)} onHelpUs={() => setHelpOpen(true)} />

      <main>

        {/* ══════════════════════════════════════════════
            SEÇÃO 1 — Hero (Simulador Principal de Moletons)
                       + SafeSpace logo abaixo
        ══════════════════════════════════════════════ */}
        <Hero />
        <SafeSpace />

        {/* ══════════════════════════════════════════════
            SEÇÃO 2 — A Diretiva Gênesis (Genesis Directive)
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
          onTryFreemio={() => setFreemioOpen(true)}
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
      <FreemioModal        isOpen={freemioOpen}       onClose={() => setFreemioOpen(false)} />
      <HelpUsModal         isOpen={helpOpen}          onClose={() => setHelpOpen(false)} />

      <PixModal
        isOpen={pixOpen}
        onClose={() => setPixOpen(false)}
        onSimulateSuccess={() => {
          setPixOpen(false);
          setPaymentSuccess(true);
        }}
      />

      {/* ── Impulse Toasts — Live social proof notifications ── */}
      <ImpulseToasts onOpenHelpUs={() => setHelpOpen(true)} />

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
