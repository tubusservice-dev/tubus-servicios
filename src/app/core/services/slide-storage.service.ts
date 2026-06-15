import { Injectable } from '@angular/core';
import { Slide } from '../../models';

const STORAGE_KEY = 'tubus_banner_slides';

const DEFAULT_SLIDES: Slide[] = [
  { url: '', title: 'Flota Yutong', caption: 'Concesionario autorizado Yutong' },
  { url: '', title: 'Taller Especializado', caption: 'Técnicos certificados en autobuses' },
  { url: '', title: 'Repuestos Originales', caption: 'Stock permanente con garantía de fábrica' },
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
