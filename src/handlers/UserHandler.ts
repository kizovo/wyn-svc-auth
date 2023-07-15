import UserService from '@services/UserService'
import * as Const from '@/constant'
import {
  IBasicResponse,
  errorResponse,
  successResponse,
} from '@handlers/Handler'
import { ISignupReq } from '@models/UserModel'
import { ISetup } from '@models/Model'
import { Context } from 'elysia'
import { Exception } from '@sentry/browser'

export default class UserHandler {
  private UserService: UserService
  private LogSentry

  constructor(setup: ISetup, userService: UserService) {
    this.UserService = userService
    this.LogSentry = setup.log
  }

  async allUserPaginated(ctx: Context): Promise<IBasicResponse> {
    ctx.headers = Const.API.HEADERS
    const result = await this.UserService.allUserPaginated()
    console.log(result)
    if (result.error) {
      this.LogSentry.captureException(result.error.e)
      ctx.set.status = 500
      return errorResponse(result.error.code, result.error.message)
    }

    if (result.data == null) {
      return successResponse()
    }

    return successResponse(result.data, '')
  }

  async userSignup(ctx: Context, req: ISignupReq): Promise<IBasicResponse> {
    ctx.headers = Const.API.HEADERS
    try {
      const result = await this.UserService.userSignup(req)
      if (result.error) {
        this.LogSentry.captureException(result.error.e)
        ctx.set.status = 500
        return errorResponse(result.error.code, result.error.message)
      }

      if (result.data == null) {
        return errorResponse('500', 'Failed to Sign Up')
      }

      return successResponse(result.data, 'Success Sign Up')
    } catch (e: unknown) {
      this.LogSentry.captureException(e as Exception)
      ctx.set.status = 500
      return errorResponse('S1001', Const.ERROR_MSG_BY_CODE['S1001'])
    }
  }
}
