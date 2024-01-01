import * as dto from '@base/base.dto'
import {
  IDetailUserReq,
  IDeleteUserReq,
  IListUserReq,
  ISigninReq,
  ISignupReq,
} from '@/user/user.dto'
import UserRepo from '@/user/user.repo'

export default class UserService {
  private setup
  private repo

  constructor(setup: dto.ISetup) {
    this.setup = setup
    this.repo = new UserRepo(this.setup)
  }

  async listUser(r: IListUserReq): Promise<dto.IDataPagination> {
    return (await this.repo.listUserDb(r)) as dto.IDataPagination
  }

  async detailUser(r: IDetailUserReq): Promise<dto.IData> {
    return (await this.repo.detailUserDb(r)) as dto.IData
  }

  async deleteUser(r: IDeleteUserReq): Promise<dto.IData> {
    return (await this.repo.deleteUserDb(r)) as dto.IData
  }

  async addUser(r: ISignupReq): Promise<dto.IData> {
    return (await this.repo.addUserDb(r)) as dto.IData
  }

  async signIn(r: ISigninReq): Promise<dto.IData> {
    return (await this.repo.signInDb(r)) as dto.IData
  }
}
