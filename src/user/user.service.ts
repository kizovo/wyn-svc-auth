import * as dto from '@base/base.dto'
import UserQuery from '@/user/user.query'
import { ISignupRequest } from '@/user/user.dto'

export default class UserService {
  private Setup
  private UserQuery

  constructor(setup: dto.ISetup) {
    this.Setup = setup
    this.UserQuery = new UserQuery(this.Setup)
  }

  async listUser(): Promise<dto.IData> {
    return await this.UserQuery.list()
  }

  async addUser(req: ISignupRequest): Promise<dto.IData> {
    return await this.UserQuery.add(req)
  }
}
