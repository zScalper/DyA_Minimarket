// theme.service.ts
import { Injectable } from '@angular/core';

const STORAGE_KEY_THEME = 'dya-theme';
const STORAGE_KEY_FONT = 'dya-font-size';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkTheme = false;
  private fontSize = 100; // porcentaje base (100% = 16px)

  constructor() {
    // restaurar preferencias
    const persistedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (persistedTheme === 'dark') {
      this.darkTheme = true;
      document.documentElement.classList.add('dark-theme');
    }

    const persistedFont = localStorage.getItem(STORAGE_KEY_FONT);
    if (persistedFont) {
      this.fontSize = parseInt(persistedFont, 10);
      this.applyFontSize();
    }
  }

  // Tema
  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    const classList = document.documentElement.classList;
    this.darkTheme ? classList.add('dark-theme') : classList.remove('dark-theme');
    localStorage.setItem(STORAGE_KEY_THEME, this.darkTheme ? 'dark' : 'light');
  }

  isDarkTheme(): boolean {
    return this.darkTheme;
  }

  // Fuente
  increaseFont(): void {
    if (this.fontSize < 150) { // límite superior
      this.fontSize += 10;
      this.applyFontSize();
    }
  }

  decreaseFont(): void {
    if (this.fontSize > 80) { // límite inferior
      this.fontSize -= 10;
      this.applyFontSize();
    }
  }

  private applyFontSize(): void {
    document.documentElement.style.fontSize = `${this.fontSize}%`;
    localStorage.setItem(STORAGE_KEY_FONT, String(this.fontSize));
  }
}
