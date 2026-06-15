import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'tubus_theme';

/**
 * Owns the dark/light theme state. The initial value is read from the
 * <html data-theme> attribute, which the inline pre-paint script in
 * index.html sets before Angular bootstraps (avoids theme flash).
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _isLight = signal<boolean>(this.readInitial());
  readonly isLight = this._isLight.asReadonly();

  toggle(): void {
    const next = !this._isLight();
    this._isLight.set(next);

    if (next) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'dark');
    }
  }

  private readInitial(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }
}
