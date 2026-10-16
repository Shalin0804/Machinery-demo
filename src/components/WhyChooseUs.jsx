import { Layers, Workflow, Wrench, PhoneCall } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives.jsx'
import { brands } from '../data/catalog.js'

// Each point is backed by the current website's catalogue or service description.
const reasons = [
  {
    icon: Layers,
    title: 'Established equipment brands',
    text: `Machinery from ${brands.slice(0, -1).join(', ')} and ${brands.at(-1)}, presented in one catalogue.`,
  },
  {
    icon: Workflow,
    title: 'The complete process line',
    text: 'From pre-cleaning and husking to whitening, grading, colour sorting, parboiling and steam generation.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & upgrades',
    text: 'Support continues after supply, with product maintenance and upgrades as part of the service.',
  },
  {
    icon: PhoneCall,
    title: 'Direct communication',
    text: 'Speak to the team in Bilaspur by phone or email, or send an inquiry about a specific machine.',
  },
]

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-white py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <SectionHeading
              id="why-title"
              eyebrow="Why Paliwal Machinery"
              title="One partner from enquiry to operation"
              intro="A single point of contact for the equipment, information and support a grain processing plant depends on."
            />
          </div>
        </div>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="group bg-white p-8 sm:p-10">
              <span className="inline-flex size-12 items-center justify-center bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-ink">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-steel">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
