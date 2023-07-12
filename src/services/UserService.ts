import UserRepository from '@repositories/UserRepository'
import SetupDB from '@setup/Db'

import { ISignupReq, IEUser } from '@models/UserModel'

export default class UserService {
  private Db: SetupDB
  private UserRepository: UserRepository

  constructor(db: SetupDB) {
    this.Db = db
    this.UserRepository = new UserRepository(this.Db)
  }

  async allUserPaginated(): Promise<IEUser> {
    return await this.UserRepository.queryAllUserPaginated()
  }

  async userSignup(req: ISignupReq): Promise<IEUser> {
    return await this.UserRepository.queryInsertUser(req)
  }
}
