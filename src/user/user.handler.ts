import UserService from '@/user/user.service'
import * as C from '@/constant'
import * as dto from '@base/base.dto'
import { errorHandler, jsonPass } from '@base/base.handler'
import { ISignupRequest } from '@/user/user.dto'
import { Context } from 'elysia'
import { Exception } from '@sentry/browser'

export default class UserHandler {
  private UserService: UserService
  private LogSentry

  constructor(setup: dto.ISetup, userService: UserService) {
    this.UserService = userService
    this.LogSentry = setup.log
  }

  async listUser(set: Context['set']): Promise<dto.IJsonResponse> {
    set.headers = C.API.HEADERS

    const result = await this.UserService.listUser()
    if (result.error) {
      this.LogSentry.captureException(result.error.e as Exception)
      return errorHandler(result.error.code, Error(result.error.message), set)
    }

    return jsonPass(result.data, '')
  }

  async addUser(
    set: Context['set'],
    body: Context['body'],
  ): Promise<dto.IJsonResponse> {
    const req: ISignupRequest = body as ISignupRequest
    set.headers = C.API.HEADERS

    try {
      const result = await this.UserService.addUser(req)

      if (result.error) {
        this.LogSentry.captureException(result.error.e as Exception)
        return errorHandler(result.error.code, Error(result.error.message), set)
      }

      return jsonPass(result.data, 'Success Sign Up')
    } catch (e: unknown) {
      this.LogSentry.captureException(e as Exception)
      return errorHandler('S1001', Error(C.ERROR_MSG['S1001']), set)
    }
  }
}
