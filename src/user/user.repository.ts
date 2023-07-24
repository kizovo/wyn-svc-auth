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
      const error: dto.IError = { code: '', message: '', e: e as Exception }
      return this.output(null, error)
    }
  }

  async queryInsertUser(req: dto.ISignupRequest): Promise<dto.IData> {
    try {
      const result = await this.DbMysql.users.create({ data: req })
      return this.output(result)
    } catch (e) {
      const error: dto.IError = { code: '', message: '', e: e as Exception }
      return this.output(null, error)
    }
  }

  private output(
    data: object | null,
    error: dto.IError | null = null,
  ): dto.IData {
    if (data) {
      return {
        data,
        error: null,
      }
    }

    if (error && error.e) {
      this.LogSentry.captureException(error.e as Exception)
      error = error.e as dto.IError
    }

    let code = 'E0000'
    let message = ''
    let e = null
    if (error) {
      code = C.ERROR_MSG[error.code] ? error.code : 'E0000'
      message =
        !C.ERROR_MSG[error.code] && error.message
          ? error.message
          : C.ERROR_MSG[error.code]
      e = error.e
    }

    return {
      data: null,
      error: { code, message, e },
    }
  }
}
