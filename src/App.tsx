import { useState } from 'react';
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
import { OrderTemplateModal } from './components/OrderTemplateModal';
import { ContactPage } from './components/ContactPage';
import { TEMPLATES } from './data/templates';
import { PackageType, TemplateItem } from './types';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedOrderTemplate, setSelectedOrderTemplate] = useState<TemplateItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('mvp');

  const handleOrderTemplate = (template: TemplateItem) => {
    setSelectedOrderTemplate(template);
    setSelectedPackage(template.category === 'medical-clinic' ? 'landing' : 'mvp');
    setIsOrderModalOpen(true);
  };

  const handleStartPackageProject = (packageType: PackageType = 'mvp') => {
    setSelectedOrderTemplate(null);
    setSelectedPackage(packageType);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#ff6b2c] selection:text-white">
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      <main className="flex-1">
        <Hero onBookCall={() => handleStartPackageProject('mvp')} />
        <AboutStrip />
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
      <OrderTemplateModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedTemplate={selectedOrderTemplate}
        initialPackage={selectedPackage}
      />
      {isContactModalOpen && (
        <ContactPage onClose={() => setIsContactModalOpen(false)} />
      )}
    </div>
  );
}
