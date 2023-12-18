// Put all global constant here, especially for simple explicit value that repeatedly used throughout files.
import * as dto from '@base/base.dto'

export const API = {
  HEADERS: {
    'x-powered-by': 'wyn',
  },
}

export const DEFAULT = {
  PG_NUM: 1,
  PG_SIZE: 5,
}

export const REGEX = {
  PHONE_E164: /^\+[1-9]\d{1,14}$/,            // e164 format: +(14 digit number)
  PASSWORD_MEDIUM: /^(?=.*[A-Z]).{8,}$/,      // min. 8 char, 1 uppercase
  PASSWORD_STRONG: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, // min. 8 char, 1 upper, 1 lower, 1 number, 1 special char
}

export const ERROR_MSG: dto.IErrorMsg = {
  '404': `We looked everywhere, but it seems the file you're searching for is on vacation. It left no forwarding address!`,
  '500': `Uh-oh! Our server gremlins are up to their mischief again. They've hidden the requested page in a parallel universe. We're on it!`,
  E0000: `Unknown error`,
  I1001: `Invalid type: should be an array`,
  P2002: `Database field unique constraint violation`,
  S1001: `An error occurred during sign up process`,
}

