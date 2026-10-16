// Business details verified on 2026-10-16 from the live site (https://paliwalmachinery.com/)
// and the homepage data it loads. Anything not listed here was NOT verifiable — don't add
// statistics, certifications or client names until Paliwal Machinery confirms them.

// Set to false once the client approves the redesign — removes every demo notice.
export const SHOW_DEMO_DISCLOSURE = true

export const company = {
  name: 'Paliwal Machinery',
  summary:
    'Food grain processing machinery and industrial plant solutions — supplied from Bilaspur, Chhattisgarh.',
  addressLines: ['B-76, Triveni Bhavan, Vypar Vihar', 'Bilaspur, Chhattisgarh 495001'],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Paliwal Machinery, B-76 Triveni Bhavan, Vypar Vihar, Bilaspur, Chhattisgarh 495001'),
  email: 'paliwalmachinery@gmail.com',
  phones: [
    { display: '+91 94241 43699', tel: '+919424143699' },
    { display: '+91 97520 42699', tel: '+919752042699' },
  ],
  // Same number as the first phone above. Confirm it is on WhatsApp before go-live.
  whatsapp: '919424143699',
  liveSite: 'https://paliwalmachinery.com/',
}

export const navLinks = [
  { label: 'Home', to: '/', section: 'top' },
  { label: 'About', to: '/#about', section: 'about' },
  { label: 'Products', to: '/products', section: 'products' },
  { label: 'Gallery', to: '/#gallery', section: 'gallery' },
  { label: 'Contact', to: '/#contact', section: 'contact' },
]

export const quoteHref = (productSlug) =>
  productSlug ? `/?product=${encodeURIComponent(productSlug)}#contact` : '/#contact'
