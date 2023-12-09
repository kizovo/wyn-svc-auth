import * as dto from '@base/base.dto'
import { ISignupReq, IUserDetailReq } from '@/user/user.dto'
import UserQuery from '@/user/user.query'

export default class UserService {
  private Setup
  private UserQuery

  constructor(setup: dto.ISetup) {
    this.Setup = setup
    this.UserQuery = new UserQuery(this.Setup)
  }

  async listUser(q: object): Promise<dto.IDataPagination> {
    return (await this.UserQuery.list(
      q as dto.IPaginationReq,
    )) as dto.IDataPagination
  }

  async detailUser(req: IUserDetailReq): Promise<dto.IData> {
    return (await this.UserQuery.detail(req)) as dto.IData
  }

  async addUser(req: ISignupReq): Promise<dto.IData> {
    return (await this.UserQuery.add(req)) as dto.IData
  }
}
