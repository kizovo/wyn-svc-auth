import UserRepository from '@repositories/UserRepository'

import { ISetup } from '@models/Model'
import { ISignupReq, IEUser } from '@models/UserModel'

export default class UserService {
  private Setup: any
  private UserRepository: UserRepository

  constructor(setup: ISetup) {
    this.Setup = setup
    this.UserRepository = new UserRepository(this.Setup)
  }

  async allUserPaginated(): Promise<IEUser> {
    return await this.UserRepository.queryAllUserPaginated()
  }

  async userSignup(req: ISignupReq): Promise<IEUser> {
    return await this.UserRepository.queryInsertUser(req)
  }
}
