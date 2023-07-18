import UserRepository from '@repositories/UserRepository'
import * as dto from '@dto/idx'

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

  async userSignup(req: dto.ISignupRequest): Promise<dto.IData> {
    return await this.UserRepository.queryInsertUser(req)
  }
}
