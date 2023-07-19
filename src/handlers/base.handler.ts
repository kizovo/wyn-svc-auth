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

function errorHandler(context: unknown, code: string) {
  const ctx = context as Context
  const statusCode = ctx.set.status ? code : 'INTERNAL_SERVER_ERROR'
  if (!C.ERROR_CODE[statusCode]) {
    ctx.set.status = 500
    return jsonFail('500', C.ERROR_MSG_BY_CODE['500'])
  }

  const CODE_NUM = C.ERROR_CODE[statusCode].toString()
  if (code === 'NOT_FOUND') {
    ctx.set.status = C.ERROR_CODE[code]
    return jsonFail(CODE_NUM, C.ERROR_MSG_BY_CODE[CODE_NUM])
  }
  if (code === 'INTERNAL_SERVER_ERROR') {
    ctx.set.status = C.ERROR_CODE[code]
    return jsonFail(CODE_NUM, C.ERROR_MSG_BY_CODE[CODE_NUM])
  }
}

export { jsonFail, jsonSuccess, errorHandler }
