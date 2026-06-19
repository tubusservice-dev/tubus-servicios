import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Full-width static image banner (no carousel/controls). Keeps the banner
 * art's 1440x400 ratio so the image is shown complete, without cropping.
 */
@Component({
  selector: 'app-banner',
  standalone: true,
  template: `
    <div class="banner-strip">
      <img [src]="src" [alt]="alt" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .banner-strip {
      width: 100%;
      aspect-ratio: 1440 / 400;
      overflow: hidden;
    }
    .banner-strip img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  @Input({ required: true }) src = '';
  @Input() alt = '';
}
