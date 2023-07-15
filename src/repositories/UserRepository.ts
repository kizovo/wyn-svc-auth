import { ERROR_MSG_BY_CODE, ERROR_RESULT } from '@/constant'
import { ISetup } from '@models/Model'
import { ISignupReq, IEUser } from '@models/UserModel'
import { Exception } from '@sentry/browser'

export default class UserRepository {
  private DbMysql
  private LogSentry

  constructor(setup: ISetup) {
    this.DbMysql = setup.db.dbMysql()
    this.LogSentry = setup.log
  }

  async queryAllUserPaginated(): Promise<IEUser> {
    try {
      const result = await this.DbMysql.users.findMany({
        select: {
          email: true,
        },
      })
      return this.successResult(result)
    } catch (e) {
      return this.errorResult(e)
    }
  }

  async queryInsertUser(req: ISignupReq): Promise<IEUser> {
    try {
      const result = await this.DbMysql.users.create({ data: req })
      return this.successResult(result)
    } catch (e) {
      return this.errorResult(e)
    }
  }

  private successResult(data: object): IEUser {
    return { data, error: null }
  }

  private errorResult(e: any): IEUser {
    this.LogSentry.captureException(e as Exception)

    ERROR_RESULT.e = e
    if (!ERROR_MSG_BY_CODE[e.code] && e.message) {
      ERROR_RESULT.message = e.message
    } else {
      ERROR_RESULT.code = e.code
      ERROR_RESULT.message = ERROR_MSG_BY_CODE[e.code]
    }

    return { data: null, error: ERROR_RESULT }
  }
}
