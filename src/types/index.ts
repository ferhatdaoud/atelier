export type Category =
  | "all"
  | "startup-mvp"
  | "medical-clinic"
  | "ecommerce"
  | "custom-bespoke";

export interface TemplateItem {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  turnkeyPrice: number;
  rawPrice: number;
  turnaroundTime: string;
  image: string;
  siteLink: string;
  features: string[];
  description: string;
  recommendedFor: string;
  demoType:
    | "saas-mvp"
    | "doctor-clinic"
    | "ecommerce-luxury"
    | "architect-bespoke";
  rating: number;
  ordersCount: number;
}

export interface OrderAddon {
  id: string;
  label: string;
  description: string;
  price: number;
}

export interface ClientOrder {
  id: string;
  orderType: "template" | "custom-mvp" | "package";
  templateId?: string;
  templateTitle?: string;
  tier: "landing" | "mvp" | "full-app" | "turnkey" | "raw" | "custom-sprint";
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  companyName: string;
  industry: string;
  hasBranding: "ready" | "need-logo" | "complete-rebrand";
  timeline: string;
  selectedAddons: string[];
  totalPrice: number;
  notes: string;
  status: "In Review" | "Discovery Call" | "In Development" | "Ready to Launch";
  createdAt: string;
}

export interface MvpScopeOption {
  productType: "saas" | "marketplace" | "ai-tool" | "mobile-pwa";
  authType: "simple" | "rbac";
  payments: "none" | "chargili-basic" | "chargili-sub";
  database: "supabase" | "realtime";
  aiIntegration: "none" | "basic-llm" | "advanced-rag";
  speed: "standard" | "rush";
}
