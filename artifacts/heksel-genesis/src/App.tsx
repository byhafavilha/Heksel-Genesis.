import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';

// Layout
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggleFAB } from './components/ThemeToggleFAB';
import { CosmosCanvas } from './components/CosmosCanvas';
import { Footer } from './components/Footer';

// ── Sections ──────────────────────────────────────────────────
import { Hero } from './components/Hero';
import { SafeSpace } from './components/SafeSpace';
import { Manifesto } from './components/Manifesto';
import { HoodieSimulator } from './components/HoodieSimulator';
import { BrandSection } from './components/BrandSection';
import { Collection } from './components/Collection';

// Modals
import { NotifyModal, CreateBrandModal, CreateAdvanceModal, FreemioModal, HelpUsModal } from './components/Modals';
import { PixModal } from './components/PixModal';
import { ImpulseToasts, type SovereignEntry } from './components/ImpulseToasts';

export default function App() {
  const [notifyOpen,        setNotifyOpen]        = useState(false);
  const [createBrandOpen,   setCreateBrandOpen]   = useState(false);
  const [createAdvanceOpen, setCreateAdvanceOpen] = useState(false);
  const [freemioOpen,       setFreemioOpen]       = useState(false);
  const [helpOpen,          setHelpOpen]          = useState(false);
  const [pixOpen,           setPixOpen]           = useState(false);
  const [paymentSuccess,    setPaymentSuccess]    = useState(false);

  const [toastEntry, setToastEntry] = useState<SovereignEntry | null>(null);
  const openPix = () => setPixOpen(true);

  return (
    <LanguageProvider>
    <>
      <div className="animated-bg" aria-hidden="true" />
      <CosmosCanvas />
      <CustomCursor />

      <Navbar onNotifyMe={() => setNotifyOpen(true)} onHelpUs={() => setHelpOpen(true)} />

      <main>
        {/* 1 — Hero + SafeSpace */}
        <Hero onHelpUs={() => setHelpOpen(true)} />
        <SafeSpace />

        {/* 2 — Genesis Directive */}
        <Manifesto />

        {/* 3 — Hoodie Simulator */}
        <div id="interactive-example">
          <HoodieSimulator onOrder={openPix} />
        </div>

        {/* 4 — Plans: Freemio & Preemio + inline order form */}
        <BrandSection
          onCreateAdvance={() => setCreateAdvanceOpen(true)}
          onHirePremium={() => setCreateBrandOpen(true)}
          onTryFreemio={() => setFreemioOpen(true)}
        />

        {/* 5 — NEO Collection */}
        <Collection onNotifyMe={openPix} />
      </main>

      <Footer />
      <ThemeToggleFAB />

      {/* ── Modals ── */}
      <NotifyModal        isOpen={notifyOpen}        onClose={() => setNotifyOpen(false)} />
      <CreateBrandModal   isOpen={createBrandOpen}   onClose={() => setCreateBrandOpen(false)} />
      <CreateAdvanceModal isOpen={createAdvanceOpen} onClose={() => setCreateAdvanceOpen(false)} />
      <FreemioModal       isOpen={freemioOpen}       onClose={() => setFreemioOpen(false)} />
      <HelpUsModal
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        onFueled={(entry) => setToastEntry({ ...entry })}
      />

      <PixModal
        isOpen={pixOpen}
        onClose={() => setPixOpen(false)}
        onSimulateSuccess={() => { setPixOpen(false); setPaymentSuccess(true); }}
      />

      <ImpulseToasts triggerEntry={toastEntry} onOpenHelpUs={() => setHelpOpen(true)} />

      {paymentSuccess && (
        <div
          role="alert"
          onClick={() => setPaymentSuccess(false)}
          style={{
            position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 200, background: 'rgba(0,200,100,0.12)', border: '1px solid rgba(0,200,100,0.55)',
            color: '#00c864', padding: '14px 28px', borderRadius: '12px',
            fontFamily: "'Space Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', backdropFilter: 'blur(12px)',
            boxShadow: '0 0 30px rgba(0,200,100,0.18)', cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          ✓ PAGAMENTO CONFIRMADO — Obrigado pela sua compra!
        </div>
      )}
    </>
    </LanguageProvider>
  );
}
