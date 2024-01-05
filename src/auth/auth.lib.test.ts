import { expect, test } from 'bun:test'
import * as lib from '@base/base.lib'

test('hash("Test1234!") & verify it, expect: the hash & verify is match', async () => {
  const hash = await lib.hash('Test1234!')
  const isMatch = await lib.verifyHash('Test1234!', hash)
  expect(isMatch).toBe(true)
})
