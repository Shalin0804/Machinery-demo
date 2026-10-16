import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ArrowRight } from 'lucide-react'
import DemoDisclosure from './DemoDisclosure.jsx'
import MobileNavigation from './MobileNavigation.jsx'
import { Logo } from './primitives.jsx'
import { navLinks, quoteHref } from '../data/site.js'

const SPY_SECTIONS = ['about', 'products', 'gallery', 'contact']

/** Which nav item is current: route-based off the home page, scroll-spy on it. */
function useActiveSection() {
  const { pathname } = useLocation()
  const [section, setSection] = useState('top')

  useEffect(() => {
    if (pathname !== '/') return
    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting))
        // Between spied sections (featured block, footer) keep the last one; near the top it's Home
        setSection((prev) => SPY_SECTIONS.findLast((id) => visible.get(id)) ?? (window.scrollY < 400 ? 'top' : prev))
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    SPY_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  if (pathname.startsWith('/products')) return 'products'
  return pathname === '/' ? section : null
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButton.current?.focus()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <DemoDisclosure />
      <div
        className={`border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || menuOpen
            ? 'border-line bg-paper/90 shadow-[0_8px_30px_-18px_rgb(23_25_28/0.35)] backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link to="/" aria-label="Paliwal Machinery — home" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.section
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-ink' : 'text-steel hover:text-ink'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link to={quoteHref()} className="group btn-primary hidden min-h-11 sm:inline-flex">
              Request a Quote
              <ArrowRight className="arrow-nudge size-4" aria-hidden="true" />
            </Link>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="-mr-2 inline-flex size-11 items-center justify-center text-ink lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
      <MobileNavigation open={menuOpen} onClose={closeMenu} active={active} />
    </header>
  )
}
