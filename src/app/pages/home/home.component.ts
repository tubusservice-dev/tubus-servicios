import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AboutComponent,
  ContactComponent,
  GalleryComponent,
  HeroComponent,
  ServicesComponent,
} from '../../features';

/** Public landing page: composes every section in order. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    GalleryComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-gallery />
    <app-services />
    <app-about />
    <app-contact />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
