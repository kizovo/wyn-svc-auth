import UserService from '@/user/user.service'
import * as C from '@/constant'
import * as dto from '@dto/id.dto'
import { jsonFail, jsonSuccess } from '@handlers/base.handler'
import { Context } from 'elysia'
import { Exception } from '@sentry/browser'

export default class UserHandler {
  private UserService: UserService
  private LogSentry

  constructor(setup: dto.ISetup, userService: UserService) {
    this.UserService = userService
    this.LogSentry = setup.log
  }

  async allUserPaginated(ctx: Context): Promise<dto.IJsonResponse> {
    ctx.headers = C.API.HEADERS
    const result = await this.UserService.allUserPaginated()
    if (result.error) {
      this.LogSentry.captureException(result.error.e as Exception)
      ctx.set.status = 500
      return jsonFail(result.error.code, result.error.message)
    }

    if (result.data == null) {
      return jsonSuccess()
    }

    return jsonSuccess(result.data, '')
  }

  async userSignup(
    ctx: Context,
    req: dto.ISignupRequest,
  ): Promise<dto.IJsonResponse> {
    ctx.headers = C.API.HEADERS
    try {
      const result = await this.UserService.userSignup(req)
      if (result.error) {
        this.LogSentry.captureException(result.error.e as Exception)
        ctx.set.status = 500
        return jsonFail(result.error.code, result.error.message)
      }

      if (result.data == null) {
        return jsonFail('500', 'Failed to Sign Up')
      }

      return jsonSuccess(result.data, 'Success Sign Up')
    } catch (e: unknown) {
      this.LogSentry.captureException(e as Exception)
      ctx.set.status = 500
      return jsonFail('S1001', C.ERROR_MSG_BY_CODE['S1001'])
    }
  }
}
