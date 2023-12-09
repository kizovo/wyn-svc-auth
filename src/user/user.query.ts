import * as dto from '@base/base.dto'
import { isNumeric } from '@base/base.lib'
import { ISignupReq, IUserDetailReq } from '@/user/user.dto'

export default class UserQuery {
  private Db
  private DbMysql

  constructor(setup: dto.ISetup) {
    this.Db = setup.db
    this.DbMysql = this.Db.dbMysql()
  }

  calculatePage(q: dto.IPaginationReq): dto.IPage {
    const pgNum = q.pg_num && isNumeric(q.pg_num) ? Number(q.pg_num) : 1
    const take = q.pg_size && isNumeric(q.pg_size) ? Number(q.pg_size) : 5
    const skip = pgNum - 1 >= 0 ? (pgNum - 1) * take : 0

    return { pgNum, take, skip }
  }

  async list(q: dto.IPaginationReq): Promise<object> {
    let { take, pgNum, skip } = this.calculatePage(q)
    let { result, total } = await this.Db.wrapException(async () => {
      const result = await this.DbMysql.users.findMany({
        take,
        skip,
        select: {
          email: true,
        },
      })
      const total = await this.DbMysql.users.count()
      return { result, total }
    })

    const pagination = {
      count: result.length,
      pg_num: pgNum,
      pg_size: take,
      total,
    }

    return this.mapResultWithPagination(pagination, result)
  }

  async detail(req: IUserDetailReq): Promise<object> {
    let result = await this.Db.wrapException(async () => {
      return await this.DbMysql.users.findMany({
        select: {
          email: true,
        },
        where: {
          id: { in: req.id },
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

  mapResultWithPagination(
    pagination: object,
    data: object,
  ): dto.IDataPagination {
    return { pagination, data, error: null }
  }
}
