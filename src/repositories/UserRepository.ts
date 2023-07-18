import { ERROR_MSG_BY_CODE } from '@/constant'
import { Exception } from '@sentry/browser'
import * as dto from '@dto/idx'

export default class UserRepository {
  private DbMysql
  private LogSentry

  constructor(setup: dto.ISetup) {
    this.DbMysql = setup.db.dbMysql()
    this.LogSentry = setup.log
  }

  async queryAllUserPaginated(): Promise<dto.IData> {
    try {
      const result = await this.DbMysql.users.findMany({
        select: {
          email: true,
        },
      })
      return this.output(result, null)
    } catch (e) {
      return this.output(null, e as dto.IError)
    }
  }

  async queryInsertUser(req: dto.ISignupRequest): Promise<dto.IData> {
    try {
      const result = await this.DbMysql.users.create({ data: req })
      return this.output(result, null)
    } catch (e) {
      return this.output(null, e as dto.IError)
    }
  }

  private output(data: object | null, error: dto.IError | null): dto.IData {
    if (error) {
      const err = error as dto.IError
      const code: string = ERROR_MSG_BY_CODE[err.code] ? err.code : 'E0000'
      const message: string =
        !ERROR_MSG_BY_CODE[err.code] && err.message
          ? err.message
          : ERROR_MSG_BY_CODE[err.code]
      const e = err.e

      this.LogSentry.captureException(err.e as Exception)

      return {
        data: null,
        error: { code, message, e },
      }
    }

    return {
      data,
      error: null,
    }
  }
}
