import { expect, test } from 'bun:test'
import * as lib from '@base/base.lib'

test('isStrIsNumber("a"), expect: false', () => {
  expect(lib.isStrIsNumber('a')).toBe(false)
})

test('isStrIsNumber("32"), expect: true', () => {
  expect(lib.isStrIsNumber('32')).toBe(true)
})

test('hash("Test1234!") & verify it, expect: the hash & verify is match', async () => {
  const hash = await lib.hash('Test1234!')
  const isMatch = await lib.verifyHash('Test1234!', hash)
  expect(isMatch).toBe(true)
})

// Test Regex
const PHONE_E164 = /^\+[1-9]\d{7,13}$/
test('regex: test "abcde" with e164 format +(8-14 digit number), expect: false', async () => {
  const isMatch = PHONE_E164.test('abcde')
  expect(isMatch).toBe(false)
})

test('regex: test "123456" with e164 format +(8-14 digit number), expect: false', async () => {
  const isMatch = PHONE_E164.test('123456')
  expect(isMatch).toBe(false)
})

test('regex: test "+72345" with e164 format +(8-14 digit number), expect: false', async () => {
  const isMatch = PHONE_E164.test('+72345')
  expect(isMatch).toBe(false)
})

test('regex: test "+12345678" with e164 format +(8-14 digit number), expect: true', async () => {
  const isMatch = PHONE_E164.test('+12345678')
  expect(isMatch).toBe(true)
})

const PASSWORD_MEDIUM = /^(?=.*[A-Z]).{8,}$/
test('regex: test "abcde" with password medium, expect: false', async () => {
  const isMatch = PASSWORD_MEDIUM.test('abcde')
  expect(isMatch).toBe(false)
})
test('regex: test "abcde123" with password medium, expect: false', async () => {
  const isMatch = PASSWORD_MEDIUM.test('abcde123')
  expect(isMatch).toBe(false)
})
test('regex: test "abcde123!" with password medium, expect: false', async () => {
  const isMatch = PASSWORD_MEDIUM.test('abcde123!')
  expect(isMatch).toBe(false)
})
test('regex: test "Abcde123!" with password medium, expect: true', async () => {
  const isMatch = PASSWORD_MEDIUM.test('Abcde123!')
  expect(isMatch).toBe(true)
})
