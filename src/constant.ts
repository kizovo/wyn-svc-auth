// Put all global constant here, especially for simple explicit value that repeatedly used throughout files.
import { IObjValNumber, IObjKeyString } from '@models/Model'

export const API = {
  HEADERS: {
    'x-powered-by': 'wyn',
  }
}

export const ERROR_CODE: IObjValNumber = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

export const ERROR_MSG_BY_CODE: IObjKeyString = {
  '404': `We looked everywhere, but it seems the file you're searching for is on vacation. It left no forwarding address!`,
  '500': `Uh-oh! Our server gremlins are up to their mischief again. They've hidden the requested page in a parallel universe. We're on it!`,
  'E0000': `Unknown error`,
  'P2002': `Database field unique constraint violation`,
  'S1001': `An error occurred during sign up process`,
}
