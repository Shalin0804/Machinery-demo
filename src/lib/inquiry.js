// Quote inquiry: validation + submission.
// This is a frontend-only demo — submitInquiry() sends NOTHING anywhere.
// To go live, replace its body with a real request, e.g.
//   const res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
//   if (!res.ok) throw new Error('Inquiry failed')
//   return { demo: false }

export const emptyInquiry = { name: '', email: '', phone: '', interest: '', message: '' }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateInquiry(v) {
  const errors = {}
  if (v.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!EMAIL.test(v.email.trim())) errors.email = 'Enter a valid email address, like name@company.com.'
  const digits = v.phone.replace(/[\s()+-]/g, '')
  if (!/^\d{10,13}$/.test(digits)) errors.phone = 'Enter a phone number with 10–13 digits, including the country code if outside India.'
  if (v.message.trim().length < 10) errors.message = 'Tell us a little about your requirement (at least 10 characters).'
  return errors
}

export async function submitInquiry(data) {
  void data
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { demo: true }
}
