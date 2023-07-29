import * as C from '@/constant'
import * as dto from '@base/base.dto'
import { ISignupReq } from '@/user/user.dto'

export default class UserQuery {
  private Db
  private DbMysql

  constructor(setup: dto.ISetup) {
    this.Db = setup.db
    this.DbMysql = this.Db.dbMysql()
  }

  async list(q: dto.IPaginationReq): Promise<object> {
    let result = await this.Db.wrapException(async () => {
      return await this.DbMysql.users.findMany({
        take: Number(q.page_size),
        skip: Number(q.page_no),
        select: {
          email: true,
        },
      })
    })

    return this.mapResult(result)
  }

  async add(req: ISignupReq): Promise<object> {
    return this.Db.wrapException(async () => {
      return await this.DbMysql.users.create({ data: req })
    })
  }

  mapResult(data: object): dto.IData {
    return { data, error: null }
  }
}
