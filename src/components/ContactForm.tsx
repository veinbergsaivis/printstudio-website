import React, { useState } from 'react';
import Button from './Button'; // Importējam pielāgoto pogu
import { cn } from '../lib/utils'; // Importējam cn, ja nepieciešams

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Šeit būtu reāla formas nosūtīšanas loģika (piem., uz API)
    console.log('Form submitted:', formData);
    alert('Thanks for your message! We will get back to you soon.'); // TODO: Aizstāt alert ar labāku paziņojumu
    setFormData({ name: '', email: '', message: '' }); // Notīrām formu
  };

  // Bāzes stili ievades laukiem, lai neatkārtotos
  const inputBaseStyles = cn(
    "w-full px-4 py-3 rounded-lg text-sm md:text-base", // Pievienots text-sm md:text-base responsīvam fonta izmēram
    // === KRĀSAS NOMAINĪTAS ===
    "bg-surface border border-border-color text-text-base placeholder-text-muted", // Fons, apmale, teksts, placeholder
    "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary", // Fokusa stili (izmanto primāro krāsu)
    "transition-all duration-300"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6"> {/* Nedaudz pielāgota atstarpe */}
      <div>
        {/* === KRĀSAS NOMAINĪTAS === */}
        <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-text-base"> {/* Samazināta atstarpe un fonta izmērs */}
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputBaseStyles} // Izmantojam bāzes stilus
          placeholder="Jūsu vārds vai uzņēmuma nosaukums"
          autoComplete="name" // Pievienots autocomplete atribūts
        />
      </div>

      <div>
        {/* === KRĀSAS NOMAINĪTAS === */}
        <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-text-base"> {/* Samazināta atstarpe un fonta izmērs */}
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputBaseStyles} // Izmantojam bāzes stilus
          placeholder="Jūsu e-pasts"
          autoComplete="email" // Pievienots autocomplete atribūts
        />
      </div>

      <div>
        {/* === KRĀSAS NOMAINĪTAS === */}
        <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-text-base"> {/* Samazināta atstarpe un fonta izmērs */}
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={inputBaseStyles} // Izmantojam bāzes stilus
          placeholder="Jūsu ziņojums"
          autoComplete="off" // Izslēdzam autocomplete ziņojumam
        />
      </div>

      {/* Izmantojam pielāgoto Button komponentu */}
      {/* Pārliecinies, ka Button komponentā 'primary' variants ir tas, ko vēlies šeit (piem., electric-blue) */}
      <Button type="submit" variant="primary" size="md" className="w-full">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;