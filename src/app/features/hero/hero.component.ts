import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountUpDirective, RevealDirective } from '../../core';

/** Landing hero: headline + CTAs on the left, KPI dashboard on the right. */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective, CountUpDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly brands = [
    'Yutong',
    'Mercedes-Benz',
    'Volvo',
    'Scania',
    'Encava',
    'Agrale',
  ];
}
