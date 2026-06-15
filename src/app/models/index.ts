/** A carousel slide shown in the gallery banner. */
export interface Slide {
  url: string;
  title: string;
  caption: string;
}

/** A WhatsApp contact entry (display label + wa.me link). */
export interface WhatsAppContact {
  label: string;
  href: string;
}

/** A physical branch (sede) shown in the contact section. */
export interface Sede {
  name: string;
  badge: string;
  company: string;
  email: string;
  schedule: string;
  address: string;
  mapUrl: string;
  whatsapps: WhatsAppContact[];
}

