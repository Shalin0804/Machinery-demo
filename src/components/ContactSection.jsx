import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import QuoteForm from './QuoteForm.jsx'
import { Reveal, SectionHeading } from './primitives.jsx'
import { productBySlug } from '../data/catalog.js'
import { company } from '../data/site.js'

export default function ContactSection() {
  const [params] = useSearchParams()
  const preset = productBySlug[params.get('product')]?.slug ?? ''
  const whatsappText = encodeURIComponent(
    preset ? `Hello, I would like a quote for: ${productBySlug[preset].name}` : 'Hello, I have an inquiry about your machinery.',
  )

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-[104px] bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Tell us what your plant needs"
          intro="Share the machine or line you are considering and the team can follow up with details and pricing."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative overflow-hidden bg-ink p-8 text-white sm:p-10 lg:col-span-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(244_122_47/0.16),transparent_60%)]"
            />
            <div className="relative space-y-9">
              <ContactRow icon={MapPin} label="Office">
                <address className="not-italic">
                  {company.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-bright hover:text-white"
                >
                  Open in Google Maps <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </ContactRow>

              <ContactRow icon={Phone} label="Phone">
                {company.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block min-h-9 py-1 hover:text-accent-bright">
                    {p.display}
                  </a>
                ))}
              </ContactRow>

              <ContactRow icon={Mail} label="Email">
                <a href={`mailto:${company.email}`} className="[overflow-wrap:anywhere] hover:text-accent-bright">
                  {company.email}
                </a>
              </ContactRow>

              <a
                href={`https://wa.me/${company.whatsapp}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-outline-light w-full sm:w-auto"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Message on WhatsApp
                <span className="sr-only">(opens WhatsApp with a draft message; nothing is sent automatically)</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <QuoteForm preset={preset} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-5">
      <span className="inline-flex size-11 shrink-0 items-center justify-center border border-white/15 text-accent-bright">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 text-[0.95rem] leading-relaxed text-white/85">
        <p className="mb-1 text-[0.68rem] font-bold tracking-[0.18em] text-white/50 uppercase">{label}</p>
        {children}
      </div>
    </div>
  )
}
