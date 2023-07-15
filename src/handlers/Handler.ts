import { ERROR_CODE, ERROR_MSG_BY_CODE } from '@/constant'

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

function errorHandler(ctx: any) {
  const code = ctx.code
  if (!ERROR_CODE[code]) {
    ctx.status = 500
    return errorResponse('500', ERROR_MSG_BY_CODE['500'])
  }

  const CODE_NUM = ERROR_CODE[code].toString()
  if (code === 'NOT_FOUND') {
    ctx.status = ERROR_CODE[code]
    return errorResponse(CODE_NUM, ERROR_MSG_BY_CODE[CODE_NUM])
  }
  if (code === 'INTERNAL_SERVER_ERROR') {
    ctx.status = ERROR_CODE[code]
    return errorResponse(CODE_NUM, ERROR_MSG_BY_CODE[CODE_NUM])
  }
}

export { IBasicResponse, errorResponse, successResponse, errorHandler }
