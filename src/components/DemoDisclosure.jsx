import { ArrowUpRight } from 'lucide-react'
import { SHOW_DEMO_DISCLOSURE, company } from '../data/site.js'

export default function DemoDisclosure() {
  if (!SHOW_DEMO_DISCLOSURE) return null
  return (
    <div className="bg-ink text-[0.7rem] text-white/75 sm:text-xs" role="note" aria-label="Demo disclosure">
      <div className="container-x flex h-8 items-center justify-center gap-3">
        <p className="truncate">
          <span className="font-semibold text-white">Website concept demo</span>
          <span className="hidden sm:inline"> — proposed redesign by Codefloor IT,</span> not the official company website.
        </p>
        <a
          href={company.liveSite}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center gap-1 font-semibold text-accent-bright hover:text-white md:inline-flex"
        >
          Official site <ArrowUpRight className="size-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
