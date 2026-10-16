// Run: npm run check
import assert from 'node:assert/strict'
import { emptyInquiry, validateInquiry } from './inquiry.js'

const ok = {
  name: 'Ravi Sharma',
  email: 'ravi@millco.in',
  phone: '+91 94241 43699',
  interest: '',
  message: 'Need a quote for a 4 TPH rice mill line.',
}

assert.deepEqual(validateInquiry(ok), {})
assert.deepEqual(Object.keys(validateInquiry(emptyInquiry)).sort(), ['email', 'message', 'name', 'phone'])
assert.ok(validateInquiry({ ...ok, email: 'ravi@millco' }).email)
assert.ok(validateInquiry({ ...ok, phone: '12345' }).phone)
assert.ok(!validateInquiry({ ...ok, phone: '9424143699' }).phone)
assert.ok(validateInquiry({ ...ok, name: ' a ' }).name)
console.log('inquiry validation: ok')
