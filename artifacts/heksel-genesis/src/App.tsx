import { useState } from 'react';

// Layout
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggleFAB } from './components/ThemeToggleFAB';

// Sections — ordem sagrada (top → bottom)
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { HoodieSimulator } from './components/HoodieSimulator';
import { SafeSpace } from './components/SafeSpace';
import { Manifesto } from './components/Manifesto';
import { BrandSection } from './components/BrandSection';
import { CustomizationPanel } from './components/CustomizationPanel';
import { Footer } from './components/Footer';

// Modals
import { NotifyModal, CreateBrandModal, CreateAdvanceModal } from './components/Modals';
import { PixModal } from './components/PixModal';

export default function App() {
  // Modal states
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [createBrandOpen, setCreateBrandOpen] = useState(false);
  const [createAdvanceOpen, setCreateAdvanceOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [pixOpen, setPixOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const openPixCheckout = () => {
    setCustomizationOpen(false);
    setPixOpen(true);
  };

  const openCustomization = () => {
    setCustomizationOpen(true);
    setTimeout(() => {
      document.getElementById('customization-panel')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  return (
    <>
      {/* Fundo animado global */}
      <div className="animated-bg" aria-hidden="true" />

      {/* Cursor customizado (desktop only) */}
      <CustomCursor />

      {/* ── NAVBAR ── */}
      <Navbar onNotifyMe={() => setNotifyOpen(true)} />

      <main id="home">

        {/* 1. HERO — boas-vindas premium da marca */}
        <Hero />

        {/* 2. COLLECTION — seção de tênis */}
        <Collection onNotifyMe={() => setNotifyOpen(true)} />

        {/* Painel de customização (expande inline abaixo da Collection) */}
        <div id="customization-panel">
          <CustomizationPanel
            isOpen={customizationOpen}
            onClose={() => setCustomizationOpen(false)}
            onCheckout={openPixCheckout}
          />
        </div>

        {/* 3. HOODIE SIMULATOR — simulador de moletons */}
        <HoodieSimulator />

        {/* 4. SAFE SPACE — seção institucional / corações */}
        <SafeSpace />

        {/* Manifesto rotativo */}
        <Manifesto />

        {/* Seção de serviços / planos */}
        <BrandSection
          onCreateAdvance={() => setCreateAdvanceOpen(true)}
          onHirePremium={() => setCreateBrandOpen(true)}
        />

      </main>

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── FAB de tema ── */}
      <ThemeToggleFAB />

      {/* ── MODAIS ── */}
      <NotifyModal isOpen={notifyOpen} onClose={() => setNotifyOpen(false)} />
      <CreateBrandModal isOpen={createBrandOpen} onClose={() => setCreateBrandOpen(false)} />
      <CreateAdvanceModal isOpen={createAdvanceOpen} onClose={() => setCreateAdvanceOpen(false)} />

      {/* Modal do Pix — gatilho: botão "COMPRAR AGORA" no CustomizationPanel */}
      <PixModal
        isOpen={pixOpen}
        onClose={() => setPixOpen(false)}
        onSimulateSuccess={() => setPaymentSuccess(true)}
      />

      {/* Toast de pagamento confirmado */}
      {paymentSuccess && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            background: 'rgba(0, 200, 100, 0.15)',
            border: '1px solid rgba(0, 200, 100, 0.6)',
            color: '#00c864',
            padding: '14px 28px',
            borderRadius: '12px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 30px rgba(0,200,100,0.2)',
            cursor: 'pointer',
          }}
          onClick={() => setPaymentSuccess(false)}
        >
          ✓ PAGAMENTO CONFIRMADO — Obrigado pela sua compra!
        </div>
      )}
    </>
  );
}
