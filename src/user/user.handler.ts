import UserService from '@/user/user.service'
import * as C from '@/constant'
import * as dto from '@base/base.dto'
import { errorHandler, jsonPass } from '@base/base.handler'
import { IUserDetailReq, ISignupReq } from '@/user/user.dto'
import { Context } from 'elysia'

export default class UserHandler {
  private UserService: UserService
  private LogSentry

  constructor(setup: dto.ISetup, userService: UserService) {
    this.UserService = userService
    this.LogSentry = setup.log
  }

  async listUser(
    set: Context['set'],
    q: Context['query'],
  ): Promise<dto.IJsonResponse> {
    set.headers = C.API.HEADERS

    const result = await this.UserService.listUser(q)
    if (result.error) {
      return errorHandler(result.error.code, Error(result.error.message), set)
    }

    return jsonPass(result.data, 'Success Get User List')
  }

  async detailUser(
    set: Context['set'],
    body: Context['body'],
  ): Promise<dto.IJsonResponse> {
    const req = body as IUserDetailReq
    set.headers = C.API.HEADERS

    const result = await this.UserService.detailUser(req)
    if (result.error) {
      return errorHandler(result.error.code, Error(result.error.message), set)
    }

    return jsonPass(result.data, 'Success Get User Detail')
  }

  async addUser(
    set: Context['set'],
    body: Context['body'],
  ): Promise<dto.IJsonResponse> {
    const req = body as ISignupReq
    set.headers = C.API.HEADERS

    try {
      const result = await this.UserService.addUser(req)
      if (result.error) {
        return errorHandler(result.error.code, Error(result.error.message), set)
      }

      return jsonPass(result.data, 'Success Sign Up')
    } catch (e) {
      this.LogSentry.captureException(e)
      return errorHandler('S1001', Error(C.ERROR_MSG['S1001']), set)
    }
  }
}
