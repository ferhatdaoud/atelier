import { TemplateItem, OrderAddon, ClientOrder } from "../types";

export const TEMPLATES: TemplateItem[] = [
  {
    id: "pulse-saas-mvp",
    title: "Pulse Analytics & AI MVP",
    subtitle:
      "High-converting SaaS landing page with dark-mode dashboard, user auth & Chargili billing",
    category: "startup-mvp",
    categoryLabel: "Startup MVP",
    turnkeyPrice: 100000,
    rawPrice: 26000,
    turnaroundTime: "48 Hours",
    image: "/images/project-1-novus.jpg",
    siteLink: "https://novus-analytics.com",
    features: [
      "Interactive SaaS analytics dashboard mockup",
      "Dual pricing tier toggles (Monthly vs Annual)",
      "Pre-configured waitlist & onboarding modal",
      "High-converting social proof & feature grid",
      "Ready for Supabase/PostgreSQL backend connection",
    ],
    description:
      "Designed specifically for tech founders launching a software MVP. Eliminates months of front-end work with pre-built user workflows, pricing grids, and high-impact hero typography.",
    recommendedFor:
      "B2B SaaS, Micro-SaaS tools, AI wrappers, and tech startups seeking validation.",
    demoType: "saas-mvp",
    rating: 4.9,
    ordersCount: 38,
  },
  {
    id: "coaching-remote",
    title: "Remotely coaching application for Online Servies",
    subtitle:
      "Calm, patient-focused medical practice site with interactive consultation booking & doctor profiles",
    category: "medical-clinic",
    categoryLabel: "Doctors & Clinics",
    turnkeyPrice: 85000,
    rawPrice: 23000,
    turnaroundTime: "2-3 Weeks",
    siteLink: "https://medieteticienne.vercel.app/",
    image: "/images/coaching-services.png",
    features: [
      "Step-by-step client appointment request scheduler",
      "Specialist coach credentials, degrees & bio card",
      "Live booking appointment and hourly systems",
      "Interactive coaching treatment & pricing accordion",
      "Direct WhatsApp & phone emergency quick-dial",
    ],
    description:
      "Built specifically for coaching, dentists, therapists, and doctors. Projects immediate clinical trust and guides patients seamlessly from symptom awareness to confirmed bookings.",
    recommendedFor:
      "Private coaching, doctors, physiotherapists, dermatology cabinets, and wellness centers.",
    demoType: "doctor-clinic",
    rating: 5.0,
    ordersCount: 44,
  },
  {
    id: "relay-saas-quicklaunch",
    title: "Best for Artisan-Shop",
    subtitle:
      "High-octane technical landing page with interactive code playground & documentation shell",
    category: "startup-mvp",
    categoryLabel: "Startup MVP",
    turnkeyPrice: 110000,
    rawPrice: 29000,
    turnaroundTime: "2-3 Weeks",
    image: "/images/artisanecom.png",
    siteLink: "https://merchant-ecom.vercel.app/",
    features: [
      "Interactive live API endpoint sandbox preview",
      "Interactive tabbed code snippet switcher (JS, Python, cURL)",
      "Admin dashboard for managing the application",
      "Clean vision and easy navigation for customers",
    ],
    description:
      "Engineered for developer-first products and technical founders. Establishes immediate technical credibility with fast load times and clean code blocks.",
    recommendedFor: "Admin, Merchant, Artisans, and Seller markup.",
    demoType: "saas-mvp",
    rating: 4.8,
    ordersCount: 22,
  },
  {
    id: "cura-dermal-cabinet",
    title: "Cura Dermal & Aesthetic Cabinet",
    subtitle:
      "Elegance-driven aesthetic medicine practice with interactive treatment menu and consultation wizard",
    category: "medical-clinic",
    categoryLabel: "Doctors & Clinics",
    turnkeyPrice: 90000,
    rawPrice: 25000,
    turnaroundTime: "48 Hours",
    image: "/images/template-doctor.jpg",
    siteLink: "https://cura-dermal.com",
    features: [
      "Interactive treatment consultation guide",
      "Doctor board certifications and clinical gallery",
      "Frequently Asked Questions with clinical guidance",
      "Mobile-optimized booking with SMS reminders ready",
    ],
    description:
      "Crafted for modern dermatologists, aesthetic practitioners, and private plastic surgery clinics seeking a clean, high-end editorial presence.",
    recommendedFor:
      "Aesthetic clinics, cosmetic dentists, luxury wellness spas, and dermatologists.",
    demoType: "doctor-clinic",
    rating: 4.9,
    ordersCount: 31,
  },
  {
    id: "Ecomerce Web Application",
    title: "Crafted Goods E-Commerce",
    subtitle:
      "Minimalist editorial product storefront with slide-out cart & frictionless one-page checkout",
    category: "ecommerce",
    categoryLabel: "E-Commerce & Brands",
    turnkeyPrice: 125000,
    rawPrice: 33000,
    turnaroundTime: "7 Days",
    image: "/images/ecomshop.png",
    siteLink: "https://ecom-app-services.vercel.app/",
    features: [
      "Ultra-fast slideout cart drawer with free shipping bar",
      "Curated product lookbook with interactive hotspots",
      "Variant picker (Color, Size, Material) with live preview",
      "Customer review carousel with verified buyer badges",
    ],
    description:
      "A boutique digital storefront engineered to convert premium buyers without visual clutter. Prioritizes product photography and typography.",
    recommendedFor:
      "Direct-to-consumer brands, artisan makers, luxury apparel, and bespoke physical products.",
    demoType: "ecommerce-luxury",
    rating: 4.9,
    ordersCount: 27,
  },
  {
    id: "monolith-architects",
    title: "Monolith Architectural & Design Studio",
    subtitle:
      "Monochromatic architectural firm portfolio with project vault, blueprints & client briefing engine",
    category: "custom-bespoke",
    categoryLabel: "Custom Bespoke",
    turnkeyPrice: 150000,
    rawPrice: 40000,
    turnaroundTime: "3-5 Days",
    image: "/images/template-architect.jpg",
    siteLink: "",
    features: [
      "Interactive architectural project index with filtering by typology",
      "Full-bleed project storytelling with floor plans & specs",
      "In-depth client project briefing questionnaire",
      "Subtle page transitions and responsive masonry grid",
    ],
    description:
      "Designed for architecture offices, interior design practices, and bespoke high-end agencies that need an unmistakably authoritative online presence.",
    recommendedFor:
      "Architects, interior design studios, creative directors, and custom consultancies.",
    demoType: "architect-bespoke",
    rating: 5.0,
    ordersCount: 19,
  },
];
