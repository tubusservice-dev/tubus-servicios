import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Centered section header: chip + heading + lead paragraph. */
@Component({
  selector: 'app-section-head',
  standalone: true,
  template: `
    <div class="section-head" [style.margin-bottom]="marginBottom || null">
      <span class="chip">{{ chip }}</span>
      <h2>{{ heading }}</h2>
      <p>{{ text }}</p>
    </div>
  `,
  styleUrl: './section-head.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadComponent {
  @Input({ required: true }) chip = '';
  @Input({ required: true }) heading = '';
  @Input({ required: true }) text = '';
  /** Optional override for the default bottom spacing (e.g. '40px'). */
  @Input() marginBottom = '';
}
