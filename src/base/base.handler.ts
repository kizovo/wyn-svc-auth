import * as C from '@/constant'
import { IError, IHttpSet, IJsonResponse } from '@base/base.dto'

function errorHandler(error: IError, set: IHttpSet) {
  let code = error.code
  let err = Error(error.message)

  // code: 'VALIDATION' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR'
  // CODE_NUM: '400' | '404' | '500'
  const CODE_NUM =
    code == 'INTERNAL_SERVER_ERROR' || code == 'UNKNOWN' ? '500' : code

  switch (code) {
    case 'VALIDATION':
      set.status = 400
      return jsonFail('400', err.message)

    case 'NOT_FOUND':
      set.status = 404
      return jsonFail('404', C.ERROR_MSG['404'])
  }

  // Catching error: UNKNOWN & INTERNAL_SERVER_ERROR
  set.status = 500

  return jsonFail(CODE_NUM, C.ERROR_MSG[CODE_NUM] ?? err.message)
}

const jsonFail = (iCode = '500', iMessage = '') => {
  let res: IJsonResponse = {
    meta: {
      code: iCode,
      status: 'error',
      message: iMessage,
    },
    data: {},
  }
  return res
}

const jsonPass = (iData = {}, iMessage = '', iPagination = {}) => {
  let res: IJsonResponse = {
    meta: {
      code: '000',
      status: 'success',
      message: iMessage,
    },
    data: iData,
  }
  if (Object.keys(iPagination).length !== 0) {
    res.pagination = iPagination
  }
  return res
}

export { jsonFail, jsonPass, errorHandler }
