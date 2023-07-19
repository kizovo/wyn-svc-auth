import * as C from '@/constant'
import { Exception } from '@sentry/browser'
import * as dto from '@dto/id.dto'

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
      return this.output(result)
    } catch (e) {
      return this.output(null, null, e as Exception)
    }
  }

  async queryInsertUser(req: dto.ISignupRequest): Promise<dto.IData> {
    try {
      const result = await this.DbMysql.users.create({ data: req })
      return this.output(result)
    } catch (e) {
      return this.output(null, null, e as Exception)
    }
  }

  private output(
    data: object | null,
    error: dto.IError | null = null,
    e: Exception | null = null,
  ): dto.IData {
    if (e) {
      this.LogSentry.captureException(e as Exception)

      const err = e as dto.IError
      const code: string = C.ERROR_MSG_BY_CODE[err.code] ? err.code : 'E0000'
      const message: string =
        !C.ERROR_MSG_BY_CODE[err.code] && err.message
          ? err.message
          : C.ERROR_MSG_BY_CODE[err.code]

      return {
        data: null,
        error: err,
      }
    }

    return {
      data,
      error: null,
    }
  }
}
