import SetupDB from '@setup/Db'
import { ERROR_MSG_BY_CODE } from '@/constant'
import { IUser, ISignupReq, IEUser } from '@models/UserModel'

export default class UserRepository {
  private Db: any;

  constructor(db: SetupDB) {
    this.Db = db.dbMysql()
  }

  async queryAllUserPaginated(): Promise<IEUser> {
    try {
      const result = await this.Db.users.findMany({
        select: {
          email: true,
        }
      })
      return this.successResult(result)
    } catch (e: any) {
      return this.errorResult(e)
    }
  }

  async queryInsertUser(req: ISignupReq): Promise<IEUser> {
    try {
      const result = await this.Db.users.create({ data: req })
      return this.successResult(result)
    } catch (e: any) {
      return this.errorResult(e)
    }
  }

  private successResult(data: any) {
    return { data, error: null }
  }

  private errorResult(e: any): any {
    const error = {
      code: 'E0000',
      message: ERROR_MSG_BY_CODE['E0000']
    }

    if (!ERROR_MSG_BY_CODE[e.code] && e.message) {
      error.message = e.message
    } else {
      error.code = e.code
      error.message = ERROR_MSG_BY_CODE[e.code]
    }

    return { data: null, error }
  }
}
