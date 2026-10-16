import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, Phone } from 'lucide-react'
import { Img, IllustrativeTag, Reveal } from '../components/primitives.jsx'
import { usePageTitle } from '../lib/usePageTitle.js'
import { ProductCard } from './Products.jsx'
import NotFound from './NotFound.jsx'
import { categoryBySlug, productBySlug, productsIn } from '../data/catalog.js'
import { company, quoteHref } from '../data/site.js'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = productBySlug[slug]
  usePageTitle(product?.name)
  if (!product) return <NotFound />

  const category = categoryBySlug[product.category]
  const related = productsIn(product.category).filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <article className="pt-[104px]">
        <div className="container-x pt-10 pb-20 sm:pt-14 sm:pb-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-steel">
              <li>
                <Link to="/products" className="hover:text-ink">
                  Products
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                <Link to={`/products?category=${category.slug}`} className="hover:text-ink">
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                {product.brand && <p className="eyebrow">{product.brand}</p>}
                <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-ink sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-7 text-lg leading-relaxed text-steel">{product.description}</p>
              </Reveal>

              <Reveal delay={0.1} className="mt-12">
                <h2 className="text-[0.72rem] font-bold tracking-[0.2em] text-ink uppercase">Key features</h2>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {product.features.map((f) => {
                    const [head, ...rest] = f.split(': ')
                    return (
                      <li key={f} className="flex gap-4 py-4 text-[0.95rem] leading-relaxed text-steel">
                        <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>
                          {rest.length ? (
                            <>
                              <strong className="font-semibold text-ink">{head}:</strong> {rest.join(': ')}
                            </>
                          ) : (
                            f
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>

              {product.highlights.length > 0 && (
                <Reveal delay={0.1} className="mt-12">
                  <h2 className="text-[0.72rem] font-bold tracking-[0.2em] text-ink uppercase">Highlights</h2>
                  <ul className="mt-5 space-y-3">
                    {product.highlights.map((h) => (
                      <li key={h} className="border-l-2 border-accent pl-4 text-[0.95rem] leading-relaxed text-steel">
                        {h}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <p className="mt-10 text-xs text-steel">
                Information as published on the current Paliwal Machinery website. Detailed specifications and capacities
                are available on request.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="space-y-6 lg:sticky lg:top-32">
                <Reveal className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                  <Img name={category.image} sizes="(min-width: 1024px) 36vw, 100vw" eager className="h-full w-full object-cover" />
                  <IllustrativeTag className="absolute top-4 left-4" />
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-10 text-xs text-white/85">
                    Category image — product photography to be supplied.
                  </p>
                </Reveal>
                <Reveal delay={0.1} className="bg-ink p-7 text-white sm:p-8">
                  <h2 className="text-xl font-extrabold tracking-tight">Interested in this machine?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Send an inquiry with your capacity and plant details, or call the team directly.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link to={quoteHref(product.slug)} className="group btn-primary">
                      Request a Quote
                      <ArrowRight className="arrow-nudge size-4" aria-hidden="true" />
                    </Link>
                    <a href={`tel:${company.phones[0].tel}`} className="btn-outline-light">
                      <Phone className="size-4" aria-hidden="true" /> {company.phones[0].display}
                    </a>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-white py-16 sm:py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                More in {category.name}
              </h2>
              <Link to={`/products?category=${category.slug}`} className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink hover:text-accent">
                View all <ArrowRight className="arrow-nudge size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug} className="bg-paper">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
