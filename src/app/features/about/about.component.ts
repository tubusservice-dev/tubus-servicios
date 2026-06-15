import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../core';
import { SectionHeadComponent } from '../../shared';

/** "Por qué elegirnos" section: 4 value-proposition items. */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
