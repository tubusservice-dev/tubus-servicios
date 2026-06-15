import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core';
import { SocialLinksComponent } from '../../../shared';

/** Sticky top navigation: brand, social links, WhatsApp and theme toggle. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SocialLinksComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);
}
