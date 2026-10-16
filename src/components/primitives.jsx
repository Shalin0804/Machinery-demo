import { m } from 'framer-motion'
import { EASE } from '../lib/motion.js'
import { images } from '../data/images.js'

/** Responsive WebP from the image registry. Lazy by default — pass eager for above-the-fold. */
export function Img({ name, sizes = '100vw', eager = false, className = '', alt }) {
  const img = images[name]
  return (
    <img
      src={`/images/${name}-800.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}-1600.webp ${img.w1600}w`}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={alt ?? img.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}

/** Fades content up once when it scrolls into view. MotionConfig handles reduced motion. */
export function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, intro, light = false, id, className = '' }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className={`eyebrow ${light ? 'text-accent-bright' : ''}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-5 text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.85rem] ${light ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-steel'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}

/** Small chip marking stock photography so it is never mistaken for company equipment. */
export function IllustrativeTag({ className = '' }) {
  return (
    <span
      className={`pointer-events-none inline-flex items-center bg-ink/70 px-2 py-1 text-[0.62rem] font-semibold tracking-wider text-white/90 uppercase backdrop-blur-sm ${className}`}
    >
      Illustrative image
    </span>
  )
}

export function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-3">
      <img src="/images/logo.png" alt="" width="40" height="40" className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.05rem] font-extrabold tracking-[0.14em] ${light ? 'text-white' : 'text-ink'}`}>
          PALIWAL
        </span>
        <span className={`mt-1 text-[0.62rem] font-semibold tracking-[0.34em] ${light ? 'text-white/60' : 'text-steel'}`}>
          MACHINERY
        </span>
      </span>
    </span>
  )
}
