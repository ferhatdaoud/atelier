import React from "react";
import { TemplateItem } from "../types";
import { TemplateShowcasePage } from "./TemplateShowcasePage";
import { ArrowUpRight } from "lucide-react";

interface FeaturedWorkProps {
  templates: TemplateItem[];
  onOrderTemplate: (template: TemplateItem) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  templates,
  onOrderTemplate,
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<TemplateItem | null>(null);

  // 4 Featured Showcase projects with realistic mockup images from the local images folder
  const showcaseProjects = [
    {
      id: "novus",
      title: "NOVUS",
      category: "Startup MVP",
      date: "June 6, 2026",
      image: "/images/project-1-novus.jpg",
      templateMatch: templates[0] || null,
    },
    {
      id: "remote",
      title: "REMOTE",
      category: "Coaching App",
      date: "April 6, 2026",
      image: "/images/coaching-services.png",
      templateMatch: templates[1] || null,
    },
    {
      id: "artisan",
      title: "ARTISAN-APP",
      category: "Doctor & Clinic Cabinet",
      date: "June 6, 2026",
      image: "/images/artisanecom.png",
      templateMatch: templates[2] || null,
    },
    {
      id: "resfel",
      title: "RESFEL",
      category: "Scalable Web App",
      date: "June 6, 2026",
      image: "/images/project-4-resfel.jpg",
      templateMatch: templates[3] || null,
    },
    {
      id: "ecom",
      title: "ECOM-SHOP",
      category: "Ecomerce web app",
      date: "June 6, 2026",
      image: "/images/ecomshop.png",
      templateMatch: templates[4] || null,
    },
  ];

  const handleProjectClick = (template: TemplateItem) => {
    setSelectedTemplate(template);
  };

  return (
    <section id="work" className="py-24 sm:py-36 relative bg-[#000000]">
      <div className="w-[90vw] max-w-360 mx-auto px-0">
        {/* Centered Section Header matching screenshot */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight">
            Our Work
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
            Selected work that speaks for itself
          </p>
        </div>

        {/* 2x2 Showcase Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {showcaseProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.templateMatch!)}
              className="group cursor-pointer rounded-2xl sm:rounded-[22px] border border-white/10 bg-neutral-900 overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-2xl"
            >
              {/* Device Mockup Visual Container */}
              <div className="relative aspect-16/11 w-full overflow-hidden bg-[#080808]">
                {/* Brand Pill on Top Left */}
                <div className="absolute top-4 left-4 z-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold tracking-widest text-white uppercase font-mono">
                  {project.title}
                </div>

                {/* Arrow Icon Button on Top Right */}
                <div className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff6b2c] group-hover:border-[#ff6b2c]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                {/* Actual Image Asset */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Card Footer matching screenshot */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] text-xs text-zinc-400 font-sans">
                <span className="font-medium text-zinc-300">
                  {project.category}
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">
                  {project.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <TemplateShowcasePage
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onOrder={onOrderTemplate}
        />
      )}
    </section>
  );
};
