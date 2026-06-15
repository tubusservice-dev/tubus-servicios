import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

/**
 * Reveal-on-scroll. Auto-applies to any element with the `reveal` class and
 * adds `visible` the first time it enters the viewport. Mirrors the original
 * IntersectionObserver behaviour (threshold 0.12, one-shot).
 */
@Directive({
  selector: '[appReveal], .reveal',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.classList.add('visible');
            this.observer?.unobserve(this.el);
          }
        });
      },
      { threshold: 0.12 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
