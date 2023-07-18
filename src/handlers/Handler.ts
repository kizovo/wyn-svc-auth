import { ERROR_CODE, ERROR_MSG_BY_CODE } from '@/constant'
import { Context } from 'elysia'

interface IBasicResponse {
  code: string
  data: object
  message: string
  success: boolean
}

const errorResponse = (iCode = '500', iMessage = '') => {
  return {
    code: iCode,
    data: {},
    message: iMessage,
    success: false,
  }
}

const successResponse = (iData = {}, iMessage = '') => {
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
  if (!ERROR_CODE[statusCode]) {
    ctx.set.status = 500
    return errorResponse('500', ERROR_MSG_BY_CODE['500'])
  }

  const CODE_NUM = ERROR_CODE[statusCode].toString()
  if (code === 'NOT_FOUND') {
    ctx.set.status = ERROR_CODE[code]
    return errorResponse(CODE_NUM, ERROR_MSG_BY_CODE[CODE_NUM])
  }
  if (code === 'INTERNAL_SERVER_ERROR') {
    ctx.set.status = ERROR_CODE[code]
    return errorResponse(CODE_NUM, ERROR_MSG_BY_CODE[CODE_NUM])
  }
}

export { IBasicResponse, errorResponse, successResponse, errorHandler }
