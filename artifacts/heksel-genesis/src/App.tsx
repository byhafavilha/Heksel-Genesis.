import { useState, useEffect } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { CosmosCanvas } from '@/components/CosmosCanvas';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { Manifesto } from '@/components/Manifesto';
import { SafeSpace } from '@/components/SafeSpace';
import { BrandSection } from '@/components/BrandSection';
import { FabricaTroskIA } from '@/components/FabricaTroskIA';
import { Collection } from '@/components/Collection';
import { Footer } from '@/components/Footer';
import { PixModal } from '@/components/PixModal';
import { NotifyModal, CreateBrandModal, CreateAdvanceModal } from '@/components/Modals';
import { ThemeToggleFAB } from '@/components/ThemeToggleFAB';

function HekselApp() {
  const [isPremium, setIsPremium] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  
  // Modals state
  const [showPixModal, setShowPixModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan/30 selection:text-white">
      <CustomCursor />
      <CosmosCanvas />
      
      <Navbar onNotifyMe={() => setShowNotifyModal(true)} />
      
      <main className="relative z-10">
        <Hero onOrderClick={() => setCustomizationOpen(true)} />
        
        <CustomizationPanel 
          isOpen={customizationOpen} 
          onClose={() => setCustomizationOpen(false)} 
          onCheckout={() => {
            setCustomizationOpen(false);
            setShowPixModal(true);
          }}
        />
        
        <Manifesto />
        <SafeSpace />
        
        <BrandSection 
          onCreateAdvance={() => setShowAdvanceModal(true)}
          onHirePremium={() => setShowPixModal(true)}
        />
        
        <FabricaTroskIA isPremium={isPremium} />
        
        <Collection onNotifyMe={() => setShowNotifyModal(true)} />
      </main>

      <Footer />

      {/* Modals */}
      <PixModal 
        isOpen={showPixModal} 
        onClose={() => setShowPixModal(false)}
        onSimulateSuccess={() => {
          setIsPremium(true);
          setTimeout(() => {
            document.getElementById('brand')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />
      
      <NotifyModal isOpen={showNotifyModal} onClose={() => setShowNotifyModal(false)} />
      <CreateBrandModal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)} />
      <CreateAdvanceModal isOpen={showAdvanceModal} onClose={() => setShowAdvanceModal(false)} />
      
      <ThemeToggleFAB />
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" component={HekselApp} />
        <Route component={HekselApp} /> {/* Fallback to main app instead of 404 for simplicity */}
      </Switch>
    </WouterRouter>
  );
}

export default App;
