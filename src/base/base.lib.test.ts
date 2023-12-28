import { expect, test } from 'bun:test'
import * as lib from '@base/base.lib'

test('isStrIsNumber("a")', () => {
  expect(lib.isStrIsNumber('a')).toBe(false)
})

test('isStrIsNumber("32")', () => {
  expect(lib.isStrIsNumber('32')).toBe(true)
})
