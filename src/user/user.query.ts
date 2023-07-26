import * as C from '@/constant'
import * as dto from '@base/base.dto'
import { ISignupRequest } from '@/user/user.dto'
import { Exception } from '@sentry/browser'

export default class UserQuery {
  private DbMysql
  private LogSentry

  constructor(setup: dto.ISetup) {
    this.DbMysql = setup.db.dbMysql()
    this.LogSentry = setup.log
  }

  async list(): Promise<dto.IData> {
    try {
      const result = await this.DbMysql.users.findMany({
        select: {
          email: true,
        },
      })
      return this.pass(result)
    } catch (e) {
      const error: dto.IError = { code: '', message: '', e: e as Exception }
      return this.fail(error)
    }
  }

  async add(req: ISignupRequest): Promise<dto.IData> {
    try {
      const result = await this.DbMysql.users.create({ data: req })
      return this.pass(result)
    } catch (e) {
      const error: dto.IError = { code: '', message: '', e: e as Exception }
      return this.fail(error)
    }
  }

  private pass(data: object): dto.IData {
    return {
      data,
      error: null,
    }
  }

  private fail(error: dto.IError): dto.IData {
    if (error.e) {
      this.LogSentry.captureException(error.e as Exception)
      error = error.e as dto.IError
    }

    const code = error.code !== undefined ? error.code : 'E0000'
    const message = error.message !== undefined ? C.ERROR_MSG[code] : ''
    const e = error.e || null

    return {
      data: {},
      error: { code, message, e },
    }
  }
}
