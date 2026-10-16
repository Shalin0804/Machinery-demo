import { Link } from 'react-router-dom'
import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Img, IllustrativeTag, Reveal } from './primitives.jsx'
import { EASE } from '../lib/motion.js'
import { FEATURED_PRODUCT, categoryBySlug, productBySlug } from '../data/catalog.js'
import { quoteHref } from '../data/site.js'

// Every value below is taken from the product's listing on the current website.
const specs = [
  ['Manufacturer', 'Induss'],
  ['Controls', 'PLC-based control panels'],
  ['Drying', 'Multi-stage, with precise control'],
  ['Capacities', 'Small-scale to large industrial'],
]

export default function FeaturedProduct() {
  const product = productBySlug[FEATURED_PRODUCT]
  const reduce = useReducedMotion()

  return (
    <section
      aria-labelledby="featured-title"
      className="relative overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(244_122_47/0.14),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgb(255_255_255/0.05),transparent_50%)]"
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* The observed wrapper stays unclipped: IntersectionObserver ignores fully clipped targets */}
        <m.div
          className="lg:col-span-6"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <m.div
            className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/6]"
            variants={{
              hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
              show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE } },
            }}
          >
            <Img name="boiler-hall-2" sizes="(min-width: 1024px) 46vw, 100vw" className="h-full w-full object-cover" />
            <IllustrativeTag className="absolute top-4 left-4" />
          </m.div>
        </m.div>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-accent-bright">Featured · {categoryBySlug[product.category].name}</p>
            <h2 id="featured-title" className="mt-5 text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {product.name}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">{product.description}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid border-t border-white/15 sm:grid-cols-2">
              {specs.map(([label, value]) => (
                <div key={label} className="border-b border-white/15 py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                  <dt className="text-[0.68rem] font-bold tracking-[0.18em] text-white/50 uppercase">{label}</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-white/45">
              As listed on the current website. Detailed capacity figures to be confirmed with the team.
            </p>

            <ul className="mt-8 space-y-3">
              {product.features.slice(0, 3).map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-white/75">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-bright" aria-hidden="true" />
                  <span>{f.split(':')[0]}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 min-[420px]:flex-row">
              <Link to={`/products/${product.slug}`} className="group btn bg-white text-ink hover:bg-accent-soft">
                View Details
                <ArrowRight className="arrow-nudge size-4" aria-hidden="true" />
              </Link>
              <Link to={quoteHref(product.slug)} className="btn-outline-light">
                Request a Quote
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
