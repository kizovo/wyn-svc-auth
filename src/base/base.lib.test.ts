import { expect, test } from 'bun:test'
import * as lib from '@base/base.lib'

test('isStrIsNumeric("a")', () => {
  expect(lib.isStrIsNumeric('a')).toBe(false)
})

test('isStrIsNumeric("32")', () => {
  expect(lib.isStrIsNumeric('32')).toBe(true)
})
