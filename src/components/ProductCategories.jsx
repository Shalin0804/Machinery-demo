import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Img, IllustrativeTag, SectionHeading } from './primitives.jsx'
import { stagger, staggerItem } from '../lib/motion.js'
import { categories, productsIn, products } from '../data/catalog.js'

export default function ProductCategories() {
  return (
    <section id="products" aria-labelledby="products-title" className="scroll-mt-[104px] py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="products-title"
            eyebrow="Product range"
            title="Equipment for every stage of the grain line"
            intro={`${products.length} machines and systems across four categories, from paddy cleaning to steam generation.`}
          />
          <Link to="/products" className="group btn-outline shrink-0 self-start md:self-auto">
            View full catalogue
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        <m.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {categories.map((c, i) => (
            <m.li key={c.slug} variants={staggerItem}>
              <Link
                to={`/products?category=${c.slug}`}
                className="group flex h-full flex-col border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-ink/25 hover:shadow-[0_24px_60px_-30px_rgb(23_25_28/0.45)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
                  <Img
                    name={c.image}
                    sizes="(min-width: 1320px) 630px, (min-width: 768px) 48vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-80" />
                  <IllustrativeTag className="absolute top-4 left-4" />
                  <span className="absolute right-4 bottom-4 bg-white/95 px-3 py-1.5 text-xs font-bold text-ink">
                    {productsIn(c.slug).length} products
                  </span>
                </div>
                <div className="flex flex-1 items-start gap-6 p-6 sm:p-8">
                  <div className="flex-1">
                    <span className="text-xs font-bold text-accent tabular-nums">0{i + 1}</span>
                    <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{c.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-steel sm:text-[0.95rem]">{c.summary}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex size-11 shrink-0 items-center justify-center border border-line text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                  >
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
