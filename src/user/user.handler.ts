import UserService from '@/user/user.service'
import * as C from '@/constant'
import * as dto from '@base/base.dto'
import { errorHandler, jsonPass, sanitizeQueryParam } from '@base/base.handler'
import { IDetailUserReq, IListUserReq, ISignupReq } from '@/user/user.dto'
import { isStrIsNumber } from '@base/base.lib'

export default class UserHandler {
  private svc: UserService
  private log

  constructor(setup: dto.ISetup, userService: UserService) {
    this.svc = userService
    this.log = setup.log
  }

  async listUser(
    set: dto.IHttpSet,
    query: IListUserReq,
  ): Promise<dto.IJsonResponse> {
    set.headers = C.API.HEADERS

    if (query.search && query.search != '') {
      query.search = sanitizeQueryParam(query.search)
    }
    if (!isStrIsNumber(query.pg_num)) {
      query.pg_num = C.DEFAULT.PG_NUM
    }
    if (!isStrIsNumber(query.pg_size)) {
      query.pg_size = C.DEFAULT.PG_SIZE
    }

    const res = await this.svc.listUser(query)
    return res.error
      ? errorHandler(res.error, set)
      : jsonPass(res.data, 'Success Get User List', res.pagination)
  }

  async detailUser(
    set: dto.IHttpSet,
    body: unknown,
  ): Promise<dto.IJsonResponse> {
    set.headers = C.API.HEADERS
    const req = body as IDetailUserReq
    if (!Array.isArray(req.uuid)) {
      return errorHandler({ code: 'I1001', message: C.ERROR_MSG['I1001'] }, set)
    }

    const res = await this.svc.detailUser(req)
    return res.error
      ? errorHandler(res.error, set)
      : jsonPass(res.data, 'Success Get User Detail')
  }

  async addUser(set: dto.IHttpSet, body: unknown): Promise<dto.IJsonResponse> {
    const req = body as ISignupReq
    set.headers = C.API.HEADERS
    try {
      const res = await this.svc.addUser(req)
      return res.error
        ? errorHandler(res.error, set)
        : jsonPass(res.data, 'Success Sign Up')
    } catch (e) {
      this.log.captureException(e)
      const customErr = { code: 'S1001', message: C.ERROR_MSG['S1001'] }
      return errorHandler(customErr, set)
    }
  }
}
