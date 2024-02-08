import * as C from '@/constant'
import config from '@/config'

export const isStrIsNumber = (str: any): boolean => {
  // only accept strings
  if (typeof str != 'string') return false
  return !isNaN(parseFloat(str))
}

export const hash = async (password: string): Promise<string> => {
  return await Bun.password.hash(password, {
    algorithm: 'argon2id',
    memoryCost: C.HASH.MEM_COST, // memory usage in kibibytes
    timeCost: C.HASH.TIME_COST, // the number of iterations
  })
}

// no need unit test
export const log = (msg: string, mode = 'info') => {
  // tslint:disable-next-line:no-console
  if (config.APP_ENV != 'prod') {
    switch (mode) {
      case 'error':
        console.error(msg)
        break
      case 'warn':
        console.warn(msg)
        break
      default:
        console.info(msg)
    }
  }
}

// no need unit test
export const serialNumFromDateTime = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0') // Month starts from 0
  const day = now.getDate().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export const verifyHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await Bun.password.verify(password, hash)
}
