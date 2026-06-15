import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Facebook + Instagram icon links. Reused in the header and footer. */
@Component({
  selector: 'app-social-links',
  standalone: true,
  template: `
    <div class="social-links">
      <a
        href="https://www.facebook.com/p/Tubus-Servicios-100037191805658/"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link sl-fb"
        aria-label="Facebook"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
          />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/tubusservicios?igsh=MXYwcXpucHNhaXc0Ng=="
        target="_blank"
        rel="noopener noreferrer"
        class="social-link sl-ig"
        aria-label="Instagram"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {}
