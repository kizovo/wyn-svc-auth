import UserService from '@services/UserService'
import { API, ERROR_MSG_BY_CODE } from '@/constant'
import { IBasicResponse, errorResponse, successResponse } from '@handlers/Handler'

import { ISignupReq } from '@models/UserModel'

export default class UserHandler {
  private UserService: UserService

  constructor(userService: UserService) {
    this.UserService = userService
  }

  async allUserPaginated(ctx: any): Promise<IBasicResponse> {
    ctx.headers = API.HEADERS
    const result = await this.UserService.allUserPaginated()
    if (result.error) {
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
        ctx.status = 500;
        return errorResponse(result.error.code, result.error.message);
      }

      return successResponse(result.data, "Success Sign Up")
    } catch (e) {
      ctx.status = 500;
      return errorResponse('S1001', ERROR_MSG_BY_CODE['S1001']);
    }
  }
}
