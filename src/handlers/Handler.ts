import constant from '@/constant'

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
  if (code === 'NOT_FOUND') {
      const CODE_NUM = constant.error_code[code]
      ctx.status = CODE_NUM
      return errorResponse(CODE_NUM.toString(), `We looked everywhere, but it seems the file you're searching for is on vacation. It left no forwarding address!`)
    }
  if (code === 'INTERNAL_SERVER_ERROR') {
    const CODE_NUM = constant.error_code[code]
    ctx.status = CODE_NUM
    return errorResponse(CODE_NUM.toString(), `Uh-oh! Our server gremlins are up to their mischief again. They've hidden the requested page in a parallel universe. We're on it!`)
  }
}

export {
  IBasicResponse,
  errorResponse,
  successResponse,
  errorHandler
}
