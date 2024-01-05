import * as C from '@/constant'

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

export const verifyHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await Bun.password.verify(password, hash)
}
