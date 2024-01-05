import { jwt } from '@elysiajs/jwt'
import config from '@/config'

const jwtMod = jwt({
  name: 'jwtMod',
  secret: config.JWT_SECRET || 'test1234',
})

export { jwtMod }
