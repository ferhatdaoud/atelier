import { TemplateItem, OrderAddon, ClientOrder } from '../types';

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'pulse-saas-mvp',
    title: 'Pulse Analytics & AI MVP',
    subtitle: 'High-converting SaaS landing page with dark-mode dashboard, user auth & Stripe billing',
    category: 'startup-mvp',
    categoryLabel: 'Startup MVP',
    turnkeyPrice: 790,
    rawPrice: 199,
    turnaroundTime: '48 Hours',
    image: '/images/project-1-novus.jpg',
    tags: ['Next.js 15', 'Tailwind CSS', 'Stripe Subscriptions', 'Supabase Auth', 'AI Insights UI'],
    features: [
      'Interactive SaaS analytics dashboard mockup',
      'Dual pricing tier toggles (Monthly vs Annual)',
      'Pre-configured waitlist & onboarding modal',
      'High-converting social proof & feature grid',
      'Ready for Supabase/PostgreSQL backend connection'
    ],
    description: 'Designed specifically for tech founders launching a software MVP. Eliminates months of front-end work with pre-built user workflows, pricing grids, and high-impact hero typography.',
    recommendedFor: 'B2B SaaS, Micro-SaaS tools, AI wrappers, and tech startups seeking validation.',
    demoType: 'saas-mvp',
    rating: 4.9,
    ordersCount: 38,
  },
  {
    id: 'sanora-medical-clinic',
    title: 'Sanora Medical & Dental Cabinet',
    subtitle: 'Calm, patient-focused medical practice site with interactive consultation booking & doctor profiles',
    category: 'medical-clinic',
    categoryLabel: 'Doctors & Clinics',
    turnkeyPrice: 650,
    rawPrice: 179,
    turnaroundTime: '48 Hours',
    image: '/images/template-doctor.jpg',
    tags: ['Doctor Profile', 'Appointment Booking', 'HIPAA Ready UI', 'Treatment Menu', 'Google Reviews'],
    features: [
      'Step-by-step patient appointment request scheduler',
      'Specialist doctor credentials, degrees & bio card',
      'Insurance provider badge directory & accepted plans',
      'Interactive clinic treatment & pricing accordion',
      'Direct WhatsApp & phone emergency quick-dial'
    ],
    description: 'Built specifically for doctors, dentists, therapists, and private clinics. Projects immediate clinical trust and guides patients seamlessly from symptom awareness to confirmed bookings.',
    recommendedFor: 'Private doctors, dental clinics, physiotherapists, dermatology cabinets, and wellness centers.',
    demoType: 'doctor-clinic',
    rating: 5.0,
    ordersCount: 44,
  },
  {
    id: 'relay-saas-quicklaunch',
    title: 'Relay Developer Tool & API MVP',
    subtitle: 'High-octane technical landing page with interactive code playground & documentation shell',
    category: 'startup-mvp',
    categoryLabel: 'Startup MVP',
    turnkeyPrice: 850,
    rawPrice: 220,
    turnaroundTime: '72 Hours',
    image: '/images/project-1-novus.jpg',
    tags: ['API Docs', 'Syntax Highlighting', 'Self-Serve Auth', 'CLI Terminal Mockup', 'Changelog'],
    features: [
      'Interactive live API endpoint sandbox preview',
      'Interactive tabbed code snippet switcher (JS, Python, cURL)',
      'Self-serve developer tier pricing & usage calculator',
      'Clean documentation layout with breadcrumb search'
    ],
    description: 'Engineered for developer-first products and technical founders. Establishes immediate technical credibility with fast load times and clean code blocks.',
    recommendedFor: 'DevTools, API services, SDK launches, and infrastructure startups.',
    demoType: 'saas-mvp',
    rating: 4.8,
    ordersCount: 22,
  },
  {
    id: 'cura-dermal-cabinet',
    title: 'Cura Dermal & Aesthetic Cabinet',
    subtitle: 'Elegance-driven aesthetic medicine practice with interactive treatment menu and consultation wizard',
    category: 'medical-clinic',
    categoryLabel: 'Doctors & Clinics',
    turnkeyPrice: 690,
    rawPrice: 189,
    turnaroundTime: '48 Hours',
    image: '/images/template-doctor.jpg',
    tags: ['Aesthetics', 'Treatment Calculator', 'Doctor Credentials', 'Patient Stories'],
    features: [
      'Interactive treatment consultation guide',
      'Doctor board certifications and clinical gallery',
      'Frequently Asked Questions with clinical guidance',
      'Mobile-optimized booking with SMS reminders ready'
    ],
    description: 'Crafted for modern dermatologists, aesthetic practitioners, and private plastic surgery clinics seeking a clean, high-end editorial presence.',
    recommendedFor: 'Aesthetic clinics, cosmetic dentists, luxury wellness spas, and dermatologists.',
    demoType: 'doctor-clinic',
    rating: 4.9,
    ordersCount: 31,
  },
  {
    id: 'sonder-luxury-dtc',
    title: 'Sonder Crafted Goods E-Commerce',
    subtitle: 'Minimalist editorial product storefront with slide-out cart & frictionless one-page checkout',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Brands',
    turnkeyPrice: 950,
    rawPrice: 249,
    turnaroundTime: '3-4 Days',
    image: '/images/template-ecommerce.jpg',
    tags: ['Shopify Ready', 'Slide-out Cart', 'Editorial Lookbook', 'Product Storytelling'],
    features: [
      'Ultra-fast slideout cart drawer with free shipping bar',
      'Curated product lookbook with interactive hotspots',
      'Variant picker (Color, Size, Material) with live preview',
      'Customer review carousel with verified buyer badges'
    ],
    description: 'A boutique digital storefront engineered to convert premium buyers without visual clutter. Prioritizes product photography and typography.',
    recommendedFor: 'Direct-to-consumer brands, artisan makers, luxury apparel, and bespoke physical products.',
    demoType: 'ecommerce-luxury',
    rating: 4.9,
    ordersCount: 27,
  },
  {
    id: 'monolith-architects',
    title: 'Monolith Architectural & Design Studio',
    subtitle: 'Monochromatic architectural firm portfolio with project vault, blueprints & client briefing engine',
    category: 'custom-bespoke',
    categoryLabel: 'Custom Bespoke',
    turnkeyPrice: 1150,
    rawPrice: 299,
    turnaroundTime: '3-5 Days',
    image: '/images/template-architect.jpg',
    tags: ['Editorial Grid', 'Project Vault', 'Bespoke Inquiry Form', 'Fullscreen Gallery'],
    features: [
      'Interactive architectural project index with filtering by typology',
      'Full-bleed project storytelling with floor plans & specs',
      'In-depth client project briefing questionnaire',
      'Subtle page transitions and responsive masonry grid'
    ],
    description: 'Designed for architecture offices, interior design practices, and bespoke high-end agencies that need an unmistakably authoritative online presence.',
    recommendedFor: 'Architects, interior design studios, creative directors, and custom consultancies.',
    demoType: 'architect-bespoke',
    rating: 5.0,
    ordersCount: 19,
  }
];

export const ORDER_ADDONS: OrderAddon[] = [
  {
    id: 'brand-colors',
    label: 'Brand & Copy Adaptation',
    description: 'We integrate your exact logo, brand palette, typography, and company copywriting into every section.',
    price: 0 // Included free with Turnkey
  },
  {
    id: 'stripe-billing',
    label: 'Stripe Payment / Booking Checkout',
    description: 'Full integration with your Stripe account for subscription payments, one-time fees, or consultation deposits.',
    price: 250
  },
  {
    id: 'custom-domain',
    label: 'Custom Domain & DNS Setup',
    description: 'We connect your domain (GoDaddy, Namecheap, Google Domains, Cloudflare) with automated SSL and CDN routing.',
    price: 60
  },
  {
    id: 'crm-intake',
    label: 'CRM & Lead Automation',
    description: 'Sends all patient or lead submissions directly to your email, WhatsApp, or CRM (HubSpot, Notion, Airtable).',
    price: 150
  },
  {
    id: 'extra-pages',
    label: '2 Additional Custom Subpages',
    description: 'Need specific case studies, team sub-pages, or specialized clinic treatment dossiers? We craft them to match.',
    price: 280
  }
];

export const INITIAL_TEST_ORDERS: ClientOrder[] = [
  {
    id: 'VK-4192',
    orderType: 'template',
    templateId: 'pulse-saas-mvp',
    templateTitle: 'Pulse Analytics & AI MVP',
    tier: 'turnkey',
    clientName: 'Julian Croft',
    clientEmail: 'julian@orbitpulse.io',
    companyName: 'OrbitPulse Technologies',
    industry: 'FinTech Analytics',
    hasBranding: 'ready',
    timeline: 'Within 48 hours',
    selectedAddons: ['brand-colors', 'stripe-billing'],
    totalPrice: 1040,
    notes: 'We have our Figma logo and API docs ready. Need the pricing page hooked to our Stripe test keys.',
    status: 'In Development',
    createdAt: '2026-09-28'
  },
  {
    id: 'VK-3801',
    orderType: 'template',
    templateId: 'sanora-medical-clinic',
    templateTitle: 'Sanora Medical & Dental Cabinet',
    tier: 'turnkey',
    clientName: 'Dr. Elena Rostova',
    clientEmail: 'dr.rostova@rostovaclinic.com',
    companyName: 'Rostova Dental & Aesthetics',
    industry: 'Dental & Maxillofacial Practice',
    hasBranding: 'need-logo',
    timeline: '3-4 Days',
    selectedAddons: ['brand-colors', 'crm-intake', 'custom-domain'],
    totalPrice: 860,
    notes: 'Please add our 3 dentists to the staff section with their specialty qualifications and link booking to our reception desk email.',
    status: 'Ready to Launch',
    createdAt: '2026-09-26'
  }
];
