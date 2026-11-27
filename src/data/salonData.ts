import type { ResponsiveImageSources } from '../components/ResponsiveImage';

import hero400 from '../assets/images/responsive/hero_iqra_salon_1794579693191_400w.jpg';
import hero800 from '../assets/images/responsive/hero_iqra_salon_1794579693191_800w.jpg';
import hero1200 from '../assets/images/responsive/hero_iqra_salon_1794579693191_1200w.jpg';
import heroWebp400 from '../assets/images/responsive/hero_iqra_salon_1794579693191_400w.webp';
import heroWebp800 from '../assets/images/responsive/hero_iqra_salon_1794579693191_800w.webp';
import heroWebp1200 from '../assets/images/responsive/hero_iqra_salon_1794579693191_1200w.webp';

import makeup400 from '../assets/images/responsive/gallery_party_makeup_1794579693109_400w.jpg';
import makeup800 from '../assets/images/responsive/gallery_party_makeup_1794579693109_800w.jpg';
import makeup1200 from '../assets/images/responsive/gallery_party_makeup_1794579693109_1200w.jpg';
import makeupWebp400 from '../assets/images/responsive/gallery_party_makeup_1794579693109_400w.webp';
import makeupWebp800 from '../assets/images/responsive/gallery_party_makeup_1794579693109_800w.webp';
import makeupWebp1200 from '../assets/images/responsive/gallery_party_makeup_1794579693109_1200w.webp';

import highlights400 from '../assets/images/responsive/gallery_hair_highlights_1794579693526_400w.jpg';
import highlights800 from '../assets/images/responsive/gallery_hair_highlights_1794579693526_800w.jpg';
import highlights1200 from '../assets/images/responsive/gallery_hair_highlights_1794579693526_1200w.jpg';
import highlightsWebp400 from '../assets/images/responsive/gallery_hair_highlights_1794579693526_400w.webp';
import highlightsWebp800 from '../assets/images/responsive/gallery_hair_highlights_1794579693526_800w.webp';
import highlightsWebp1200 from '../assets/images/responsive/gallery_hair_highlights_1794579693526_1200w.webp';

import keratin400 from '../assets/images/responsive/gallery_keratin_hair_1794579694347_400w.jpg';
import keratin800 from '../assets/images/responsive/gallery_keratin_hair_1794579694347_800w.jpg';
import keratin1200 from '../assets/images/responsive/gallery_keratin_hair_1794579694347_1200w.jpg';
import keratinWebp400 from '../assets/images/responsive/gallery_keratin_hair_1794579694347_400w.webp';
import keratinWebp800 from '../assets/images/responsive/gallery_keratin_hair_1794579694347_800w.webp';
import keratinWebp1200 from '../assets/images/responsive/gallery_keratin_hair_1794579694347_1200w.webp';

import facial400 from '../assets/images/responsive/gallery_facial_spa_1794579694326_400w.jpg';
import facial800 from '../assets/images/responsive/gallery_facial_spa_1794579694326_800w.jpg';
import facial1200 from '../assets/images/responsive/gallery_facial_spa_1794579694326_1200w.jpg';
import facialWebp400 from '../assets/images/responsive/gallery_facial_spa_1794579694326_400w.webp';
import facialWebp800 from '../assets/images/responsive/gallery_facial_spa_1794579694326_800w.webp';
import facialWebp1200 from '../assets/images/responsive/gallery_facial_spa_1794579694326_1200w.webp';

import styling400 from '../assets/images/responsive/gallery_hair_styling_1794579695204_400w.jpg';
import styling800 from '../assets/images/responsive/gallery_hair_styling_1794579695204_800w.jpg';
import styling1200 from '../assets/images/responsive/gallery_hair_styling_1794579695204_1200w.jpg';
import stylingWebp400 from '../assets/images/responsive/gallery_hair_styling_1794579695204_400w.webp';
import stylingWebp800 from '../assets/images/responsive/gallery_hair_styling_1794579695204_800w.webp';
import stylingWebp1200 from '../assets/images/responsive/gallery_hair_styling_1794579695204_1200w.webp';

import hairDye400 from '../assets/images/responsive/service_hair_dye_1794585479246_400w.jpg';
import hairDye800 from '../assets/images/responsive/service_hair_dye_1794585479246_800w.jpg';
import hairDye1200 from '../assets/images/responsive/service_hair_dye_1794585479246_1200w.jpg';
import hairDyeWebp400 from '../assets/images/responsive/service_hair_dye_1794585479246_400w.webp';
import hairDyeWebp800 from '../assets/images/responsive/service_hair_dye_1794585479246_800w.webp';
import hairDyeWebp1200 from '../assets/images/responsive/service_hair_dye_1794585479246_1200w.webp';

import waxing400 from '../assets/images/responsive/service_waxing_1794585479607_400w.jpg';
import waxing800 from '../assets/images/responsive/service_waxing_1794585479607_800w.jpg';
import waxing1200 from '../assets/images/responsive/service_waxing_1794585479607_1200w.jpg';
import waxingWebp400 from '../assets/images/responsive/service_waxing_1794585479607_400w.webp';
import waxingWebp800 from '../assets/images/responsive/service_waxing_1794585479607_800w.webp';
import waxingWebp1200 from '../assets/images/responsive/service_waxing_1794585479607_1200w.webp';

export const SALON_INFO = {
  name: 'Iqra Beauty Salon',
  address: 'Ghauri Town Phase 5-A, Phase 5 Ghauri Town, Islamabad, Pakistan',
  phoneDisplay: '+92 315 5162151',
  phoneHref: 'tel:+923155162151',
  whatsappNumber: '923155162151',
  whatsappUrl: 'https://wa.me/923155162151',
  hoursNote: '[PLACEHOLDER: opening time] to 9:00 PM (Closes at 9 PM)',
  rating: 4.8,
  reviewCount: 724,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Iqra+Beauty+Salon+Ghauri+Town+Phase+5-A+Islamabad+Pakistan',
} as const;

export type ServiceCategory = 'All' | 'Hair Care' | 'Skin Care' | 'Makeup';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  'Hair Care',
  'Skin Care',
  'Makeup',
];

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  category: Exclude<ServiceCategory, 'All'>;
  description: string;
  startingAt?: string;
  priceRange?: string;
  pricePlaceholder?: string;
  imageSources: ResponsiveImageSources;
  imageAlt: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'party-makeup',
    number: '01',
    name: 'Party Makeup',
    category: 'Makeup',
    description:
      'Includes skin prep and an undertone-matched base so makeup stays smooth without caking or flashing grey in event photos, paired with eye shading suited to your outfit.',
    startingAt: '[PLACEHOLDER: PKR starting rate]',
    imageSources: {
      src400: makeup400,
      src800: makeup800,
      src1200: makeup1200,
      webp400: makeupWebp400,
      webp800: makeupWebp800,
      webp1200: makeupWebp1200,
    },
    imageAlt:
      'Sample party makeup result showing soft eye shading and undertone-matched base (replace with real Iqra Beauty Salon photo)',
  },
  {
    id: 'hair-dye',
    number: '02',
    name: 'Hair Dye / Colour',
    category: 'Hair Care',
    description:
      'Applied in fine sections from roots through ends to cover greys evenly without overlapping dark bands, keeping previously coloured strands soft instead of dry.',
    priceRange: '[PLACEHOLDER: PKR range by hair length]',
    imageSources: {
      src400: hairDye400,
      src800: hairDye800,
      src1200: hairDye1200,
      webp400: hairDyeWebp400,
      webp800: hairDyeWebp800,
      webp1200: hairDyeWebp1200,
    },
    imageAlt:
      'Sample full-coverage hair colour application on glossy dark brunette hair (replace with real salon hair dye photo)',
  },
  {
    id: 'highlights',
    number: '03',
    name: 'Highlights',
    category: 'Hair Care',
    description:
      'Fine foil placement blended close to the root to prevent harsh lines and unwanted brassiness, so your colour grows out smoothly between salon visits.',
    priceRange: '[PLACEHOLDER: PKR range by hair length & volume]',
    imageSources: {
      src400: highlights400,
      src800: highlights800,
      src1200: highlights1200,
      webp400: highlightsWebp400,
      webp800: highlightsWebp800,
      webp1200: highlightsWebp1200,
    },
    imageAlt:
      'Sample dimensional hair highlights blended at the root (replace with real Iqra Beauty Salon highlights photo)',
  },
  {
    id: 'keratin-treatment',
    number: '04',
    name: 'Keratin Treatment',
    category: 'Hair Care',
    description:
      'Replenishes keratin protein and seals raised hair cuticles to reduce porosity, block humidity frizz, lower breakage from daily heat styling, and cut blow-dry time.',
    priceRange: '[PLACEHOLDER: PKR range by hair length]',
    imageSources: {
      src400: keratin400,
      src800: keratin800,
      src1200: keratin1200,
      webp400: keratinWebp400,
      webp800: keratinWebp800,
      webp1200: keratinWebp1200,
    },
    imageAlt:
      'Sample keratin smoothing finish with sealed cuticles and low frizz (replace with real keratin treatment result)',
  },
  {
    id: 'waxing',
    number: '05',
    name: 'Waxing',
    category: 'Skin Care',
    description:
      'Temperature-checked wax applied in private ladies-only rooms and pulled cleanly along hair growth to reduce redness, skin tugging, and post-wax ingrown bumps.',
    startingAt: '[PLACEHOLDER: PKR starting rate by area]',
    imageSources: {
      src400: waxing400,
      src800: waxing800,
      src1200: waxing1200,
      webp400: waxingWebp400,
      webp800: waxingWebp800,
      webp1200: waxingWebp1200,
    },
    imageAlt:
      'Sample warm waxing setup in a clean private treatment room (replace with real Iqra Beauty Salon room photo)',
  },
  {
    id: 'facials',
    number: '06',
    name: 'Facials',
    category: 'Skin Care',
    description:
      'Steaming, gentle pore extraction, facial massage, and a calming hydration mask to clear congestion and restore moisture without leaving sensitive skin tight.',
    priceRange: '[PLACEHOLDER: PKR range by facial type]',
    imageSources: {
      src400: facial400,
      src800: facial800,
      src1200: facial1200,
      webp400: facialWebp400,
      webp800: facialWebp800,
      webp1200: facialWebp1200,
    },
    imageAlt:
      'Sample facial treatment and hydration care setup (replace with real facial room photo from Phase 5-A)',
  },
  {
    id: 'haircuts-styling',
    number: '07',
    name: 'Haircuts & Styling',
    category: 'Hair Care',
    description:
      'Cut in clean sections around your hair density and natural fall after confirming length in the mirror, so layers keep their shape between blowouts.',
    startingAt: '[PLACEHOLDER: PKR starting rate]',
    imageSources: {
      src400: styling400,
      src800: styling800,
      src1200: styling1200,
      webp400: stylingWebp400,
      webp800: stylingWebp800,
      webp1200: stylingWebp1200,
    },
    imageAlt:
      'Sample layered haircut and blowout styling finish (replace with real Iqra Beauty Salon styling photo)',
  },
];

export interface ReviewItem {
  id: string;
  author: string;
  context: string;
  quote: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'madiha-khizar',
    author: 'Madiha Khizar',
    context: 'Google Review',
    quote: "Whenever I'm in Pakistan, Iqra Salon is always my first stop.",
  },
  {
    id: 'shazmah-nawaz',
    author: 'Shazmah Nawaz',
    context: 'Haircut, highlights, and facial',
    quote:
      'Came in for a haircut, highlights, and a facial. Everyone was sweet and professional, and they genuinely listened to what I wanted instead of rushing.',
  },
  {
    id: 'muqadas-shahid',
    author: 'Muqadas Shahid',
    context: 'Google Review',
    quote:
      'Very professional, polite, and friendly from start to finish, and careful with every part of their work.',
  },
];

export interface GalleryItem {
  id: string;
  sources: ResponsiveImageSources;
  alt: string;
  title: string;
  category: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-makeup',
    sources: {
      src400: makeup400,
      src800: makeup800,
      src1200: makeup1200,
      webp400: makeupWebp400,
      webp800: makeupWebp800,
      webp1200: makeupWebp1200,
    },
    alt: 'Sample party makeup lookbook image (replace with real client photo from Iqra Beauty Salon)',
    title: 'Party Makeup',
    category: '[PLACEHOLDER: Replace with real client makeup photo]',
  },
  {
    id: 'gal-highlights',
    sources: {
      src400: highlights400,
      src800: highlights800,
      src1200: highlights1200,
      webp400: highlightsWebp400,
      webp800: highlightsWebp800,
      webp1200: highlightsWebp1200,
    },
    alt: 'Sample hair highlights lookbook image (replace with real salon hair colour photo)',
    title: 'Hair Highlights',
    category: '[PLACEHOLDER: Replace with real highlights photo]',
  },
  {
    id: 'gal-keratin',
    sources: {
      src400: keratin400,
      src800: keratin800,
      src1200: keratin1200,
      webp400: keratinWebp400,
      webp800: keratinWebp800,
      webp1200: keratinWebp1200,
    },
    alt: 'Sample keratin treatment lookbook image (replace with real before and after hair photo)',
    title: 'Keratin Treatment',
    category: '[PLACEHOLDER: Replace with real keratin result]',
  },
  {
    id: 'gal-facial',
    sources: {
      src400: facial400,
      src800: facial800,
      src1200: facial1200,
      webp400: facialWebp400,
      webp800: facialWebp800,
      webp1200: facialWebp1200,
    },
    alt: 'Sample facial room visual (replace with real treatment room photo from Phase 5-A)',
    title: 'Facial Care',
    category: '[PLACEHOLDER: Replace with real treatment room photo]',
  },
  {
    id: 'gal-styling',
    sources: {
      src400: styling400,
      src800: styling800,
      src1200: styling1200,
      webp400: stylingWebp400,
      webp800: stylingWebp800,
      webp1200: stylingWebp1200,
    },
    alt: 'Sample occasion updo lookbook image (replace with real hair styling photo)',
    title: 'Haircuts & Styling',
    category: '[PLACEHOLDER: Replace with real styling photo]',
  },
  {
    id: 'gal-interior',
    sources: {
      src400: hero400,
      src800: hero800,
      src1200: hero1200,
      webp400: heroWebp400,
      webp800: heroWebp800,
      webp1200: heroWebp1200,
    },
    alt: 'Sample salon interior image (replace with real storefront and interior photo in Ghauri Town)',
    title: 'Salon Interior',
    category: '[PLACEHOLDER: Replace with real Phase 5-A salon photo]',
  },
];

// Generate 30-minute time slots from 10:00 AM to 8:30 PM
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let minutes = 10 * 60; minutes <= 20 * 60 + 30; minutes += 30) {
    const hour24 = Math.floor(minutes / 60);
    const min = minutes % 60;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const minStr = min === 0 ? '00' : String(min);
    slots.push(`${hour12}:${minStr} ${period}`);
  }
  return slots;
}

export const TIME_SLOTS = generateTimeSlots();
