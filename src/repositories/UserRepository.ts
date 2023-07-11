import { IUser, ISignupReq, IEUser } from '@models/UserModel'

export default class UserRepository {
  private db

  constructor(Db: any) {
    this.db = Db
  }

  async queryAllUserPaginated(): Promise<IUser[]> {
    const users = await this.db.users.findMany()
    return users
  }

  async queryInsertUser(req: ISignupReq): Promise<IEUser> {
    try {
      const result = await this.db.users.create({ data: req })
      return this.successResult(result)
    } catch (e: any) {
      return this.errorResult({ code: "PC000", message: e.message })
    }
  }

  private successResult(data: any) {
    return {
      data,
      error: null
    }
  }

  private errorResult(error: any) {
    return {
      data: null,
      error
    }
  }
}
