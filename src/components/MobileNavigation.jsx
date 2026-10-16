import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { X, ArrowRight, Phone, Mail } from 'lucide-react'
import { Logo } from './primitives.jsx'
import { EASE } from '../lib/motion.js'
import { company, navLinks, quoteHref } from '../data/site.js'

export default function MobileNavigation({ open, onClose, active }) {
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    const content = document.getElementById('page-content')
    document.body.style.overflow = 'hidden'
    content?.setAttribute('inert', '')
    panel.current?.querySelector('button')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panel.current) return
      // Keep Tab inside the drawer
      const items = panel.current.querySelectorAll('a[href], button')
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      content?.removeAttribute('inert')
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <m.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-paper"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="-mr-2 inline-flex size-11 items-center justify-center text-ink"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="px-5 py-6 sm:px-8">
              <ul>
                {navLinks.map((link, i) => (
                  <m.li
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <Link
                      to={link.to}
                      onClick={onClose}
                      aria-current={active === link.section ? 'page' : undefined}
                      className={`flex min-h-14 items-center justify-between text-2xl font-bold tracking-tight ${
                        active === link.section ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {link.label}
                      <ArrowRight className="size-5 text-steel-light" aria-hidden="true" />
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto space-y-5 px-5 pb-8 sm:px-8">
              <Link to={quoteHref()} onClick={onClose} className="btn-primary w-full">
                Request a Quote
              </Link>
              <div className="space-y-2 text-sm text-steel">
                <a href={`tel:${company.phones[0].tel}`} className="flex min-h-11 items-center gap-3 hover:text-ink">
                  <Phone className="size-4 text-accent" aria-hidden="true" /> {company.phones[0].display}
                </a>
                <a href={`mailto:${company.email}`} className="flex min-h-11 items-center gap-3 [overflow-wrap:anywhere] hover:text-ink">
                  <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" /> {company.email}
                </a>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}
