import UserService from '@services/UserService'
import { Prisma } from '@prisma/client'
import { IBasicResponse, errorResponse, successResponse } from '@handlers/BasicHandler'
import { ISignupReq } from '@models/UserModel'

export default class UserHandler {
  private UserService: UserService

  constructor(userService: UserService) {
    this.UserService = userService
  }

  async listUser(): Promise<IBasicResponse> {
    const data = await this.UserService.listUser()
    return successResponse(data, "")
  }

  async insertUser(req: ISignupReq) {
    try {
      await this.UserService.insertUser(req)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return errorResponse(e.code, `There is a unique constraint violation, a new user cannot be created with this email`)
        }
      }
    }

    return successResponse(null, "Success Sign Up")
  }
}
