import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  disabled,
  ...props
}) => {
  const baseStyles = `
    font-semibold rounded-md transition-all duration-200 ease-in-out
    inline-flex items-center justify-center relative overflow-hidden
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-offset-background disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-primary text-white shadow-md hover:shadow-lg hover:brightness-110
      active:brightness-100 active:scale-[0.98] focus-visible:ring-primary
      disabled:bg-primary/50 disabled:shadow-none disabled:brightness-100
    `,
    // Sekundārā poga: Teksts tumšs (text-base) uz vidēji pelēka (secondary) fona
    secondary: `
      bg-secondary text-text-base shadow-md hover:shadow-lg hover:bg-secondary/80 
      active:bg-secondary/70 active:scale-[0.98] focus-visible:ring-secondary
      disabled:bg-secondary/50 disabled:text-text-base/60 disabled:shadow-none
    `, // Pielāgots hover un active, lai nedaudz mainītu fona pelēko, nevis brightness
    outline: `
      bg-transparent border border-secondary text-secondary
      hover:bg-secondary hover:text-white active:bg-secondary/90
      focus-visible:ring-secondary
      disabled:border-secondary/40 disabled:text-secondary/40 disabled:bg-transparent
    `,
  };

  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-5',
    lg: 'text-lg py-2.5 px-7',
  };

  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        // Vispārējie disabled stili var palikt, bet specifiskie variantos ir prioritāri
        // Ja specifiskie disabled stili variantos ir pietiekami, šo var noņemt vai atstāt kā fallback
        disabled && !variantStyles[variant].includes('disabled:') && 'opacity-60 pointer-events-none',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;