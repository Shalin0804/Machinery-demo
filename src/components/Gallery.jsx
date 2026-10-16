import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { Img, Reveal, SectionHeading } from './primitives.jsx'
import { images } from '../data/images.js'

// Illustrative stock photography — replace with Paliwal Machinery's own installation photos.
const gallery = [
  'boiler-hall-2',
  'rice-silos',
  'mill-interior',
  'rice-plant-aerial',
  'paddy-field',
  'rice-grains',
  'fire-tube-boiler',
  'grain-silos',
]

export default function Gallery() {
  const dialog = useRef(null)
  const [index, setIndex] = useState(0)
  const current = images[gallery[index]]

  const open = (i) => {
    setIndex(i)
    dialog.current.showModal() // native modal: focus trap, Escape and focus restore built in
  }
  const step = (d) => setIndex((i) => (i + d + gallery.length) % gallery.length)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-[104px] py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="Inside grain processing"
          intro="Illustrative photography for this concept. In the final site, this space would show Paliwal Machinery’s own installations and equipment."
        />

        <ul className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
          {gallery.map((name, i) => (
            <Reveal as="li" key={name} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid lg:mb-6">
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full overflow-hidden bg-paper-deep text-left"
              >
                <Img
                  name={name}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 100vw"
                  className="h-auto w-full transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/75 via-ink/0 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex w-full items-end justify-between gap-4 text-sm font-semibold text-white">
                    <span className="line-clamp-2">{images[name].alt}</span>
                    <Expand className="size-4 shrink-0" aria-hidden="true" />
                  </span>
                </span>
                <span className="sr-only">Open larger view</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-label="Image viewer"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 text-white backdrop:backdrop-blur-sm"
      >
        <div className="flex h-[100dvh] w-[100vw] flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-sm text-white/70 tabular-nums" aria-live="polite">
              {index + 1} / {gallery.length}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current.close()}
              aria-label="Close image viewer"
              className="inline-flex size-11 items-center justify-center text-white hover:text-accent-bright"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && dialog.current.close()}
          >
            <img
              key={gallery[index]}
              src={`/images/${gallery[index]}-1600.webp`}
              alt={current.alt}
              width={current.w}
              height={current.h}
              className="max-h-full w-auto max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white hover:text-ink sm:left-4"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white hover:text-ink sm:right-4"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div className="px-4 py-4 text-center text-xs text-white/60 sm:px-6">
            <p className="text-sm text-white/85">{current.alt}</p>
            <p className="mt-1">
              Illustrative image — not Paliwal Machinery equipment. Photo: {current.credit.author},{' '}
              <a href={current.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                {current.credit.license}
              </a>{' '}
              ·{' '}
              <a href={current.credit.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                Source
              </a>
            </p>
          </div>
        </div>
      </dialog>
    </section>
  )
}
