import * as dto from '@base/base.dto'
import { IDetailUserReq, IListUserReq, ISignupReq } from '@/user/user.dto'
import UserRepo from '@/user/user.repo'

export default class UserService {
  private setup
  private repo

  constructor(setup: dto.ISetup) {
    this.setup = setup
    this.repo = new UserRepo(this.setup)
  }

  async listUser(q: object): Promise<dto.IDataPagination> {
    return (await this.repo.qListUser(q as IListUserReq)) as dto.IDataPagination
  }

  async detailUser(r: IDetailUserReq): Promise<dto.IData> {
    return (await this.repo.qDetailUser(r)) as dto.IData
  }

  async addUser(r: ISignupReq): Promise<dto.IData> {
    return (await this.repo.qAddUser(r)) as dto.IData
  }
}
