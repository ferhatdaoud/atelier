import React, { useState } from 'react';
import { Mail, MapPin, Send, X } from 'lucide-react';

interface ContactPageProps {
  onClose: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you! Your message has been sent.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-white">
      {/* Background matching Hero section */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.35)), url('/images/home-hero-user.jpg')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />
      <header className="flex h-16 items-center justify-between px-6 border-b border-white/10">
        <button onClick={onClose} className="text-zinc-400 hover:text-white flex items-center gap-2">
          <X className="w-5 h-5" /> Close
        </button>
        <h1 className="font-bold text-lg">Contact Us</h1>
        <div className="w-20"></div>
      </header>

      <main className="p-6 md:p-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold mb-6 font-display">Let's build something extraordinary.</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">Have a project in mind? We're ready to help you bring your vision to life. Send us a message and let's get started.</p>
          
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder="Your Name" required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-sm focus:border-[#ff6b2c] outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Your Email" required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-sm focus:border-[#ff6b2c] outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
          <textarea placeholder="Your Message" required rows={4} className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-sm focus:border-[#ff6b2c] outline-none" onChange={e => setFormData({...formData, message: e.target.value})} />
          <button type="submit" className="w-full bg-[#ff6b2c] py-4 rounded-xl font-bold text-sm hover:bg-[#ff824d] transition-all flex items-center justify-center gap-2">
            Send Message <Send className="w-4 h-4" />
          </button>
        </form>
      </main>
    </div>
  );
};

// Add this new Hero-style background to ContactPage
getComputedStyle(document.documentElement).setProperty('--hero-bg-image', 'url(\'/images/home-hero-user.jpg\')');