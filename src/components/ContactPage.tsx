import React, { useState } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Send, X } from "lucide-react";
import { api, errorMessage } from "../lib/api";

interface ContactPageProps {
  onClose: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot — hidden from humans
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await api("/contact", { method: "POST", body: formData });
      setStatus("sent");
    } catch (err) {
      setError(errorMessage(err));
      setStatus("idle");
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080808] text-white">
      {/* Background matching Hero section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-no-repeat opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.35)), url('/images/home-hero-user.jpg')`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10">
        <header className="flex h-16 items-center justify-between px-6 border-b border-white/10 bg-[#080808]/80 backdrop-blur-sm">
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white flex items-center gap-2"
          >
            <X className="w-5 h-5" /> Close
          </button>
          <h1 className="font-bold text-lg">Contact Us</h1>
          <div className="w-20"></div>
        </header>

        <main className="p-6 md:p-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#080808]/60 backdrop-blur-sm mt-6 rounded-2xl border border-white/5">
          <div>
            <h2 className="text-4xl font-bold mb-6 font-display">
              Let's build something extraordinary.
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Have a project in mind? We're ready to help you bring your vision
              to life. Send us a message and let's get started.
            </p>

            <div className="space-y-4 text-zinc-300">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#ff6b2c]" />
                <span>hello@kzfr.studio</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#ff6b2c]" />
                <span>Remote Worldwide</span>
              </div>
            </div>
          </div>

          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-white/10 bg-[#0d0d0d] p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6b2c]/10 border border-[#ff6b2c]/30 text-[#ff6b2c] mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-display">Message sent!</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Thanks {formData.name.split(" ")[0]}, we'll get back to you at{" "}
                <span className="text-zinc-200">{formData.email}</span> within one business day.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-white/10 border border-white/15 px-6 py-2.5 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                required
                maxLength={100}
                value={formData.name}
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-sm focus:border-[#ff6b2c] outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                maxLength={254}
                value={formData.email}
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-sm focus:border-[#ff6b2c] outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <textarea
                placeholder="Your Message"
                required
                rows={4}
                maxLength={5000}
                value={formData.message}
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-sm focus:border-[#ff6b2c] outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              {/* Honeypot: invisible to people, tempting to bots. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
              {error && (
                <p role="alert" className="rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-[#ff6b2c] py-4 rounded-xl font-bold text-sm hover:bg-[#ff824d] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
              >
                {status === "sending" ? (
                  <>
                    Sending… <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};
