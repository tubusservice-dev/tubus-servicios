import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../core';
import { SectionHeadComponent } from '../../shared';

/** "Servicios" section: 4 service cards. */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {}
