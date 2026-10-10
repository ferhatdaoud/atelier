import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutStrip } from './components/AboutStrip';
import { FeaturedWork } from './components/FeaturedWork';
import { ServicesBento } from './components/ServicesBento';
import { ImpactMetrics } from './components/ImpactMetrics';
import { ProcessTimeline } from './components/ProcessTimeline';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { LiveTemplateModal } from './components/LiveTemplateModal';
import { OrderTemplateModal } from './components/OrderTemplateModal';
import { ContactPage } from './components/ContactPage';
import { TEMPLATES } from './data/templates';
import { TemplateItem, ClientOrder } from './types';

export default function App() {
  const [activeDemoTemplate, setActiveDemoTemplate] = useState<TemplateItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedOrderTemplate, setSelectedOrderTemplate] = useState<TemplateItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'landing' | 'mvp' | 'full-app'>('mvp');

  const handleOrderTemplate = (template: TemplateItem) => {
    setSelectedOrderTemplate(template);
    if (template.category === 'medical-clinic') {
      setSelectedPackage('landing');
    } else {
      setSelectedPackage('mvp');
    }
    setIsOrderModalOpen(true);
  };

  const handleStartPackageProject = (packageType: 'landing' | 'mvp' | 'full-app' = 'mvp') => {
    setSelectedOrderTemplate(null);
    setSelectedPackage(packageType);
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmitted = (newOrder: ClientOrder) => {
    console.log('KZFR studio received project brief:', newOrder);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#ff6b2c] selection:text-white">
      <Navbar onOpenOrderModal={() => handleStartPackageProject('mvp')} onOpenContact={() => setIsContactModalOpen(true)} />
      <main className="flex-1">
        <Hero
          onExploreWork={() => {
            const el = document.getElementById('work');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookCall={() => handleStartPackageProject('mvp')}
        />
        <AboutStrip
          onLearnMore={() => {
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <FeaturedWork
          templates={TEMPLATES}
          onOrderTemplate={handleOrderTemplate}
        />
        <ServicesBento />
        <ImpactMetrics onStartProject={() => handleStartPackageProject('mvp')} />
        <ProcessTimeline onStartProject={handleStartPackageProject} />
        <FaqSection />
        <CtaBanner onStartProject={() => handleStartPackageProject('mvp')} />
      </main>
      <Footer onStartProject={() => handleStartPackageProject('mvp')} />
      <LiveTemplateModal
        template={activeDemoTemplate}
        onClose={() => setActiveDemoTemplate(null)}
        onOrder={(template) => {
          setActiveDemoTemplate(null);
          handleOrderTemplate(template);
        }}
      />
      <OrderTemplateModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedTemplate={selectedOrderTemplate}
        initialPackage={selectedPackage}
        onOrderSubmitted={handleOrderSubmitted}
      />
      {isContactModalOpen && (
        <ContactPage onClose={() => setIsContactModalOpen(false)} />
      )}
    </div>
  );
}
