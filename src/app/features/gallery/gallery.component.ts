import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SlideStorageService } from '../../core';
import { Slide } from '../../models';

const AUTOPLAY_MS = 5000;

/** Auto-playing image carousel. Slides come from localStorage (admin-managed). */
@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('progress') private progressRef?: ElementRef<HTMLElement>;

  private readonly storage = inject(SlideStorageService);

  protected readonly slides = signal<Slide[]>([]);
  protected readonly currentSlide = signal(0);
  protected readonly failed = signal<ReadonlySet<number>>(new Set());

  protected readonly currentTitle = computed(
    () => this.slides()[this.currentSlide()]?.title ?? '',
  );
  protected readonly currentCaption = computed(
    () => this.slides()[this.currentSlide()]?.caption ?? '',
  );

  private autoTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.slides.set(this.storage.loadSlides());
  }

  ngAfterViewInit(): void {
    this.restartAuto();
  }

  ngOnDestroy(): void {
    if (this.autoTimer) clearInterval(this.autoTimer);
  }

  goTo(index: number): void {
    const total = this.slides().length;
    if (total === 0) return;
    this.currentSlide.set(((index % total) + total) % total);
    this.restartAuto();
  }

  next(): void {
    this.goTo(this.currentSlide() + 1);
  }

  prev(): void {
    this.goTo(this.currentSlide() - 1);
  }

  onImgError(index: number): void {
    const set = new Set(this.failed());
    set.add(index);
    this.failed.set(set);
  }

  private restartAuto(): void {
    if (this.autoTimer) clearInterval(this.autoTimer);
    // A single banner has nothing to rotate — skip autoplay and the progress bar.
    if (this.slides().length <= 1) return;
    this.resetProgressBar();
    this.autoTimer = setInterval(() => this.next(), AUTOPLAY_MS);
  }

  /** Replays the 5s progress-bar fill from 0 (double rAF to force a reflow). */
  private resetProgressBar(): void {
    const bar = this.progressRef?.nativeElement;
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${AUTOPLAY_MS / 1000}s linear`;
        bar.style.width = '100%';
      });
    });
  }
}
