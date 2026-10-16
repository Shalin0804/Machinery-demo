import { products } from './products.generated.js'

export { products }

// Category names follow the live site. Summaries are written from the products listed in
// each category — no capabilities beyond those listings.
export const categories = [
  {
    slug: 'grain-processing',
    name: 'Modern Grain Processing Plant',
    short: 'Rice milling line',
    summary:
      'Pre-cleaners, destoners, huskers, whiteners, polishers, graders and elevators for a complete rice milling line.',
    image: 'grain-silos',
  },
  {
    slug: 'parboiling-drying',
    name: 'Parboiling & Drying Equipment',
    short: 'Parboiling systems',
    summary:
      'Induss parboiling and drying plants, continuous cookers, soaking-tank automation, husk-fired furnaces and inline meters.',
    image: 'rice-plant-aerial',
  },
  {
    slug: 'color-sorters',
    name: 'Color Sorters',
    short: 'Optical sorting',
    summary:
      'Prime and Champ Series colour sorters, offered in 1-chute to 12-chute configurations.',
    image: 'rice-grains',
  },
  {
    slug: 'boilers',
    name: 'Boilers',
    short: 'Steam & heat',
    summary:
      'Solid-fuel, husk-fired, dual-fuel, oil/gas and waste-heat recovery boilers, plus thermic fluid heaters.',
    image: 'fire-tube-boiler',
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p]))
export const productsIn = (slug) => products.filter((p) => p.category === slug)

export const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))]

export const FEATURED_PRODUCT = 'parboiling-and-drying-plants'
