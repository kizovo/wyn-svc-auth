import UserService from '@services/UserService'

import constant from '@/constant'
import { Prisma } from '@prisma/client'
import { IBasicResponse, errorResponse, successResponse } from '@handlers/Handler'

import { ISignupReq, IUser } from '@models/UserModel'

export default class UserHandler {
  private UserService: UserService

  constructor(userService: UserService) {
    this.UserService = userService
  }

  async allUserPaginated(ctx: any): Promise<IBasicResponse> {
    ctx.headers = constant.headers
    var data = await this.UserService.allUserPaginated()
    return successResponse(data, "")
  }

  async userSignup(ctx: any, req: ISignupReq): Promise<IBasicResponse> {
    ctx.headers = constant.headers
    try {
      const result = await this.UserService.userSignup(req)

      if (result.error) {
        ctx.status = 500;
        return errorResponse(result.error.code, result.error.message);
      }

      return successResponse(result.data, "Success Sign Up")
    } catch (e) {
      ctx.status = 500;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return errorResponse(e.code, `There is a unique constraint violation, a new user cannot be created with this email`)
        }
      }
      return errorResponse("00500", "An error occurred during sign up process");
    }
  }
}
