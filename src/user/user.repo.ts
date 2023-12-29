import * as dto from '@base/base.dto'
import { hash } from '@base/base.lib'
import {
  IDbFields,
  IDetailUserReq,
  IListUserReq,
  ISignupReq,
  mapSignUpDb,
  mapFieldToJson,
} from '@/user/user.dto'

// list down all database field that safely expose to view, update & delete
const EXPOSABLE_FIELD = {
  uuid: true,
  email: true,
  phone: true,
  firstName: true,
  lastName: true,
}

const exposableFieldBySearch = (fields: string): IDbFields => {
  const exp = { ...EXPOSABLE_FIELD }
  if (fields) {
    exp.email = fields.includes('email') ?? false
    exp.phone = fields.includes('phone') ?? false
    exp.firstName = fields.includes('first_name') ?? false
    exp.lastName = fields.includes('last_name') ?? false
  }
  return exp
}

const calculatePage = (r: dto.IPaginationReq): dto.IPage => {
  const pg_num = Number(r.pg_num)
  const pg_size = Number(r.pg_size)
  const skip = pg_num - 1 >= 0 ? (pg_num - 1) * pg_size : 0
  return { pg_num, pg_size, skip }
}

export default class UserRepo {
  private db
  private dbMysql

  constructor(setup: dto.ISetup) {
    this.db = setup.db
    this.dbMysql = this.db.dbMysql()
  }

  async detailUserDb(r: IDetailUserReq): Promise<object> {
    const result = await this.db.wrapException(async () => {
      return await this.dbMysql.user.findMany({
        select: EXPOSABLE_FIELD,
        where: {
          uuid: { in: r.uuid },
        },
      })
    })
    return this.mapResult(result)
  }

  async addUserDb(r: ISignupReq): Promise<object> {
    return this.db.wrapException(async () => {
      r.password = await hash(r.password)
      return await this.dbMysql.user.create({ data: mapSignUpDb(r) as any })
    })
  }

  async listUserDb(
    r: IListUserReq,
    condition = 'exclude_deleted',
  ): Promise<object> {
    let { pg_size, pg_num, skip } = calculatePage(r)
    const { result, total, count } = await this.db.wrapException(async () => {
      const f = exposableFieldBySearch(r.fields)
      const whereRules = {
        ...(!r.search
          ? {}
          : {
              OR: [
                { email: f.email ? { contains: r.search } : {} },
                { phone: f.phone ? { contains: r.search } : {} },
                { firstName: f.firstName ? { contains: r.search } : {} },
                { lastName: f.lastName ? { contains: r.search } : {} },
              ],
            }),
        ...(condition == 'exclude_deleted' ? { deletedAt: null } : {}),
      }

      const result = await this.dbMysql.user.findMany({
        select: f,
        where: whereRules,
        take: pg_size,
        skip,
      })
      const total = await this.dbMysql.user.count({ where: whereRules })
      const count = result.length
      return { result, total, count }
    })

    const pagination = { count, pg_num, pg_size, total }
    return this.mapResultWithPagination(pagination, result)
  }

  mapResult(data: object): dto.IData {
    const strData = JSON.stringify(data)
    const oData = JSON.parse(strData)
    const result = mapFieldToJson(oData)
    return { data: result, error: null }
  }

  mapResultWithPagination(
    pagination: object,
    data: object,
  ): dto.IDataPagination {
    const strData = JSON.stringify(data)
    const oData = JSON.parse(strData)
    const result = mapFieldToJson(oData)
    return { pagination, data: result, error: null }
  }
}
