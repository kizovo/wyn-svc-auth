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

export {
  IBasicResponse,
  errorResponse,
  successResponse
}
