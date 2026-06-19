import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AboutComponent,
  ContactComponent,
  GalleryComponent,
  HeroComponent,
  ServicesComponent,
} from '../../features';
import { BannerComponent } from '../../shared';

/** Public landing page: composes every section in order. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GalleryComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    BannerComponent,
  ],
  template: `
    <app-gallery />
    <app-hero />
    <app-services />
    <app-about />
    <app-contact />
    <app-banner src="assets/img/banner-1.jpg" alt="Tubus Servicios" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
