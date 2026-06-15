import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../core';
import { SectionHeadComponent, WaButtonComponent } from '../../shared';
import { Sede } from '../../models';

/** "Contacto" section: one card per branch (sede). */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent, WaButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly sedes: Sede[] = [
    {
      name: 'Sede Carabobo',
      badge: 'San Diego',
      company: 'Tubus Servicios, C. A.',
      email: 'tubusyutong@gmail.com',
      schedule: '7:30 AM – 5:00 PM',
      address:
        'Av. 74 de la Urb. Terrazas de Castillito, C.C. Morrice N°L-1, San Diego, Edo. Carabobo',
      mapUrl: 'https://maps.app.goo.gl/M8MG71rHjnLQvchw5',
      whatsapps: [
        {
          label: '0412-4446598',
          href: 'https://wa.me/584124446598?text=Hola%20Tubus%20Servicios%20Carabobo%2C%20me%20gustar%C3%ADa%20consultar%20por%20un%20servicio',
        },
        {
          label: '0412-0927278',
          href: 'https://wa.me/584120927278?text=Hola%20Tubus%20Servicios%20Carabobo%2C%20me%20gustar%C3%ADa%20consultar%20por%20un%20servicio',
        },
      ],
    },
    {
      name: 'Sede Guatire',
      badge: 'Zamora',
      company: 'Tubus Yutong FL, C. A.',
      email: 'tubusyutong@gmail.com',
      schedule: '7:30 AM – 5:00 PM',
      address:
        'Carretera Nacional Guarenas-Guatires, Local Parcelamiento Industrial N° Lote E, Zona Industrial Guatire, Mcpio. Zamora, Edo. Miranda',
      // TODO: replace with the real Guatire Maps link — currently duplicated
      // from the Carabobo branch (carried over from the original markup).
      mapUrl: 'https://maps.app.goo.gl/M8MG71rHjnLQvchw5',
      whatsapps: [
        {
          label: '0412-4446598',
          href: 'https://wa.me/584124446598?text=Hola%20Tubus%20Yutong%20Guatire%2C%20me%20gustar%C3%ADa%20consultar%20por%20un%20servicio',
        },
        {
          label: '0412-0927278',
          href: 'https://wa.me/584120927278?text=Hola%20Tubus%20Yutong%20Guatire%2C%20me%20gustar%C3%ADa%20consultar%20por%20un%20servicio',
        },
      ],
    },
  ];
}
