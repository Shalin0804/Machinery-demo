import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { IllustrativeTag } from './primitives.jsx'
import { EASE } from '../lib/motion.js'
import { heroImage } from '../data/images.js'
import { brands, categories } from '../data/catalog.js'
import { quoteHref } from '../data/site.js'

const lines = ['Built for Industry.', 'Ready for What’s Next.']

export default function HeroSection() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-[104px]" aria-labelledby="hero-title">
      {/* faint engineering grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] [background-size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="container-x relative grid items-center gap-12 pt-10 pb-16 lg:min-h-[calc(100svh-104px)] lg:grid-cols-12 lg:gap-10 lg:py-14">
        <div className="lg:col-span-6 xl:col-span-6">
          <m.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Food grain processing · Industrial solutions
          </m.p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.55rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink min-[380px]:text-5xl sm:text-6xl xl:text-[4.6rem]"
          >
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <m.span
                  className={`block ${i === 1 ? 'text-steel' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </h1>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            <p className="mt-7 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
              Rice milling machinery, parboiling and drying plants, colour sorters and industrial boilers —
              with clear product information and a straightforward way to reach the team in Bilaspur.
            </p>

            <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
              <Link to="/products" className="group btn-primary">
                Explore Products
                <ArrowRight className="arrow-nudge size-4" aria-hidden="true" />
              </Link>
              <Link to={quoteHref()} className="btn-outline">
                Request a Quote
              </Link>
            </div>

            <p className="mt-9 flex items-center gap-2 text-sm text-steel">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              Bilaspur, Chhattisgarh
            </p>
          </m.div>
        </div>

        <div className="relative lg:col-span-6 lg:pl-6 xl:pl-10">
          <m.div
            className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/11] lg:aspect-[4/5] lg:max-h-[calc(100svh-180px)] lg:w-full"
            initial={reduce ? false : { clipPath: 'inset(6% 6% 6% 6%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.05 }}
          >
            <m.img
              src="/images/hero-1100.webp"
              srcSet="/images/hero-640.webp 640w, /images/hero-1100.webp 1100w"
              sizes="(min-width: 1024px) 46vw, 100vw"
              width="1100"
              height="1375"
              alt={heroImage.alt}
              fetchPriority="high"
              decoding="async"
              style={{ y: imageY }}
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: 1.06 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            <IllustrativeTag className="absolute top-4 left-4" />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="relative -mt-14 ml-auto w-[88%] max-w-sm bg-ink p-5 text-white shadow-2xl sm:p-6 lg:absolute lg:right-0 lg:bottom-10 lg:-mr-4 lg:mt-0 xl:-mr-8"
          >
            <p className="text-[0.68rem] font-bold tracking-[0.2em] text-accent-bright uppercase">
              On the current catalogue
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {brands.join(' · ')}
            </p>
          </m.div>
        </div>
      </div>

      {/* Category index strip */}
      <div className="relative border-y border-line bg-paper-deep/60">
        <ol className="container-x grid grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <li key={c.slug} className="border-line max-lg:odd:border-r lg:not-last:border-r max-lg:[&:nth-child(-n+2)]:border-b">
              <Link
                to={`/products?category=${c.slug}`}
                className="group flex h-full items-baseline gap-3 py-5 text-sm font-semibold text-ink transition-colors hover:text-accent sm:px-4 lg:py-6"
              >
                <span className="text-xs font-bold text-steel-light tabular-nums">0{i + 1}</span>
                <span className="flex-1">{c.short}</span>
                <ArrowRight className="arrow-nudge hidden size-4 text-steel-light sm:block" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
