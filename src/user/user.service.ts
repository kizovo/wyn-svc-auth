import UserRepository from '@/user/user.repository'
import * as dto from '@dto/id.dto'

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
