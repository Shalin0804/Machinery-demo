import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import { Reveal } from '../components/primitives.jsx'
import { usePageTitle } from '../lib/usePageTitle.js'
import { categories, categoryBySlug, products, productsIn } from '../data/catalog.js'

export default function Products() {
  const [params] = useSearchParams()
  const selected = categoryBySlug[params.get('category')]
  const shown = selected ? [selected] : categories
  usePageTitle(selected ? selected.name : 'Products')

  return (
    <>
      <section className="border-b border-line pt-[104px]">
        <div className="container-x pt-14 pb-10 sm:pt-20">
          <Reveal>
            <p className="eyebrow">Catalogue</p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">Products</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
              {products.length} machines and systems for grain processing plants, grouped by category.
            </p>
            <p className="mt-6 flex max-w-2xl gap-2.5 text-xs leading-relaxed text-steel">
              <Info className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
              Names and descriptions are reproduced from the current Paliwal Machinery website. Product photography
              will be added once supplied by the company.
            </p>
          </Reveal>

          <nav aria-label="Product categories" className="-mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2">
              <FilterLink to="/products" active={!selected} label="All" count={products.length} />
              {categories.map((c) => (
                <FilterLink
                  key={c.slug}
                  to={`/products?category=${c.slug}`}
                  active={selected?.slug === c.slug}
                  label={c.name}
                  count={productsIn(c.slug).length}
                />
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {shown.map((c) => (
        <section key={c.slug} aria-labelledby={`cat-${c.slug}`} className="border-b border-line py-16 sm:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <h2 id={`cat-${c.slug}`} className="text-2xl font-extrabold tracking-tight text-ink">
                  {c.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">{c.summary}</p>
              </div>
            </div>
            <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
              {productsIn(c.slug).map((p, i) => (
                <Reveal as="li" key={p.slug} delay={(i % 3) * 0.05} y={20} className="bg-paper">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  )
}

export function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-white sm:p-7"
    >
      <p className="text-[0.68rem] font-bold tracking-[0.16em] text-steel uppercase">
        {product.brand ?? categoryBySlug[product.category].short}
      </p>
      <h3 className="mt-3 text-lg leading-snug font-bold text-ink group-hover:text-accent">{product.name}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-steel">{product.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink">
        View details
        <ArrowRight className="arrow-nudge size-4 text-accent" aria-hidden="true" />
      </span>
    </Link>
  )
}

function FilterLink({ to, active, label, count }) {
  return (
    <li>
      <Link
        to={to}
        aria-current={active ? 'page' : undefined}
        className={`inline-flex min-h-11 items-center gap-2 border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
          active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink'
        }`}
      >
        {label}
        <span className={`text-xs tabular-nums ${active ? 'text-white/60' : 'text-steel'}`}>{count}</span>
      </Link>
    </li>
  )
}
