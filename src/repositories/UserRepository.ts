import { ERROR_MSG_BY_CODE } from '@/constant'
import { ISetup } from '@models/Model'
import { ISignupReq, IEUser } from '@models/UserModel'

export default class UserRepository {
  private DbMysql: any;
  private LogSentry: any;

  constructor(setup: ISetup) {
    this.DbMysql = setup.db.dbMysql()
    this.LogSentry = setup.log
  }

  async queryAllUserPaginated(): Promise<IEUser> {
    try {
      const result = await this.DbMysql.users.findMany({
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
      const result = await this.DbMysql.users.create({ data: req })
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

    this.LogSentry.captureException(e);
    if (!ERROR_MSG_BY_CODE[e.code] && e.message) {
      error.message = e.message
    } else {
      error.code = e.code
      error.message = ERROR_MSG_BY_CODE[e.code]
    }

    return { data: null, error }
  }
}
