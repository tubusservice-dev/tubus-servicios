import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Animates a number from 0 to the target value (ease-out cubic) the first time
 * the element scrolls into view. Usage: <span [countUp]="500">0</span>
 */
@Directive({
  selector: '[countUp]',
  standalone: true,
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true }) countUp = 0;
  @Input() duration = 1600;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animate();
            this.observer?.unobserve(this.el);
          }
        });
      },
      { threshold: 0.3 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animate(): void {
    const target = this.countUp;
    const start = performance.now();

    const step = (now: number): void => {
      const progress = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.el.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}
