import * as dto from '@base/base.dto'
import { IDetailUserReq, IListUserReq, ISignupReq } from '@/user/user.dto'
import UserQuery from '@/user/user.query'

export default class UserService {
  private setup
  private query

  constructor(setup: dto.ISetup) {
    this.setup = setup
    this.query = new UserQuery(this.setup)
  }

  async listUser(q: object): Promise<dto.IDataPagination> {
    return (await this.query.qListUser(
      q as IListUserReq,
    )) as dto.IDataPagination
  }

  async detailUser(r: IDetailUserReq): Promise<dto.IData> {
    return (await this.query.qDetailUser(r)) as dto.IData
  }

  async addUser(r: ISignupReq): Promise<dto.IData> {
    return (await this.query.qAddUser(r)) as dto.IData
  }
}
