import { usePageTitle } from '../lib/usePageTitle.js'
import { heroImage, images } from '../data/images.js'

const all = [{ name: 'hero', ...heroImage }, ...Object.entries(images).map(([name, img]) => ({ name, ...img }))]

export default function Credits() {
  usePageTitle('Image credits')
  return (
    <section className="pt-[104px]">
      <div className="container-x py-14 sm:py-20">
        <p className="eyebrow">Credits</p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Image credits</h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-steel">
          This concept uses illustrative photography from Wikimedia Commons. None of these images show Paliwal
          Machinery’s equipment, facilities or customers. Images were resized and cropped for the web.
        </p>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {all.map(({ name, alt, credit }) => (
            <li key={name} className="grid gap-1 py-5 text-sm sm:grid-cols-12 sm:gap-6">
              <span className="font-semibold text-ink sm:col-span-6">{alt}</span>
              <span className="text-steel sm:col-span-3">{credit.author}</span>
              <span className="flex gap-3 sm:col-span-3 sm:justify-end">
                <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
                  {credit.license}
                </a>
                <a href={credit.source} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
                  Source
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
