import ColorContrastChecker from 'color-contrast-checker';

const ccc = new ColorContrastChecker();

// Funkcija krāsu kontrasta pārbaudei
export const checkColorContrast = (foreground: string, background: string): boolean => {
  try {
    return ccc.isLevelAA(foreground, background);
  } catch (error) {
    console.error('Color contrast check failed:', error);
    return false;
  }
};

// Funkcija RGB krāsas pārvēršanai HEX formātā
export const rgbToHex = (rgb: string): string => {
  // Pārbauda, vai krāsa jau ir HEX formātā
  if (rgb.startsWith('#')) {
    return rgb;
  }

  // Pārveido rgb(r, g, b) formātu HEX formātā
  const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
  }

  // Ja formāts nav atpazīts, atgriež melnu krāsu
  return '#000000';
};

// Funkcija elementa krāsas iegūšanai
export const getComputedColor = (element: HTMLElement, property: string): string => {
  const color = window.getComputedStyle(element).getPropertyValue(property);
  return rgbToHex(color);
};

// Funkcija elementa kontrasta pārbaudei
export const checkElementContrast = (element: HTMLElement): boolean => {
  const foreground = getComputedColor(element, 'color');
  const background = getComputedColor(element, 'background-color');
  return checkColorContrast(foreground, background);
};

// Funkcija visu teksta elementu kontrasta pārbaudei
export const checkAllTextContrast = (): void => {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label, input, textarea');
  
  textElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const hasGoodContrast = checkElementContrast(htmlElement);
    
    if (!hasGoodContrast) {
      console.warn('Poor contrast detected:', {
        element: htmlElement,
        text: htmlElement.textContent,
        foreground: getComputedColor(htmlElement, 'color'),
        background: getComputedColor(htmlElement, 'background-color')
      });
    }
  });
};