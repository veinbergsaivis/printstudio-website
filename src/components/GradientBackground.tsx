import React from 'react';
import { cn } from '../lib/utils'; // Importējam cn, ja nepieciešams

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, className }) => {
  return (
    // Pievienojam relative, lai absolūtie elementi pozicionētos attiecībā pret šo
    <div className={cn("relative", className)}>
      {/* Gradienta slānis */}
      {/* === KRĀSAS NOMAINĪTAS === */}
      <div className={cn(
        "absolute inset-0",
        // Izmantojam semantiskās krāsas gradientam
        // Pielāgo 'secondary' un 'primary', ja tavas 'neon-purple' un 'electric-blue' ir citādi nosauktas
        "bg-gradient-to-br from-background via-secondary to-primary",
        "opacity-60" // Caurspīdīgums gradientam, pielāgo pēc vajadzības
      )}></div>

      {/* Tumšā pārklājuma slānis */}
      {/* === KRĀSAS NOMAINĪTAS === */}
      <div className={cn(
        "absolute inset-0",
        // Izmantojam fona krāsu ar caurspīdīgumu kā pārklājumu
        "bg-background/80" // Pielāgo caurspīdīgumu (80%) pēc vajadzības
      )}></div>

      {/* Saturs tiek renderēts virs fona slāņiem */}
      {/* Pievienojam relative un z-10, lai garantētu, ka saturs ir virs fona */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;