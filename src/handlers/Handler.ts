import { ERROR_CODE, ERROR_MSG_BY_CODE } from '@/constant'

interface IBasicResponse {
  code: string;
  data: any;
  message: string;
  success: boolean;
}

const errorResponse = (iCode: string, iMessage: string) => {
  return {
    code: iCode,
    data: null,
    message: iMessage,
    success: false,
  }
}

const successResponse = (iData: any, iMessage: string) => {
  return {
    code: "00000",
    data: iData,
    message: iMessage,
    success: true,
  }
}

function errorHandler(ctx: any, code: string) {
  if (!ERROR_CODE[code]) {
    ctx.status = 500
    return errorResponse('500', ERROR_MSG_BY_CODE['500'])
  }

  ctx.status = ERROR_CODE[code]
  const CODE_NUM = ERROR_CODE[code].toString()
  if (code === 'NOT_FOUND') return errorResponse(CODE_NUM, ERROR_MSG_BY_CODE[CODE_NUM])
  if (code === 'INTERNAL_SERVER_ERROR') return errorResponse(CODE_NUM, ERROR_MSG_BY_CODE[CODE_NUM])
}

export {
  IBasicResponse,
  errorResponse,
  successResponse,
  errorHandler
}
