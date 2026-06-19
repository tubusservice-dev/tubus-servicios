import { Injectable } from '@angular/core';
import { Slide } from '../../models';

const STORAGE_KEY = 'tubus_banner_slides';

const DEFAULT_SLIDES: Slide[] = [
  { url: 'assets/img/banner-2.jpg', title: '', caption: '' },
  // Banner 1 ready to add later:
  // { url: 'assets/img/banner-1.jpg', title: '', caption: '' },
];

/** Persists the gallery slides in localStorage (no backend). */
@Injectable({ providedIn: 'root' })
export class SlideStorageService {
  loadSlides(): Slide[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Slide[]) : this.defaults();
    } catch {
      return this.defaults();
    }
  }

  saveSlides(slides: Slide[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
  }

  defaults(): Slide[] {
    return DEFAULT_SLIDES.map((s) => ({ ...s }));
  }
}
