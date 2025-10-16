declare module 'color-contrast-checker' {
  export default class ColorContrastChecker {
    isLevelAA(foreground: string, background: string): boolean;
    isLevelAAA(foreground: string, background: string): boolean;
    isLevelCustom(foreground: string, background: string, fontSize: number, customRatio: number): boolean;
    getRGBFromHex(color: string): { r: number; g: number; b: number };
    getLuminance(r: number, g: number, b: number): number;
    getContrastRatio(l1: number, l2: number): number;
  }
}