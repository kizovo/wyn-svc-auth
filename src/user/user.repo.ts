import * as C from '@/constant'
import * as dto from '@base/base.dto'
import { hash, verifyHash } from '@base/base.lib'
import {
  IDbFields,
  IDetailUserReq,
  IDeleteUserReq,
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

const calculatePage = (r: dto.IPaginationReq): dto.IPage => {
  const pg_num = Number(r.pg_num)
  const pg_size = Number(r.pg_size)
  const skip = pg_num - 1 >= 0 ? (pg_num - 1) * pg_size : 0
  return { pg_num, pg_size, skip }
}

const mapResult = (data: object): dto.IData => {
  const strData = JSON.stringify(data)
  const oData = JSON.parse(strData)
  return { data: oData, error: null }
}

const mapResultWithPagination = (
  pagination: object,
  data: object,
): dto.IDataPagination => {
  const strData = JSON.stringify(data)
  const oData = JSON.parse(strData)
  return { pagination, data: oData, error: null }
}

export default class UserRepo {
  private dbMysql
  private dbUser

  constructor(setup: dto.ISetup) {
    this.dbMysql = setup.dbMysql
    this.dbUser = this.dbMysql.prisma().user
  }

  exposableFieldBySearch = (fields: string): IDbFields => {
    const exp = { ...EXPOSABLE_FIELD }
    if (fields) {
      exp.email = fields.includes('email') ?? false
      exp.phone = fields.includes('phone') ?? false
      exp.firstName = fields.includes('first_name') ?? false
      exp.lastName = fields.includes('last_name') ?? false
    }
    return exp
  }

  detailUserDb = async (r: IDetailUserReq): Promise<object> => {
    let result = await this.dbMysql.wrapException(async () => {
      return await this.dbUser.findMany({
        select: EXPOSABLE_FIELD,
        where: {
          uuid: { in: r.uuid },
          deletedAt: null,
        },
      })
    })
    result = mapFieldToJson(result as any)
    return mapResult(result)
  }

  deleteUserDb = async (
    r: IDeleteUserReq,
    flag = 'soft_delete',
  ): Promise<object> => {
    await this.dbMysql.wrapException(async () => {
      if (flag == 'hard_delete') {
        return await this.dbUser.deleteMany({
          where: {
            uuid: { in: r.uuid },
          },
        })
      }

      // default soft_delete
      return await this.dbUser.updateMany({
        where: {
          uuid: { in: r.uuid },
        },
        data: {
          deletedAt: new Date(),
        },
      })
    })
    return mapResult({})
  }

  addUserDb = async (r: ISignupReq): Promise<object> =>
    this.dbMysql.wrapException(async () => {
      r.password = await hash(r.password)
      return await this.dbUser.create({ data: mapSignUpDb(r) as any })
    })

  signInDb = async (r: ISigninReq): Promise<object> => {
    const user = await this.dbMysql.wrapException(async () => {
      EXPOSABLE_FIELD.password = true
      return await this.dbUser.findFirst({
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
      if (match) {
        // update user last login time
        await this.dbUser.update({
          where: {
            email: r.email,
          },
          data: {
            lastLogin: new Date(),
          },
        })

        return mapResult(user)
      }

      return {
        data: null,
        error: { code: 'PU002', message: C.ERROR_MSG['PU002'] },
      }
    }

    return {
      data: null,
      error: { code: 'PU001', message: C.ERROR_MSG['PU001'] },
    }
  }

  listUserDb = async (
    r: IListUserReq,
    flag = 'exclude_deleted',
  ): Promise<object> => {
    let { pg_size, pg_num, skip } = calculatePage(r)
    let { result, total, count } = await this.dbMysql.wrapException(
      async () => {
        const f = this.exposableFieldBySearch(r.fields)
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
          ...(flag == 'exclude_deleted' ? { deletedAt: null } : {}),
        }

        const result = await this.dbUser.findMany({
          select: f,
          where: whereRules,
          take: pg_size,
          skip,
        })
        const total = await this.dbUser.count({ where: whereRules })
        const count = result.length
        return { result, total, count }
      },
    )

    const pagination = { count, pg_num, pg_size, total }
    result = mapFieldToJson(result as any)
    return mapResultWithPagination(pagination, result)
  }
}
