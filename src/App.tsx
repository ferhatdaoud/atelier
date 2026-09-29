import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { TemplateCard } from './components/TemplateCard';
import { LiveTemplateModal } from './components/LiveTemplateModal';
import { OrderTemplateModal } from './components/OrderTemplateModal';
import { MvpCalculator } from './components/MvpCalculator';
import { DoctorShowcase } from './components/DoctorShowcase';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ClientOrdersDrawer } from './components/ClientOrdersDrawer';
import { Footer } from './components/Footer';
import { TEMPLATES, INITIAL_TEST_ORDERS } from './data/templates';
import { Category, TemplateItem, ClientOrder } from './types';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & drawers
  const [activeDemoTemplate, setActiveDemoTemplate] = useState<TemplateItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderTemplate, setSelectedOrderTemplate] = useState<TemplateItem | null>(null);
  const [isCustomMvpMode, setIsCustomMvpMode] = useState(false);
  const [customScopeTotal, setCustomScopeTotal] = useState(3200);
  const [customScopeSummary, setCustomScopeSummary] = useState<string[]>([]);
  const [isOrdersDrawerOpen, setIsOrdersDrawerOpen] = useState(false);

  // Orders state with localStorage persistence
  const [orders, setOrders] = useState<ClientOrder[]>(() => {
    try {
      const saved = localStorage.getItem('vektora_client_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved orders', e);
    }
    return INITIAL_TEST_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vektora_client_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  }, [orders]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      all: TEMPLATES.length,
      'startup-mvp': 0,
      'medical-clinic': 0,
      ecommerce: 0,
      'custom-bespoke': 0
    };
    TEMPLATES.forEach(t => {
      if (counts[t.category] !== undefined) {
        counts[t.category]++;
      }
    });
    return counts;
  }, []);

  // Filtered templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q)) ||
        item.features.some(feat => feat.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handlers
  const handleOpenDemo = (template: TemplateItem) => {
    setActiveDemoTemplate(template);
  };

  const handleOrderTemplate = (template: TemplateItem) => {
    setSelectedOrderTemplate(template);
    setIsCustomMvpMode(false);
    setIsOrderModalOpen(true);
  };

  const handleScopeCustomMvp = (total: number, summary: string[]) => {
    setCustomScopeTotal(total);
    setCustomScopeSummary(summary);
    setSelectedOrderTemplate(null);
    setIsCustomMvpMode(true);
    setIsOrderModalOpen(true);
  };

  const handleGeneralOrderClick = () => {
    // Default to first template or custom mode
    setSelectedOrderTemplate(TEMPLATES[0]);
    setIsCustomMvpMode(false);
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmitted = (newOrder: ClientOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const doctorTemplate = TEMPLATES.find(t => t.category === 'medical-clinic');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Top Navigation */}
      <Navbar
        onOpenOrderModal={handleGeneralOrderClick}
        onOpenOrdersDrawer={() => setIsOrdersDrawerOpen(true)}
        orderCount={orders.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onExploreTemplates={() => {
            const el = document.getElementById('templates');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onScopeCustomMvp={() => {
            const el = document.getElementById('startup-mvp');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Templates & Examples Section (Core Category Filter Feature) */}
        <section id="templates" className="py-20 md:py-28 border-b border-neutral-800/80 bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-2">
                  <span>Tested & Production-Proven</span>
                  <span aria-hidden="true">·</span>
                  <span>Turnkey in 48–72h</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 font-display">
                  Template Library & Working Examples
                </h2>
                <p className="mt-2 text-sm text-neutral-400 max-w-2xl">
                  Click any template to explore the live interactive preview. Order it as a turnkey website customized with your exact branding, or buy the raw source code.
                </p>
              </div>

              {/* Scope custom alternative quick link */}
              <button
                onClick={() => handleScopeCustomMvp(3200, ['Custom Bespoke Architecture'])}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold group self-start md:self-auto"
              >
                <span>Need something 100% custom from scratch?</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Category Filter & Search Bar */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              counts={categoryCounts}
            />

            {/* Template Grid */}
            {filteredTemplates.length === 0 ? (
              <div className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900/30 p-12 text-center">
                <p className="text-neutral-400 text-sm">No templates found matching "{searchQuery}".</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-3 text-xs text-amber-400 underline font-semibold"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onOpenDemo={handleOpenDemo}
                    onOrderTemplate={handleOrderTemplate}
                  />
                ))}
              </div>
            )}

            {/* Custom Upsell Banner inside Template Section */}
            <div className="mt-16 rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-amber-400 mb-1">Looking for a tailored build?</div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 font-display">
                  Have a specific Figma design or unique workflow in mind?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl">
                  We frequently build bespoke web apps, client portals, and custom marketing pages for startups and clinics that need tailored features beyond pre-made templates.
                </p>
              </div>

              <button
                onClick={() => handleScopeCustomMvp(2800, ['Bespoke Custom Build'])}
                className="shrink-0 rounded-lg bg-neutral-100 px-5 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-400 active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Request Custom Quote
              </button>
            </div>

          </div>
        </section>

        {/* Startup MVP Engineering Lab & Scoper */}
        <MvpCalculator onScopeCustomMvp={handleScopeCustomMvp} />

        {/* Doctor & Medical Cabinet Specialized Vertical */}
        <DoctorShowcase
          doctorTemplate={doctorTemplate}
          onOpenDemo={handleOpenDemo}
          onOrderTemplate={handleOrderTemplate}
        />

        {/* Process Timeline & Transparent Pricing */}
        <ProcessTimeline onStartProject={handleGeneralOrderClick} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Live Demo Modal */}
      <LiveTemplateModal
        template={activeDemoTemplate}
        onClose={() => setActiveDemoTemplate(null)}
        onOrder={(template) => {
          setActiveDemoTemplate(null);
          handleOrderTemplate(template);
        }}
      />

      {/* Productized Order / Custom MVP Modal */}
      <OrderTemplateModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedTemplate={selectedOrderTemplate}
        isCustomMvpMode={isCustomMvpMode}
        customScopeTotal={customScopeTotal}
        customScopeSummary={customScopeSummary}
        onOrderSubmitted={handleOrderSubmitted}
      />

      {/* Client Orders / Inquiries Tracker Drawer */}
      <ClientOrdersDrawer
        isOpen={isOrdersDrawerOpen}
        onClose={() => setIsOrdersDrawerOpen(false)}
        orders={orders}
        onNewOrder={() => {
          setIsOrdersDrawerOpen(false);
          handleGeneralOrderClick();
        }}
      />

    </div>
  );
}
