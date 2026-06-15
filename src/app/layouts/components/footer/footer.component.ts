import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialLinksComponent } from '../../../shared';

/** Site footer: copyright, in-page links and social icons. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
}
