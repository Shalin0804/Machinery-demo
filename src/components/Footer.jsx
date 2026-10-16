import { Link } from 'react-router-dom'
import { Logo } from './primitives.jsx'
import { categories } from '../data/catalog.js'
import { SHOW_DEMO_DISCLOSURE, company, navLinks } from '../data/site.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">{company.summary}</p>
        </div>

        <FooterColumn title="Explore" className="lg:col-span-2">
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Products" className="lg:col-span-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/products?category=${c.slug}`} className="hover:text-white">
                {c.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact" className="lg:col-span-3">
          <li>
            <address className="not-italic">{company.addressLines.join(', ')}</address>
          </li>
          {company.phones.map((p) => (
            <li key={p.tel}>
              <a href={`tel:${p.tel}`} className="hover:text-white">
                {p.display}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${company.email}`} className="[overflow-wrap:anywhere] hover:text-white">
              {company.email}
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {YEAR} {company.name}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-2">
            {SHOW_DEMO_DISCLOSURE && <span>Concept demo prepared by Codefloor IT — not the official website.</span>}
            <Link to="/credits" className="underline underline-offset-4 hover:text-white">
              Image credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, className, children }) {
  return (
    <div className={className}>
      <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-white uppercase">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed">{children}</ul>
    </div>
  )
}
