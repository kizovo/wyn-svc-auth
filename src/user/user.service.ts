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

  listUser = async (r: IListUserReq): Promise<dto.IDataPagination> =>
    (await this.repo.listUserDb(r)) as dto.IDataPagination

  detailUser = async (r: IDetailUserReq): Promise<dto.IData> =>
    (await this.repo.detailUserDb(r)) as dto.IData

  deleteUser = async (r: IDeleteUserReq): Promise<dto.IData> =>
    (await this.repo.deleteUserDb(r)) as dto.IData

  addUser = async (r: ISignupReq): Promise<dto.IData> =>
    (await this.repo.addUserDb(r)) as dto.IData

  signIn = async (r: ISigninReq): Promise<dto.IData> =>
    (await this.repo.signInDb(r)) as dto.IData
}
