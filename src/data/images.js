// Illustrative photography for the concept demo. NONE of these show Paliwal Machinery's
// equipment, sites or customers — the live site's own product photos currently fail to load
// (its image storage returns HTTP 402). Swap in the company's photos before go-live.
//
// Each key maps to /public/images/<key>-800.webp and <key>-<w1600>.webp.
// w1600 is the real width of the large file (smaller when the original was smaller).

const commons = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`
const BY_SA_4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' }
const BY_SA_3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' }
const CC0 = { license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' }

export const images = {
  'boiler-hall-2': {
    w: 800, h: 800, w1600: 1600,
    alt: 'Steam pipework, gantries and pressure vessels inside an industrial boiler hall',
    credit: { author: 'Lauri Veerde', ...BY_SA_4, source: commons('Gas boiler hall in Iru Thermal Power Plant (right).jpg') },
  },
  'fire-tube-boiler': {
    w: 800, h: 600, w1600: 1600,
    alt: 'Front of a large cylindrical fire-tube boiler with its tube plate exposed',
    credit: { author: 'Andy Dingley', ...BY_SA_3, source: commons('Scotch marine boiler.jpg') },
  },
  'grain-silos': {
    w: 800, h: 457, w1600: 1600,
    alt: 'Row of white steel grain silos and an elevator tower under a clear sky',
    credit: { author: 'Leaflet', ...BY_SA_3, source: commons('Olton Texas grain silos 2011.jpg') },
  },
  'mill-interior': {
    w: 800, h: 600, w1600: 1600,
    alt: 'Black-and-white view of milling machinery, belts and shafting inside a grain mill',
    credit: { author: 'State Government Photographer, South Australia', ...CC0, source: commons('Interior of Flour Mill, Port Adelaide(GN02248).jpg') },
  },
  'mill-interior-2': {
    w: 800, h: 1067, w1600: 1600,
    alt: 'Black-and-white view of stairs, chutes and machinery on a grain mill floor',
    credit: { author: 'State Government Photographer, South Australia', ...CC0, source: commons('Interior of Flour Mill, Port Adelaide(GN02251).jpg') },
  },
  'paddy-field': {
    w: 800, h: 531, w1600: 1600,
    alt: 'Green paddy fields stretching to the hills in India',
    credit: { author: 'Sastognuti', ...BY_SA_4, source: commons('Paddy-field India.jpg') },
  },
  'rice-grains': {
    w: 800, h: 602, w1600: 1600,
    alt: 'Close-up of polished white rice grains',
    credit: { author: 'Zahoor Ahmad Reshi', ...CC0, source: commons('Mushqbudji rice grains close-up.jpg') },
  },
  'rice-in-hand': {
    w: 800, h: 770, w1600: 1600,
    alt: 'An open palm holding a handful of milled rice',
    credit: { author: 'Anay.m.tripathi', ...BY_SA_4, source: commons('Kalanamak rice grains.jpg') },
  },
  'rice-plant-aerial': {
    w: 800, h: 533, w1600: 1600,
    alt: 'Aerial view of a rice processing plant with grain drying across the yard',
    credit: { author: 'Dixon099', ...BY_SA_4, source: commons('Rice Processing Plant.jpg') },
  },
  'rice-silos': {
    w: 800, h: 1109, w1600: 1154,
    alt: 'Black-and-white view of tall storage silos at a rice processing plant',
    credit: { author: 'Jim Osley', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/', source: commons('Rainham , silos, Tilda Rice processing plant - geograph.org.uk - 6082627.jpg') },
  },
}

// The hero uses its own 4:5 crop of this photo (hero-640 / hero-1100).
export const heroImage = {
  alt: 'Steel pipework and walkways inside an industrial boiler hall, lit in warm tones',
  credit: { author: 'Lauri Veerde', ...BY_SA_4, source: commons('Gas boiler hall in Iru Thermal Power Plant (left).jpg') },
}
