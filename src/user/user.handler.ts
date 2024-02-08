import UserService from '@/user/user.service'
import * as C from '@/constant'
import * as dto from '@base/base.dto'
import * as lib from '@base/base.lib'
import { errorHandler, jsonPass, sanitizeQueryParam } from '@base/base.handler'
import { IDetailUserReq, IDeleteUserReq, IListUserReq, ISigninReq, ISignupReq } from '@/user/user.dto'
import { isStrIsNumber } from '@base/base.lib'

export default class UserHandler {
  private svc: UserService
  private log

  constructor(setup: dto.ISetup, userService: UserService) {
    this.svc = userService
    this.log = setup.log
  }

  listUser = async (set: dto.IHttpSet, query: IListUserReq): Promise<dto.IJsonResponse> => {
    set.headers = C.API.HEADERS
    set.headers.trace = lib.serialNumFromDateTime()
    lib.log(`#${set.headers.trace}-userhandler.listuser()`)

    if (query.search && query.search != '') {
      query.search = sanitizeQueryParam(query.search)
      lib.log(`#${set.headers.trace}-sanitizequeryparam(): ${query.search}`)
    }
    if (!isStrIsNumber(query.pg_num)) {
      query.pg_num = C.PAGE.NUM
    }
    if (!isStrIsNumber(query.pg_size)) {
      query.pg_size = C.PAGE.SIZE
    }

    const res = await this.svc.listUser(set, query)
    return res.error ? errorHandler(set, res.error) : jsonPass(res.data, 'Success Get User List', res.pagination)
  }

  detailUser = async (set: dto.IHttpSet, body: Object): Promise<dto.IJsonResponse> => {
    set.headers = C.API.HEADERS
    set.headers.trace = lib.serialNumFromDateTime()
    lib.log(`#${set.headers.trace}-userhandler.detailuser()`)

    const req = body as IDetailUserReq
    if (!Array.isArray(req.uuid)) {
      return errorHandler(set, { code: 'I1001', message: C.ERROR_MSG['I1001'] })
    }

    const res = await this.svc.detailUser(set, req)
    return res.error ? errorHandler(set, res.error) : jsonPass(res.data, 'Success Get User Detail')
  }

  deleteUser = async (set: dto.IHttpSet, body: Object): Promise<dto.IJsonResponse> => {
    set.headers = C.API.HEADERS
    set.headers.trace = lib.serialNumFromDateTime()
    lib.log(`#${set.headers.trace}-userhandler.deleteuser()`)

    const req = body as IDeleteUserReq
    if (!Array.isArray(req.uuid)) {
      return errorHandler(set, { code: 'I1001', message: C.ERROR_MSG['I1001'] })
    }

    const res = await this.svc.deleteUser(set, req)
    return res.error ? errorHandler(set, res.error) : jsonPass(res.data, 'Success Delete User')
  }

  addUser = async (set: dto.IHttpSet, body: unknown): Promise<dto.IJsonResponse> => {
    set.headers = C.API.HEADERS
    set.headers.trace = lib.serialNumFromDateTime()
    lib.log(`#${set.headers.trace}-userhandler.adduser()`)

    const req = body as ISignupReq
    try {
      const res = await this.svc.addUser(set, req)
      return res.error ? errorHandler(set, res.error) : jsonPass(res.data, 'Success Sign Up')
    } catch (e) {
      this.log.captureException(e)
      const customErr = { code: 'S1001', message: C.ERROR_MSG['S1001'] }
      return errorHandler(set, customErr)
    }
  }

  signIn = async (set: dto.IHttpSet, body: Object, jwt: any): Promise<dto.IJsonResponse> => {
    set.headers = C.API.HEADERS
    set.headers.trace = lib.serialNumFromDateTime()
    lib.log(`#${set.headers.trace}-userhandler.signin()`)

    const req = body as ISigninReq
    if (!req.email && !req.phone) {
      return errorHandler(set, { code: 'I1002', message: C.ERROR_MSG['I1002'] })
    }

    const res = await this.svc.signIn(set, req)
    if (res.error) {
      return errorHandler(set, res.error)
    }

    res.data = {
      token: await jwt.sign(res.data),
    }
    return jsonPass(res.data, 'Success Sign In')
  }
}
