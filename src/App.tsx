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
  // Modals & configuration
  const [activeDemoTemplate, setActiveDemoTemplate] = useState<TemplateItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedOrderTemplate, setSelectedOrderTemplate] = useState<TemplateItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'landing' | 'mvp' | 'full-app'>('mvp');
  const [isCustomMvpMode, setIsCustomMvpMode] = useState(false);
  const [customScopeTotal, setCustomScopeTotal] = useState(1850);
  const [customScopeSummary, setCustomScopeSummary] = useState<string[]>([]);

  // Handlers
  const handleOrderTemplate = (template: TemplateItem) => {
    setSelectedOrderTemplate(template);
    if (template.category === 'medical-clinic') {
      setSelectedPackage('landing');
    } else {
      setSelectedPackage('mvp');
    }
    setIsCustomMvpMode(false);
    setIsOrderModalOpen(true);
  };

  const handleStartPackageProject = (packageType: 'landing' | 'mvp' | 'full-app' = 'mvp') => {
    setSelectedOrderTemplate(null);
    setSelectedPackage(packageType);
    setIsCustomMvpMode(false);
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmitted = (newOrder: ClientOrder) => {
    console.log('KZFR studio received project brief:', newOrder);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#ff6b2c] selection:text-white">
      
      {/* 1. Navbar with KZFR Logo & CONTACT */}
      <Navbar onOpenOrderModal={() => handleStartPackageProject('mvp')} onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 2. Hero Section: "Elevate brands with high-impact design." */}
        <Hero
          onExploreWork={() => {
            const el = document.getElementById('work');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookCall={() => handleStartPackageProject('mvp')}
        />

        {/* 3. Fleety Iconic Editorial Statement / About Strip */}
        <AboutStrip
          onLearnMore={() => {
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. Featured Projects (Portfolio Grid / Bento with Divisor & Cases) */}
        <FeaturedWork
          templates={TEMPLATES}
          onOrderTemplate={handleOrderTemplate}
        />

        {/* 6. Creative Services Bento Grid (with Interactive Code/Design Toggle) */}
        <ServicesBento />

        {/* 7. Our Impact & Metrics Section with In-Section CTA */}
        <ImpactMetrics onStartProject={() => handleStartPackageProject('mvp')} />

        {/* 8. Pricing Plans (Landing Page 12,000 DA, MVP 30,000 DA, Full Scalable App 60,000+ DA) */}
        <ProcessTimeline onStartProject={handleStartPackageProject} />

        {/* 9. Dynamic Questions & Answers (FAQ) */}
        <FaqSection />

        {/* 10. Start Your Project CTA Section */}
        <CtaBanner onStartProject={() => handleStartPackageProject('mvp')} />

      </main>

      {/* 11. White Footer with Big KZFR Typography */}
      <Footer onStartProject={() => handleStartPackageProject('mvp')} />

      {/* Interactive Live Demo Modal with Device Switcher (Desktop, Tablet, Mobile) */}
      <LiveTemplateModal
        template={activeDemoTemplate}
        onClose={() => setActiveDemoTemplate(null)}
        onOrder={(template) => {
          setActiveDemoTemplate(null);
          handleOrderTemplate(template);
        }}
      />

      {/* Productized Project Onboarding & Scope Intake Modal */}
      <OrderTemplateModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedTemplate={selectedOrderTemplate}
        initialPackage={selectedPackage}
        isCustomMvpMode={isCustomMvpMode}
        customScopeTotal={customScopeTotal}
        customScopeSummary={customScopeSummary}
        onOrderSubmitted={handleOrderSubmitted}
      />

      {/* Contact Page Modal */}
      {isContactModalOpen && (
        <ContactPage onClose={() => setIsContactModalOpen(false)} />
      )}

    </div>
  );
}
