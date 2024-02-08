import * as dto from '@base/base.dto'
import * as lib from '@base/base.lib'
import { IDetailUserReq, IDeleteUserReq, IListUserReq, ISigninReq, ISignupReq } from '@/user/user.dto'
import UserRepo from '@/user/user.repo'

export default class UserService {
  private setup
  private repo

  constructor(setup: dto.ISetup) {
    this.setup = setup
    this.repo = new UserRepo(this.setup)
  }

  listUser = async (set: dto.IHttpSet, r: IListUserReq) => (await this.repo.listUserDb(set, r)) as dto.IDataPage

  detailUser = async (set: dto.IHttpSet, r: IDetailUserReq) => (await this.repo.detailUserDb(set, r)) as dto.IData

  deleteUser = async (set: dto.IHttpSet, r: IDeleteUserReq) => (await this.repo.deleteUserDb(set, r)) as dto.IData

  addUser = async (set: dto.IHttpSet, r: ISignupReq) => (await this.repo.addUserDb(set, r)) as dto.IData

  signIn = async (set: dto.IHttpSet, r: ISigninReq) => (await this.repo.signInDb(set, r)) as dto.IData
}
