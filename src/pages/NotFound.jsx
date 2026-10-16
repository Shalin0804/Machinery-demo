import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle.js'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="flex min-h-[80svh] items-center pt-[104px]">
      <div className="container-x py-20">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">This page could not be found</h1>
        <p className="mt-5 max-w-lg text-steel">The link may be out of date. Try the product catalogue or head back home.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/products" className="btn-primary">
            Browse products
          </Link>
          <Link to="/" className="btn-outline">
            Go home
          </Link>
        </div>
      </div>
    </section>
  )
}
