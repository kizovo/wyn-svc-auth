import * as C from '@/constant'
import { Context } from 'elysia'

const jsonFail = (iCode = '500', iMessage = '') => {
  return {
    code: iCode,
    data: {},
    message: iMessage,
    success: false,
  }
}

const jsonSuccess = (iData = {}, iMessage = '') => {
  return {
    code: '00000',
    data: iData,
    message: iMessage,
    success: true,
  }
}

function errorHandler(code: string, error: Error, set: Context['set']) {
  // code: 'VALIDATION' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR'
  // CODE_NUM: '400' | '404' | '500'
  const CODE_NUM = C.ERROR_CODE[code].toString()
  if (code === 'VALIDATION' && error) {
    set.status = C.ERROR_CODE[code]
    return jsonFail(CODE_NUM, error.message)
  }
  if (code === 'NOT_FOUND') {
    set.status = C.ERROR_CODE[code]
    return jsonFail(CODE_NUM, C.ERROR_MSG[CODE_NUM])
  }
  if (code === 'INTERNAL_SERVER_ERROR') {
    set.status = C.ERROR_CODE[code]
    return jsonFail(CODE_NUM, C.ERROR_MSG[CODE_NUM])
  }
}

export { jsonFail, jsonSuccess, errorHandler }
