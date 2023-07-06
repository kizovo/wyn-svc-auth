import UserRepository from '../repository/UserRepository'
import setup from "../setup";

export default class UserService {
  private userRepository = new UserRepository(setup.dbPrisma)

  listUser() {
    this.userRepository.queryListUser()
  }

  insertUser(req: any) {
    this.userRepository.queryInsertUser(req)
  }
}
