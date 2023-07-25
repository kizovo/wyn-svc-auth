import * as C from '@/constant'
import { Context } from 'elysia'

function errorHandler(code: string, error: Error, set: Context['set']) {
  // code: 'VALIDATION' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR'
  // CODE_NUM: '400' | '404' | '500'
  const CODE_NUM =
    code == 'INTERNAL_SERVER_ERROR' || code == 'UNKNOWN' ? '500' : code

  if (code === 'VALIDATION') {
    set.status = 400
    return jsonFail('400', error.message)
  }
  if (code === 'NOT_FOUND') {
    set.status = 404
    return jsonFail('404', C.ERROR_MSG['404'])
  }

  // Catching error: UNKNOWN & INTERNAL_SERVER_ERROR
  set.status = 500
  return jsonFail(CODE_NUM, C.ERROR_MSG[CODE_NUM] ?? error.message)
}

const jsonFail = (iCode = '500', iMessage = '') => {
  return {
    code: iCode,
    data: {},
    error: iMessage,
    message: '',
  }
}

const jsonPass = (iData = {}, iMessage = '') => {
  return {
    code: '00000',
    data: iData,
    error: '',
    message: iMessage,
  }
}

export { jsonFail, jsonPass, errorHandler }
