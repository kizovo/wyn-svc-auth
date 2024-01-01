import * as dto from '@base/base.dto'
import * as C from '@/constant'
import { hash, verifyHash } from '@base/base.lib'
import {
  IDbFields,
  IDetailUserReq,
  IListUserReq,
  ISigninReq,
  ISignupReq,
  mapSignUpDb,
  mapFieldToJson,
} from '@/user/user.dto'

// list down all database field that safely expose to view, update & delete
const EXPOSABLE_FIELD: any = {
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
  private dbMysql
  private db

  constructor(setup: dto.ISetup) {
    this.dbMysql = setup.dbMysql
    this.db = this.dbMysql.prisma()
  }

  async detailUserDb(r: IDetailUserReq): Promise<object> {
    let result = await this.dbMysql.wrapException(async () => {
      return await this.db.user.findMany({
        select: EXPOSABLE_FIELD,
        where: {
          uuid: { in: r.uuid },
        },
      })
    })
    result = mapFieldToJson(result as any)
    return this.mapResult(result)
  }

  async addUserDb(r: ISignupReq): Promise<object> {
    return this.dbMysql.wrapException(async () => {
      r.password = await hash(r.password)
      return await this.db.user.create({ data: mapSignUpDb(r) as any })
    })
  }

  async signInDb(r: ISigninReq): Promise<object> {
    const user = await this.dbMysql.wrapException(async () => {
      EXPOSABLE_FIELD.password = true
      return await this.db.user.findFirst({
        select: EXPOSABLE_FIELD,
        where: {
          OR: [
            ...(r.email ? [{ email: r.email }] : [{}]),
            ...(r.phone ? [{ phone: r.phone }] : [{}]),
          ],
          basicId: true,
        },
      })
    })

    if (user) {
      const match = await verifyHash(r.password, user.password)
      return match
        ? this.mapResult(user)
        : {
            data: null,
            error: { code: 'PU002', message: C.ERROR_MSG['PU002'] },
          }
    }

    return {
      data: null,
      error: { code: 'PU001', message: C.ERROR_MSG['PU001'] },
    }
  }

  async listUserDb(
    r: IListUserReq,
    condition = 'exclude_deleted',
  ): Promise<object> {
    let { pg_size, pg_num, skip } = calculatePage(r)
    let { result, total, count } = await this.dbMysql.wrapException(
      async () => {
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

        const result = await this.db.user.findMany({
          select: f,
          where: whereRules,
          take: pg_size,
          skip,
        })
        const total = await this.db.user.count({ where: whereRules })
        const count = result.length
        return { result, total, count }
      },
    )

    const pagination = { count, pg_num, pg_size, total }
    result = mapFieldToJson(result as any)
    return this.mapResultWithPagination(pagination, result)
  }

  mapResult(data: object): dto.IData {
    const strData = JSON.stringify(data)
    const oData = JSON.parse(strData)
    return { data: oData, error: null }
  }

  mapResultWithPagination(
    pagination: object,
    data: object,
  ): dto.IDataPagination {
    const strData = JSON.stringify(data)
    const oData = JSON.parse(strData)
    return { pagination, data: oData, error: null }
  }
}
