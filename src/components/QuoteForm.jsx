import { useRef, useState } from 'react'
import { ArrowRight, CircleCheck, LoaderCircle, Lock } from 'lucide-react'
import { emptyInquiry, submitInquiry, validateInquiry } from '../lib/inquiry.js'
import { categories, productsIn } from '../data/catalog.js'
import { company } from '../data/site.js'

const fieldClass =
  'block w-full border border-line bg-paper/50 px-4 py-3.5 text-base text-ink transition-colors placeholder:text-steel-light hover:border-steel-light focus:border-ink focus:bg-white aria-[invalid=true]:border-red-700'

export default function QuoteForm({ preset = '' }) {
  const [values, setValues] = useState({ ...emptyInquiry, interest: preset })
  const [lastPreset, setLastPreset] = useState(preset)
  // A new "Request a Quote" click preselects its product without wiping what was typed
  if (preset !== lastPreset) {
    setLastPreset(preset)
    if (preset) setValues((v) => ({ ...v, interest: preset }))
  }
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done
  const form = useRef(null)
  const doneHeading = useRef(null)

  const field = (name) => ({
    id: `quote-${name}`,
    name,
    value: values[name],
    onChange: (e) => {
      const next = { ...values, [name]: e.target.value }
      setValues(next)
      if (submitted) setErrors(validateInquiry(next))
    },
    onBlur: (e) => {
      if (e.target.value) setErrors((prev) => ({ ...prev, [name]: validateInquiry(values)[name] }))
    },
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `quote-${name}-error` : undefined,
    className: fieldClass,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateInquiry(values)
    setErrors(found)
    setSubmitted(true)
    const first = Object.keys(found)[0]
    if (first) {
      form.current.elements[first].focus()
      return
    }
    setStatus('sending')
    await submitInquiry(values)
    setStatus('done')
    requestAnimationFrame(() => doneHeading.current?.focus())
  }

  const reset = () => {
    setValues(emptyInquiry)
    setErrors({})
    setSubmitted(false)
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <div role="status" className="flex h-full flex-col justify-center border border-line bg-white p-8 sm:p-12">
        <CircleCheck className="size-10 text-accent" aria-hidden="true" />
        <p className="mt-6 inline-flex w-fit bg-accent-soft px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.16em] text-accent-dark uppercase">
          Demo submission
        </p>
        <h3 ref={doneHeading} tabIndex={-1} className="mt-4 text-2xl font-extrabold tracking-tight text-ink focus:outline-none">
          Form completed — nothing was sent
        </h3>
        <p className="mt-4 leading-relaxed text-steel">
          This is a website concept demo, so your inquiry has not been delivered to Paliwal Machinery and your
          details were not stored. On the live site, this form would send the inquiry straight to the team.
        </p>
        <p className="mt-4 leading-relaxed text-steel">
          To reach the company today, call{' '}
          <a href={`tel:${company.phones[0].tel}`} className="font-semibold text-ink underline underline-offset-4">
            {company.phones[0].display}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${company.email}`} className="font-semibold [overflow-wrap:anywhere] text-ink underline underline-offset-4">
            {company.email}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className="btn-outline mt-8 self-start">
          Start a new inquiry
        </button>
      </div>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="border border-line bg-white p-6 sm:p-10" aria-labelledby="quote-title">
      <h3 id="quote-title" className="text-2xl font-extrabold tracking-tight text-ink">
        Request a quote
      </h3>
      <p className="mt-2 text-sm text-steel">All fields are required unless marked optional.</p>

      <p aria-live="polite" className="sr-only">
        {submitted && errorCount ? `${errorCount} field${errorCount > 1 ? 's need' : ' needs'} attention.` : ''}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name}>
          <input type="text" autoComplete="name" {...field('name')} />
        </Field>
        <Field label="Business email" name="email" error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" {...field('email')} />
        </Field>
        <Field label="Phone" name="phone" error={errors.phone}>
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" {...field('phone')} />
        </Field>
        <Field label="Product or machinery" name="interest" optional>
          <select {...field('interest')} className={`${fieldClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235a636c' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}>
            <option value="">General inquiry / not sure yet</option>
            {categories.map((c) => (
              <optgroup key={c.slug} label={c.name}>
                {productsIn(c.slug).map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="Message" name="message" error={errors.message} className="sm:col-span-2">
          <textarea rows={5} placeholder="Capacity, plant type, timeline or any other details" {...field('message')} />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === 'sending'} className="group btn-primary disabled:cursor-wait disabled:opacity-80">
          {status === 'sending' ? (
            <>
              <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <ArrowRight className="arrow-nudge size-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="flex max-w-sm gap-2.5 text-xs leading-relaxed text-steel">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-ink">Demo form — nothing is sent or stored.</strong> On the live site,
            your details would be used only to respond to this inquiry (privacy policy to be confirmed by Paliwal
            Machinery).
          </span>
        </p>
      </div>
    </form>
  )
}

function Field({ label, name, error, optional, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={`quote-${name}`} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-steel">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`quote-${name}-error`} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
