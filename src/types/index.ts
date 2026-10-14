export type Category = "startup-mvp" | "medical-clinic" | "ecommerce";

export type PackageType = "landing" | "mvp" | "full-app";

export interface TemplateItem {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  turnkeyPrice: number;
  turnaroundTime: string;
  image: string;
  siteLink: string;
  features: string[];
  description: string;
  recommendedFor: string;
}
