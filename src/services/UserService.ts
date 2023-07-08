import UserRepository from '@repositories/UserRepository'
import Setup from '@/Setup'

export default class UserService {
  private Setup: Setup
  private UserRepository: UserRepository

  constructor(setup: Setup) {
    this.Setup = setup
    this.UserRepository = new UserRepository(this.Setup.dbMysql())
  }

  async listUser() {
    return await this.UserRepository.queryListUser()
  }

  async insertUser(req: any) {
    await this.UserRepository.queryInsertUser(req)
  }
}
