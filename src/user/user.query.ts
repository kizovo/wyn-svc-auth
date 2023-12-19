import * as dto from '@base/base.dto'
import * as C from '@/constant'
import { isStrIsNumber } from '@base/base.lib'
import { IDetailUserReq, IListUserReq, ISignupReq } from '@/user/user.dto'

export default class UserQuery {
  private db
  private dbMysql
  static EXPOSABLE_FIELD = {
    email: true,
    phone: true,
  }

  constructor(setup: dto.ISetup) {
    this.db = setup.db
    this.dbMysql = this.db.dbMysql()
  }

  calculatePage(q: dto.IPaginationReq): dto.IPage {
    const pgNum =
      q.pg_num && isStrIsNumber(q.pg_num) ? Number(q.pg_num) : C.DEFAULT.PG_NUM
    const take =
      q.pg_size && isStrIsNumber(q.pg_size)
        ? Number(q.pg_size)
        : C.DEFAULT.PG_SIZE
    const skip = pgNum - 1 >= 0 ? (pgNum - 1) * take : 0

    return { pgNum, take, skip }
  }

  async qListUser(q: IListUserReq): Promise<object> {
    let { take, pgNum, skip } = this.calculatePage(q)
    let { result, total } = await this.db.wrapException(async () => {
      let isShowEmail = true
      let isShowPhone = true
      if (q.fields) {
        isShowEmail = q.fields.includes("email") ?? false
        isShowPhone = q.fields.includes("phone") ?? false
      }


      const result = await this.dbMysql.users.findMany({
        select: (q.fields != "") ? {
          email: isShowEmail,
          phone: isShowPhone,
        } : UserQuery.EXPOSABLE_FIELD,
        where: {
          ...(q.search ? {
            OR: [
              (isShowEmail ? { email: { contains: q.search } } : {}),
              (isShowPhone ? { phone: { contains: q.search } } : {}),
            ]
          } : {}),
        },
        take, skip,   // for pagination purposes
      })
      const total = await this.dbMysql.users.count()
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

  async qDetailUser(r: IDetailUserReq): Promise<object> {
    let result = await this.db.wrapException(async () => {
      return await this.dbMysql.users.findMany({
        select: UserQuery.EXPOSABLE_FIELD,
        where: {
          id: { in: r.id },
        },
      })
    })

    return this.mapResult(result)
  }

  async qAddUser(r: ISignupReq): Promise<object> {
    return this.db.wrapException(async () => {
      return await this.dbMysql.users.create({ data: r })
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
