import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Img, IllustrativeTag, Reveal } from './primitives.jsx'

// Scope as described on the current website.
const scope = [
  { title: 'Project design', text: 'Planning grain processing lines and industrial plant set-ups.' },
  { title: 'Machinery supply', text: 'Equipment for rice mills, flour mills, oil mills and grain processing plants.' },
  { title: 'Maintenance & upgrades', text: 'Support for installed machinery beyond the initial supply.' },
]

export default function IntroductionSection() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const insetY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-[104px] bg-white py-24 sm:py-32"
    >
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-5">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-paper-deep sm:max-w-md lg:max-w-none">
            <Img
              name="mill-interior-2"
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
              className="h-full w-full object-cover"
            />
            <IllustrativeTag className="absolute top-4 left-4" />
          </Reveal>
          <m.div
            style={{ y: insetY }}
            className="absolute right-0 -bottom-10 w-[46%] border-[6px] border-white shadow-xl sm:right-[8%] lg:-right-10"
          >
            <Img name="rice-in-hand" sizes="(min-width: 1024px) 18vw, 46vw" className="aspect-square w-full object-cover" />
          </m.div>
        </div>

        <div className="lg:col-span-7 lg:pt-8 lg:pl-16">
          <Reveal>
            <p className="eyebrow">About Paliwal Machinery</p>
            <h2
              id="about-title"
              className="mt-5 text-3xl leading-[1.1] font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.85rem]"
            >
              Practical machinery solutions for industrial needs
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-steel sm:text-lg">
            <p>
              Paliwal Machinery, Bilaspur, works in the field of grain processing machinery and wider industrial
              needs — a quality-driven organisation focused on customer satisfaction through its products and
              services.
            </p>
            <p>
              We provide turn-key solutions for rice mills, flour mills, oil mills and grain processing plants, from
              project design and machinery supply through to maintenance and upgrades.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {scope.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.1 + i * 0.08} className="bg-white p-6">
                <span className="text-xs font-bold text-accent tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
