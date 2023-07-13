import UserService from '@services/UserService'
import { API, ERROR_MSG_BY_CODE } from '@/constant'
import { IBasicResponse, errorResponse, successResponse } from '@handlers/Handler'
import { ISignupReq } from '@models/UserModel'
import { ISetup } from '@models/Model'

export default class UserHandler {
  private UserService: UserService
  private LogSentry: any

  constructor(setup: ISetup, userService: UserService) {
    this.UserService = userService
    this.LogSentry = setup.log
  }

  async allUserPaginated(ctx: any): Promise<IBasicResponse> {
    ctx.headers = API.HEADERS
    const result = await this.UserService.allUserPaginated()
    if (result.error) {
      this.LogSentry.captureException(result.error);
      ctx.status = 500;
      return errorResponse(result.error.code, result.error.message);
    }

    return successResponse(result.data, "")
  }

  async userSignup(ctx: any, req: ISignupReq): Promise<IBasicResponse> {
    ctx.headers = API.HEADERS
    try {
      const result = await this.UserService.userSignup(req)
      if (result.error) {
        this.LogSentry.captureException(result.error);
        ctx.status = 500;
        return errorResponse(result.error.code, result.error.message);
      }

      return successResponse(result.data, "Success Sign Up")
    } catch (e) {
      this.LogSentry.captureException(e);
      ctx.status = 500;
      return errorResponse('S1001', ERROR_MSG_BY_CODE['S1001']);
    }
  }
}
