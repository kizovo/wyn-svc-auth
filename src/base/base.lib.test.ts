import { expect, test } from 'bun:test'
import * as lib from '@base/base.lib'

test('isStrIsNumber("a")', () => {
  expect(lib.isStrIsNumber('a')).toBe(false)
})

test('isStrIsNumber("32")', () => {
  expect(lib.isStrIsNumber('32')).toBe(true)
})

test('hash("Test1234!") & verify it', async () => {
  const hash = await lib.hash('Test1234!')
  const isMatch = await lib.verifyHash('Test1234!', hash)
  expect(isMatch).toBe(true)
})
