import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlideStorageService } from '../../core';
import { Slide } from '../../models';

/** Gallery admin: add, edit, reorder and persist carousel slides. */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private readonly storage = inject(SlideStorageService);

  protected readonly slides = signal<Slide[]>(this.storage.loadSlides());
  protected readonly saved = signal(false);

  private savedTimer?: ReturnType<typeof setTimeout>;

  addSlide(): void {
    this.slides.update((list) => [
      ...list,
      { url: '', title: 'Nueva imagen', caption: '' },
    ]);
  }

  removeSlide(index: number): void {
    if (this.slides().length <= 1) return;
    this.slides.update((list) => list.filter((_, i) => i !== index));
  }

  moveSlide(index: number, direction: -1 | 1): void {
    const target = index + direction;
    const list = this.slides();
    if (target < 0 || target >= list.length) return;

    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    this.slides.set(next);
  }

  save(): void {
    this.storage.saveSlides(this.slides());
    this.saved.set(true);
    if (this.savedTimer) clearTimeout(this.savedTimer);
    this.savedTimer = setTimeout(() => this.saved.set(false), 3000);
  }
}
