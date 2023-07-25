import UserRepository from '@/user/user.query'
import * as dto from '@base/base.dto'
import { ISignupRequest } from '@/user/user.dto'

export default class UserService {
  private Setup
  private UserRepository: UserRepository

  constructor(setup: dto.ISetup) {
    this.Setup = setup
    this.UserRepository = new UserRepository(this.Setup)
  }

  async allUserPaginated(): Promise<dto.IData> {
    return await this.UserRepository.queryAllUserPaginated()
  }

  async userSignup(req: ISignupRequest): Promise<dto.IData> {
    return await this.UserRepository.queryInsertUser(req)
  }
}
