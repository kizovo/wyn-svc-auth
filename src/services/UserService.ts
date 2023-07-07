import UserRepository from '@repositories/UserRepository'
import setup from '@/setup'

export default class UserService {
  private userRepository = new UserRepository(setup.dbMysql)

  async listUser() {
    return await this.userRepository.queryListUser()
  }

  async insertUser(req: any) {
    await this.userRepository.queryInsertUser(req)
  }
}
